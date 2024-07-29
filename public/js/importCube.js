import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

let width = (1140/1.8)
let height = (945/1.8)

const scene = new THREE.Scene()

const light = new THREE.SpotLight(0xffffff, Math.PI * 20)
light.position.set(5, 5, 5)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff, 1) // El segundo parámetro es la intensidad de la luz
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(width, height)
renderer.setClearColor(0x000000, 0);


// Añadir el canvas al contenedor
const container = document.getElementById('canvas-container');
container.style.width = `${width}px`;
container.style.height = `${height}px`;
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const loader = new GLTFLoader()
loader.load(
  'resources/cube/arista.gltf',
  function (gltf) {
    const model = gltf.scene
    model.scale.set(0.4, 0.4, 0.4) // Cambia los valores para ajustar el tamaño
    scene.add(model)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.log(error)
  }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  render()
}

function render() {
  renderer.render(scene, camera)
}

animate()