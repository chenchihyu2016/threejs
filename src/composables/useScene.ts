import { Scene } from 'three';

export function useScene(el: { canvasRef: Ref<HTMLCanvasElement | undefined> }) {
    const scene = new Scene();
    const { camera } = useCamera();
    const { renderer } = useRenderer({ canvasRef: el.canvasRef, camera, scene });
    const { controls } = useControls({ canvasRef: el.canvasRef, camera });

    return { renderer, controls, scene, camera };
}
