import * as THREE from 'three';
import ThreeApi from '../utils/ThreeApi';

// export default (dom?: HTMLElement | null) => {
//     if (!dom) return



//     // 目标： 了解three.js最基本的内容


//     // 1、创建场景
//     const scene = new THREE.Scene()




//     // 2、创建相机
//     // https://threejs.org/examples/?q=camera#webgl_camera
//     const camera = new THREE.PerspectiveCamera(75, innerHeight / innerWidth, 0.1, 1000);



//     // 设置相机位置
//     camera.position.set(0, 0, 10);

//     scene.add(camera)

//     // 添加物体
//     // 创建几何体
//     const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//     const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

//     // 根据几何体和材质创建物体
//     const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//     // 将几何体添加进场景当中
//     scene.add(cube)



//     // 初始化渲染器
//     const renderer = new THREE.WebGLRenderer();

//     // 设置渲染的尺寸大小
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     console.log(renderer);
//     // 将webgl渲染的canvas内容添加到body
//     dom.appendChild(renderer.domElement)


//     // 使用渲染器，通过相机将场景渲染进来
//     renderer.render(scene, camera)

// }



export default (dom: HTMLElement | null) => {
    if (!dom) return

    const camera = new THREE.PerspectiveCamera(75, innerHeight / innerWidth, 0.1, 1000);

    const threeApi = new ThreeApi(camera, dom)


    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // 将几何体添加进场景当中
    threeApi.scene.add(cube)
}