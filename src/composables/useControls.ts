import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function useControls(el: { canvasRef: Ref<HTMLCanvasElement | undefined>; camera: PerspectiveCamera }) {
    let controls: OrbitControls | undefined;

    onMounted(() => {
        controls = new OrbitControls(el.camera, el.canvasRef.value);
        controls.enableDamping = true;
        controls.update();
    });

    return { controls };
}
