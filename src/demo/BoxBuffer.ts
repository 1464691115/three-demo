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

    // 导入纹理
    const textureLoader = new THREE.TextureLoader();
    const manColorTexture = textureLoader.load('https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/668ea246aa404149972c98b3cb89ac65~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp')

    manColorTexture.offset.x = 0.5;
    //   manColorTexture.offset.y = 0.5;
    //   manColorTexture.offset.set(0.5,0.5);


    // 纹理旋转
    // 设置旋转的原点
    manColorTexture.center.set(0.5, 0.5)

    // 旋转45deg
    manColorTexture.rotation = Math.PI / 4

    // 设置纹理的重复
    // manColorTexture.wrapS = THREE.RepeatWrapping;
    // manColorTexture.wrapT = THREE.MirroredRepeatWrapping;
    manColorTexture.wrapS = THREE.MirroredRepeatWrapping;
    manColorTexture.wrapT = THREE.RepeatWrapping;

    // 添加物体
    const cubeGeometry = new THREE.BoxBufferGeometry()
    const basicMaterial = new THREE.MeshBasicMaterial({
        color: '#ffff00',
        map: manColorTexture
    })

    const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
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