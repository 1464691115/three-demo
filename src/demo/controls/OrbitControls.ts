import { Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export default (camera: Camera, dom: HTMLElement | null) => {

    if (!dom) return
    const controls = new OrbitControls(camera, dom);

    return controls
}