<template>
  <div id="mytest"></div>
</template>

<script>
import * as Three from 'three'
var OrbitControls = require('three-orbit-controls')(Three)
export default {
  name: 'mytest',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      plane: null,
      rollControls: null,
      clock: null,
      cube: null
    }
  },
  methods: {
    init () {
      this.scene = new Three.Scene() // 创建一个场景
      // 场景是一个容器，主要用于保存、跟踪所要渲染的物体和使用的光源。这个是基础
      this.camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000) // 创建一个摄像机
      // 摄像机决定了在场景中可以看到什么
      this.renderer = new Three.WebGLRenderer({antialias: true}) // 创建一个渲染器
      // 渲染器会基于摄像机的角度来计算场景对象在浏览器中会渲染成什么样子

      this.renderer.setClearColor(new Three.Color(0x000000)) // 渲染器的颜色
      this.renderer.setSize(window.innerWidth, window.innerHeight) // 渲染器的大小
      this.renderer.shadowMap.enabled = true // 渲染器开启阴影

      // 坐标轴辅助
      var axes = new Three.AxisHelper(500)
      this.scene.add(axes)
      var planeGeometry = new Three.PlaneGeometry(1000, 1000, 1, 1) // 创建一个平面几何形
      planeGeometry.vertices[0].uv = new Three.Vector2(0, 0)
      planeGeometry.vertices[1].uv = new Three.Vector2(1, 0)
      planeGeometry.vertices[2].uv = new Three.Vector2(1, 1)
      planeGeometry.vertices[3].uv = new Three.Vector2(0, 1)
      var planeMaterial = new Three.MeshBasicMaterial({color: 0xfff000})
      // 定义网格线
      var geometry = new Three.Geometry()
      geometry.vertices.push(new Three.Vector3(-500, 0, 0))
      geometry.vertices.push(new Three.Vector3(500, 0, 0))
      for (var i = 0; i < 20; i++) {
        var line = new Three.Line(geometry, new Three.LineBasicMaterial({color: 0xffffff, opacity: 0.2}))
        line.position.z = (i * 50) - 500
        this.scene.add(line)

        line = new Three.Line(geometry, new Three.LineBasicMaterial({color: 0xffffff, opacity: 0.2}))
        line.position.x = (i * 50) - 500
        line.rotation.y = 90 * Math.PI / 180
        this.scene.add(line)
      }
      this.plane = new Three.Mesh(planeGeometry, planeMaterial)
      this.plane.receiveShadow = true
      // 旋转并定位平面
      this.plane.rotation.x = -0.5 * Math.PI
      this.plane.position.x = 0
      this.plane.position.y = 0
      this.plane.position.z = 0
      // 把平面几何添加到场景中
      this.scene.add(this.plane)

      // 添加一个几何圆形
      let sphereGeometry = new Three.SphereGeometry(5, 20, 20)
      let sphereMaterial = new Three.MeshBasicMaterial({color: 0x7777ff})
      let sphere = new Three.Mesh(sphereGeometry, sphereMaterial)
      this.scene.add(sphere)

      // 定位摄像机的位置并放置在场景的中心位置
      this.camera.position.x = 0
      this.camera.position.y = 70
      this.camera.position.z = 60
      this.camera.lookAt(this.scene.position)

      // 添加灯光照明
      let ambientLight = new Three.AmbientLight(0x3c3c3c)
      this.scene.add(ambientLight)

      // 为阴影添加聚光灯
      let spotLight = new Three.SpotLight(0xffffff, 1.2, 150, 120)
      spotLight.position.set(-40, 60, -10)
      spotLight.castShadow = true
      this.scene.add(spotLight)

      // 添加一个3D的几何体
      let cubeGeometry = new Three.CubeGeometry(10, 10, 10)
      let cubeMaterial = new Three.MeshLambertMaterial({color: 0xff0000})
      this.cube = new Three.Mesh(cubeGeometry, cubeMaterial)
      this.cube.position.x = 10
      this.cube.position.y = 20
      this.cube.position.z = 0
      this.cube.castShadow = true
      // this.scene.add(this.cube)

      // 添加粒子
      createSprites(this.scene)
      function createSprites (scene) {
        var sMaterial = new Three.SpriteMaterial({color: 0x0000ff})
        for (var x = -5; x < 5; x++) {
          for (var y = 1; y < 10; y++) {
            var sprite = new Three.Sprite(sMaterial)
            sprite.position.set(x * 10, y * 10, 0)
            scene.add(sprite)
          }
        }
      }
      // 添加粒子系统
      createParticles(this.scene)
      function createParticles (scene) {
        var geom = new Three.Geometry()
        // 创建一个点云材质
        var material = new Three.PointCloudMaterial({size: 4, vertexColors: true, color: 0xffffff})
        for (var x = -5; x < 5; x++) {
          for (var y = 1; y < 10; y++) {
            var particle = new Three.Vector3(x * 10, y * 10, 10)
            geom.vertices.push(particle)
            geom.colors.push(new Three.Color(Math.random() * 0x00ffff))
          }
        }
        var cloud = new Three.PointCloud(geom, material)
        scene.add(cloud)
      }
      // 创建一个轨道控制器
      this.rollControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.rollControls.target = new Three.Vector3(0, 0, 0)
      this.rollControls.autoRotate = false
      this.scene.add(this.rollControls)
      this.clock = new Three.Clock()
      // 把呈现程序的输出添加到html元素
      document.getElementById('mytest').appendChild(this.renderer.domElement)
    },
    render () {
      let delta = this.clock.getDelta()
      this.rollControls.update(delta)
      requestAnimationFrame(this.render)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.init()
    this.render()
  }
}
</script>
