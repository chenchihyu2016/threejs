<script setup lang="ts">
    import {
        BoxGeometry,
        Mesh,
        MeshBasicMaterial,
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
        SpotLightHelper
    } from 'three';
    import { GUI } from 'dat.gui';

    const color = '#e3e3a3';
    const canvasRef = ref<HTMLCanvasElement>();
    const { scene, camera, renderer } = useScene({ canvasRef });

    // box
    const box = new Mesh(new BoxGeometry(1, 1, 1, 32, 32), new MeshStandardMaterial({ color }));
    scene.add(box);

    function boxAnimate(time: number) {
        box.rotation.x = time / 1000;
        box.rotation.y = time / 1000;
    }

    // plane
    const plane = new Mesh(
        new PlaneGeometry(30, 30),
        new MeshBasicMaterial({ color: '#ffffff', side: DoubleSide, transparent: true, opacity: 0.5 })
    );
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    // recieve shadow
    plane.receiveShadow = true;

    // sphere
    const sphere = new Mesh(new SphereGeometry(4, 50, 50), new MeshStandardMaterial({ color, wireframe: false }));

    scene.add(sphere);
    sphere.position.set(-5, -5, 0);
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
        spotLightAnimate();

        renderer?.render(scene, camera);
    }

    onMounted(() => renderer.setAnimationLoop(animateCore));

    // ambient light
    const ambientLight = new AmbientLight(0x00ff00, 0.4);
    scene.add(ambientLight);

    // // directional light
    // const directionalLight = new DirectionalLight(0xffffff, 0.8);

    // scene.add(directionalLight);
    // directionalLight.position.set(-30, 50, 0);
    // // important
    // directionalLight.castShadow = true;
    // directionalLight.shadow.camera.bottom = -10;

    // // directional light helper
    // const directionalLightHelper = new DirectionalLightHelper(directionalLight, 5);
    // scene.add(directionalLightHelper);

    // // directional light shadow helper
    // const directionalShadowHelper = new CameraHelper(directionalLight.shadow.camera);
    // scene.add(directionalShadowHelper);

    // spotlight
    const spotLight = new SpotLight(0xffffff);
    scene.add(spotLight);
    spotLight.position.set(-100, 100, 0);
    spotLight.castShadow = true;
    spotLight.angle = 0.2;

    function spotLightAnimate() {
        spotLight.angle = options.angle;
        spotLight.penumbra = options.penumbra;
        spotLight.intensity = options.intensity;
        spotLightHelper.update();
    }

    // spotlight helper
    const spotLightHelper = new SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

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
