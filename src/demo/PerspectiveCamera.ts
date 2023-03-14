import * as THREE from 'three';
import ThreeApi from '../utils/ThreeApi';
import OrbitControls from './controls/OrbitControls';


export default (dom: HTMLElement | null) => {
    if (!dom) return

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const threeApi = ThreeApi(camera, dom)


    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);


    // 移动物体位置
    cube.position.set(3, 0, 0)

    // 缩放物体
    // cube.scale.set(3, 2, 1)

    // 旋转
    cube.rotation.set(Math.PI / 4, 0, 0)

    // 将几何体添加进场景当中
    threeApi.sceneAdd(cube)




    // 初始化渲染器

    // 设置渲染的尺寸大小
    threeApi.renderSetSize(window.innerWidth, window.innerHeight);

    // 将webgl渲染的canvas内容添加到body
    threeApi.renderAppendDom()


    // 创建轨道控制器
    const controls = OrbitControls(camera, dom)

    // 添加坐标轴辅助器

    const axesHelper = new THREE.AxesHelper(5);
    threeApi.sceneAdd(axesHelper)


    const clock = new THREE.Clock();


    // 使用渲染器，通过相机将场景渲染进来
    threeApi.renderView(function () {
        let time = clock.getElapsedTime();
        let t = time % 5;

        cube.position.x = t * 1;
        if (cube.position.x > 5) {
            cube.position.x = 0;
        }

    })

}