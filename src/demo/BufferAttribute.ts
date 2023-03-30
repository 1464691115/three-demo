import * as THREE from 'three';
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



export default (dom: HTMLElement | null) => {
     if (!dom) return
    // 1、创建场景
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    scene.add(camera)


    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const vertices = new Float32Array([
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0
    ])

    cubeGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cube)

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();

    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 将webgl渲染的canvas内容添加到body
    dom.appendChild(renderer.domElement)


    // 创建轨道控制器
    const controls = new OrbitControls(camera, dom);
    if (controls) {
        // 设置控制器阻尼，让控制器具有真实效果
        controls.enableDamping = true
    }



    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper)



    // 使用渲染器，通过相机将场景渲染进来
    function render() {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    render()

}