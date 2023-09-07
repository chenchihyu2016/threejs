import { WebGLRenderer, Scene, PCFSoftShadowMap, PerspectiveCamera } from 'three';

export function useRenderer(el: {
    canvasRef: Ref<HTMLCanvasElement | undefined>;
    camera: PerspectiveCamera;
    scene: Scene;
}) {
    const { width, height } = useWindowSize();
    const aspectRatio = computed(() => width.value / height.value);

    let renderer = new WebGLRenderer({ antialias: true });

    onMounted(() => {
        renderer = new WebGLRenderer({ canvas: el.canvasRef.value, antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = PCFSoftShadowMap;

        updateRenderer();
        loop();
    });

    function updateRenderer() {
        renderer?.setSize(width.value, height.value);
        renderer?.setPixelRatio(window.devicePixelRatio);
    }

    watch(aspectRatio, () => updateRenderer());

    function loop() {
        renderer?.render(el.scene, el.camera);
        requestAnimationFrame(loop);
    }

    return { renderer };
}
