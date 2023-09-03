import * as EssentialPlugin from '@tweakpane/plugin-essentials';
import { Pane } from 'tweakpane';

let pane: Pane;
let fpsGraph: any;

export function useTweakpane() {
    pane = new Pane();
    pane.registerPlugin(EssentialPlugin);
    fpsGraph = pane.addBlade({
        view: 'fpsgraph',
        label: 'fpsgraph'
    });

    return { pane, fpsGraph };
}
