import THREE, { Camera } from "three";





class SceneClass {
    public scene: THREE.Scene

    constructor(camera: Camera) {
        this.scene = new THREE.Scene()
        this.scene.add(camera)
    }
}

class RenderClass {
    protected renderer: THREE.WebGLRenderer

    constructor(protected camera: Camera) {
        this.renderer = new THREE.WebGLRenderer();
    }

    public render(scene: THREE.Scene) {
        this.renderer.render(scene, this.camera)
        requestAnimationFrame(this.render.bind(this, scene))
    }
}


export default function ThreeApi(camera: Camera, dom: HTMLElement) {
    const sceneClass = new SceneClass(camera);
    const renderClass = new RenderClass(camera);



    // dom.appendChild(renderClass.render)
    /** 执行渲染 */



    return {
        render: renderClass.render
    }

}



