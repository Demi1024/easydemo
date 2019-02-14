<template>
  <div>
  <button @click="goNewPage">打开页面1</button>
  <button @click="goPageTwo">打开页面2</button>
  <div id="container"></div>
  </div>
</template>

<script>
import * as Three from 'three'
export default {
  name: 'HelloWorld',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    }
  },
  methods: {
    init: function () {
      let container = document.getElementById('container')

      this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 1000) // 创建相机对象
      this.camera.position.z = 1

      this.scene = new Three.Scene() // 创建场景

      // let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2) // 创建盒模型
      // let material = new Three.MeshNormalMaterial()
      // this.mesh = new Three.Mesh(geometry, material)

      var axes = new Three.AxisHelper(20) // 创建x轴
      this.scene.add(axes)

      var planeGeometry = new Three.PlaneGeometry(60, 20) // 创建平面
      var planeMaterial = new Three.MeshBasicMaterial({color: 0xcccccc})

      this.mesh = new Three.Mesh(planeGeometry, planeMaterial)
      this.scene.add(this.mesh)

      this.renderer = new Three.WebGLRenderer({antialias: true}) // 渲染器
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate: function () {
      requestAnimationFrame(this.animate)
      // this.mesh.rotation.x += 0.01
      // this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    },
    goNewPage () {
      this.$router.push('/plat')
    },
    goPageTwo () {
      this.$router.push('/pageTwo')
    }
  },
  mounted () {
    this.init()
    this.animate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container{
 height:400px;
}
</style>
