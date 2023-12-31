<script setup lang="ts">
    import {
        BoxGeometry,
        Mesh,
        MeshStandardMaterial,
        AxesHelper,
        PlaneGeometry,
        GridHelper,
        DoubleSide,
        SphereGeometry,
        AmbientLight,
        DirectionalLight,
        DirectionalLightHelper,
        CameraHelper,
        SpotLight,
        SpotLightHelper,
        MeshBasicMaterial,
        Fog,
        FogExp2,
        TextureLoader,
        CubeTexture,
        CubeTextureLoader,
        Vector2,
        Raycaster,
        ShaderMaterial
    } from 'three';
    import { GUI } from 'dat.gui';
    import nebula from '@/assets/images/nebula.jpg';
    import stars from '@/assets/images/stars.jpg';
    import { vShader, fShader } from '../../assets/shaders/shader';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

    const color = '#e3e3a3';
    const canvasRef = ref<HTMLCanvasElement>();
    const { scene, camera, renderer } = useScene({ canvasRef });

    // box
    const box = new Mesh(new BoxGeometry(1, 1, 1, 32, 32), new MeshStandardMaterial({ color }));
    box.position.set(0, 10, 0);
    box.castShadow = true;
    scene.add(box);

    function boxAnimate(time: number) {
        box.rotation.x = time / 1000;
        box.rotation.y = time / 1000;
    }

    // plane
    const plane = new Mesh(
        new PlaneGeometry(30, 30),
        new MeshStandardMaterial({ color: '#ffffff', side: DoubleSide, transparent: true, opacity: 0.5 })
    );
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    // recieve shadow
    plane.receiveShadow = true;

    // sphere
    const sphere = new Mesh(new SphereGeometry(4, 50, 50), new MeshStandardMaterial({ color, wireframe: false }));

    scene.add(sphere);
    sphere.position.set(-10, 10, 0);
    // cast shadow to plane
    sphere.castShadow = true;

    let step = 0;

    function shpereAnimate(time: number) {
        step += options.speed;
        sphere.position.y = 20 * Math.abs(Math.sin(step));
    }

    // animate core
    function animateCore(time: number) {
        boxAnimate(time);
        shpereAnimate(time);
        // spotLightAnimate();
        rayCasterAnimate();

        renderer?.render(scene, camera);
    }

    onMounted(() => renderer.setAnimationLoop(animateCore));

    // ambient light
    const ambientLight = new AmbientLight(0xffffff);
    scene.add(ambientLight);

    // directional light
    const directionalLight = new DirectionalLight(0xffffff, 0.8);

    scene.add(directionalLight);
    directionalLight.position.set(-20, 40, 0);
    // important
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.bottom = -12;

    // directional light helper
    const directionalLightHelper = new DirectionalLightHelper(directionalLight, 5);
    scene.add(directionalLightHelper);

    // directional light shadow helper
    const directionalShadowHelper = new CameraHelper(directionalLight.shadow.camera);
    scene.add(directionalShadowHelper);

    // // spotlight
    // const spotLight = new SpotLight(0xffffff);
    // spotLight.position.set(-100, 100, 0);
    // spotLight.castShadow = true;
    // spotLight.angle = 0.2;
    // scene.add(spotLight);

    // spotLight.shadow.mapSize.width = 512; // default
    // spotLight.shadow.mapSize.height = 512; // default
    // spotLight.shadow.camera.near = 0.5; // default
    // spotLight.shadow.camera.far = 500; // default
    // spotLight.shadow.focus = 1; // default

    // function spotLightAnimate() {
    //     spotLight.angle = options.angle;
    //     spotLight.penumbra = options.penumbra;
    //     spotLight.intensity = options.intensity;
    //     spotLightHelper.update();
    // }

    // // spotlight helper
    // const spotLightHelper = new SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    // fog
    // scene.fog = new Fog(0xffffff, 0, 200);
    // scene.fog = new FogExp2(0xffffff, 0.01);

    // // stars and nebulas
    const textureLoader = new TextureLoader();
    scene.background = textureLoader.load(stars);
    const cubeTextureLoader = new CubeTextureLoader();
    scene.background = cubeTextureLoader.load([nebula, nebula, stars, stars, stars, stars]);

    // box2
    const box2 = new Mesh(new BoxGeometry(4, 4, 4), new MeshStandardMaterial({ map: textureLoader.load(nebula) }));
    box2.position.set(-5, 15, 5);
    box2.castShadow = true;
    box2.name = 'box2';
    scene.add(box2);

    // select handler and ray caster
    const mousePosition = new Vector2();

    useEventListener('mousemove', function (e) {
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const rayCaster = new Raycaster();

    function rayCasterAnimate() {
        rayCaster.setFromCamera(mousePosition, camera);

        const intersects = rayCaster.intersectObjects(scene.children);

        for (const intersect of intersects) {
            if (intersect.object.name === 'box2') {
                intersect.object.rotation.x += 0.01;
                intersect.object.rotation.y += 0.01;
            }
        }
    }

    // shader
    const sphere2 = new Mesh(
        new SphereGeometry(4),
        new ShaderMaterial({ vertexShader: vShader, fragmentShader: fShader })
    );
    scene.add(sphere2);
    sphere2.position.set(-5, 10, 10);

    // import glb
    const monkeyUrl = new URL('@/assets/glbs/monkey.glb', import.meta.url);
    const assetsLoader = new GLTFLoader();
    assetsLoader.load(
        monkeyUrl.href,
        function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            model.position.set(-12, 4, 10);
        },
        undefined,
        function (error) {
            console.log(error);
        }
    );

    // gridHelper
    const gridHelper = new GridHelper(30);
    scene.add(gridHelper);

    //axesHelper
    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);

    // gui
    const gui = new GUI();
    const options = { sphereColor: '#ffea00', wireframe: false, speed: 0.01, angle: 0.2, penumbra: 0, intensity: 1 };

    gui.addColor(options, 'sphereColor').onChange(function (color: string) {
        sphere.material.color.set(color);
    });

    gui.add(options, 'wireframe').onChange(function (wireframe: boolean) {
        sphere.material.wireframe = wireframe;
    });

    gui.add(options, 'speed', 0, 0.1);
    gui.add(options, 'angle', 0, 1);
    gui.add(options, 'penumbra', 0, 1);
    gui.add(options, 'intensity', 0, 1);
</script>

<template>
    <canvas ref="canvasRef" />
</template>

<style scoped lang="scss"></style>
