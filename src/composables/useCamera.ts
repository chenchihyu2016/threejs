import { PerspectiveCamera } from 'three';

export function useCamera() {
    const { width, height } = useWindowSize();
    const aspectRatio = computed(() => width.value / height.value);
    const camera: PerspectiveCamera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000);

    camera.position.set(-10, 30, 30);
    camera.aspect = aspectRatio.value;

    function updateCamera() {
        camera.aspect = aspectRatio.value;
        camera.updateProjectionMatrix();
    }

    onMounted(() => updateCamera());

    watch(aspectRatio, () => updateCamera());

    return { camera };
}
