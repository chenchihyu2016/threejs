import { WebGLRenderer, Scene } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function useScene(el: { canvasRef: Ref<HTMLCanvasElement | undefined> }) {
    const scene = new Scene();
    const { camera } = useCamera();
    const { width, height } = useWindowSize();
    const aspectRatio = computed(() => width.value / height.value);

    let renderer = new WebGLRenderer({ antialias: true });
    let controls: OrbitControls | undefined;

    onMounted(() => {
        renderer = new WebGLRenderer({ canvas: el.canvasRef.value, antialias: true });

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        updateRenderer();
        loop();
    });

    function updateRenderer() {
        renderer?.setSize(width.value, height.value);
        renderer?.setPixelRatio(window.devicePixelRatio);
    }

    watch(aspectRatio, () => updateRenderer());

    function loop() {
        renderer?.render(scene, camera);
        requestAnimationFrame(loop);
    }

    scene.add(camera);

    return { renderer, controls, scene, camera };
}
