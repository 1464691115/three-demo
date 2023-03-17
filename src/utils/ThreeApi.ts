import * as THREE from "three";
import { Camera, Object3D } from "three";





class SceneClass {
    protected scene: THREE.Scene

    constructor(camera: Camera, protected dom: HTMLElement) {
        this.scene = new THREE.Scene()
        this.sceneAdd(camera)
    }

    sceneAdd(...args: Object3D[]) {
        this.scene.add(...args)
    }
}

class RenderClass extends SceneClass {
    public renderer: THREE.WebGLRenderer

    constructor(protected camera: Camera, protected dom: HTMLElement) {
        super(camera, dom)
        this.renderer = new THREE.WebGLRenderer();
    }

    public renderView(callback?, time?) {
        typeof callback == 'function' && callback(time)
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.renderView.bind(this, callback))
    }

    public renderSetSize(width: number, height: number) {
        this.renderer.setSize(width, height)
    }


    public renderAppendDom() {
        if (!this.dom) console.warn('dom 元素还未加载')
        this.dom.appendChild(this.renderer.domElement)
    }
}


export default function ThreeApi(camera: Camera, dom: HTMLElement) {
    const renderClass = new RenderClass(camera, dom);

    return renderClass
}



