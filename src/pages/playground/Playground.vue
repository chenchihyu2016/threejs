<script setup lang="ts">
    import {
        BoxGeometry,
        Mesh,
        MeshBasicMaterial,
        AxesHelper,
        PlaneGeometry,
        GridHelper,
        DoubleSide,
        SphereGeometry
    } from 'three';
    import { GUI } from 'dat.gui';

    const color = '#e3e3a3';
    const canvasRef = ref<HTMLCanvasElement>();
    const { scene, camera, renderer } = useScene({ canvasRef });

    // box
    const box = new Mesh(new BoxGeometry(1, 1, 1, 32, 32), new MeshBasicMaterial({ color }));
    scene.add(box);

    function animate(time: number) {
        box.rotation.x = time / 1000;
        box.rotation.y = time / 1000;
        renderer?.render(scene, camera);
    }

    onMounted(() => renderer.setAnimationLoop(animate));

    // plane
    const plane = new Mesh(
        new PlaneGeometry(30, 30),
        new MeshBasicMaterial({ color: '#ffffff', opacity: 0.4, transparent: true, side: DoubleSide })
    );
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;

    // sphere
    const sphere = new Mesh(new SphereGeometry(4, 50, 50), new MeshBasicMaterial({ color, wireframe: false }));
    scene.add(sphere);

    sphere.position.set(5, 5, 0);

    // gridHelper
    const gridHelper = new GridHelper(30);
    scene.add(gridHelper);

    //axesHelper
    const axesHelper = new AxesHelper(5);
    scene.add(axesHelper);

    // gui
    const gui = new GUI();
    const options = { sphereColor: '#ffea00', wireframe: false };

    gui.addColor(options, 'sphereColor').onChange(function (e: string) {
        sphere.material.color.set(e);
    });

    gui.add(options, 'wireframe').onChange(function (e: boolean) {
        sphere.material.wireframe = e;
    });
</script>

<template>
    <canvas ref="canvasRef" />
</template>

<style scoped lang="scss"></style>
