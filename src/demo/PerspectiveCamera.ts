import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import gsap from 'gsap'
import * as dat from 'dat.gui'


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
    // const mesh = new THREE.Mesh()


    // 移动物体位置
    // cube.position.set(3, 0, 0)

    // 缩放物体
    // cube.scale.set(3, 2, 1)

    // 旋转
    // cube.rotation.set(Math.PI / 4, 0, 0)

    // 将几何体添加进场景当中
    scene.add(cube)



    console.log(cube);
    const gui = new dat.GUI();

    gui.add(cube.position, 'x').min(0).max(5).step(0.01).name('移动x轴').onChange((value) => {
        console.log('值被修改：' + value);
    }).onFinishChange(value => {
        console.log('完全停止下来')
    })


    const params = {
        color: '#ffff00',
        fn() {
            gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
        }
    }

    gui.addColor(params, 'color').onChange((value) => {
        console.log('颜色值被修改：' + value);

        cube.material.color.set(value)
    })

    // 设置选项框
    gui.add(cube, 'visible').name('是否显示')
    // 设置按钮点击触发
    gui.add(params, 'fn').name('立方体运动')

    const folder = gui.addFolder("设置立方体")
    folder.add(cube.material, 'wireframe')



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


    const clock = new THREE.Clock();



    // 目标：掌握 Gsap 动画实现各种动画效果


    // 设置动画
    // let animate = gsap.to(cube.position, {
    //     x: 5,
    //     duration: 5,
    //     ease: "power1.inOut",
    //     // 设置重复的次数，无限次循环 为 -1
    //     // repeat: -1,
    //     // 是否往返运动
    //     yoyo: true,
    //     // delay, 延迟2秒运动
    //     delay: 2,
    //     onComplete() {
    //         console.log("运动完成");
    //     },
    //     onStart() {
    //         console.log("运动开始")
    //     },

    // })
    // gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.in" })



    window.addEventListener("dblclick", () => {
        // 播放暂停
        // if (animate.isActive()) {
        //     animate.pause()
        // } else {
        //     animate.resume()
        // }

        // 全屏
        const fullScreenElement = document.fullscreenElement;
        if (!fullScreenElement) renderer.domElement.requestFullscreen()
        else document.exitFullscreen()
    })

    // 使用渲染器，通过相机将场景渲染进来
    function render() {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }

    render()

    window.addEventListener("resize", () => {
        // 更新摄像头
        camera.aspect = window.innerWidth / window.innerHeight;

        // 更新摄像头投影矩阵
        camera.updateProjectionMatrix();

        // 更新渲染器
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        console.log(window.devicePixelRatio);
    })
}