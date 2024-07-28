import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Escena
const scene = new THREE.Scene();

// Dimensiones originales del canvas
const originalWidth = 1140;
const originalHeight = 945;

// Reducir las dimensiones a la mitad
const newWidth = originalWidth / 1.8;
const newHeight = originalHeight / 1.8;

// Cámara
const camera = new THREE.PerspectiveCamera(75, newWidth / newHeight, 0.1, 1000);
camera.position.z = 5;

// Renderizador con fondo transparente
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(newWidth, newHeight);
renderer.setClearColor(0x000000, 0); // color negro con 0 de opacidad (transparente)

// Añadir el canvas al contenedor
const container = document.getElementById('canvas-container');
container.style.width = `${newWidth}px`;
container.style.height = `${newHeight}px`;
container.appendChild(renderer.domElement);

// // Añadir una figura 3D (cubo)
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x595959 });
// const cube = new THREE.Mesh(geometry, material);
// cube.scale.set(2, 2, 2);
// scene.add(cube);

// Añadir una fuente de luz
const light = new THREE.AmbientLight(0xffffff); // Luz ambiental blanca
scene.add(light);

// Cargar el modelo 3D .gltf
const loader = new GLTFLoader();
loader.load('resources/models/modelo/rubiksCube.gltf', function (gltf) {
    const model = gltf.scene;
    console.log('Modelo cargado:', model); // Verifica si el modelo se carga
    
    // Ajustes de depuración para la escala y posición del modelo
    model.scale.set(0.5, 0.5, 0.5); // Ajusta la escala del modelo si es necesario
    model.position.set(0, 0, 0); // Asegúrate de que el modelo esté en el centro de la escena
    scene.add(model);

    // Añadir un helper para visualizar la caja de contorno del modelo
    const box = new THREE.BoxHelper(model, 0xff0000);
    scene.add(box);

}, undefined, function (error) {
    console.error('Error al cargar el modelo:', error);
});

// // Animación
// function animate() {
//     requestAnimationFrame(animate);

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render(scene, camera);
// }

// animate();

// Ajustar el tamaño del renderizador al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    const width = newWidth;
    const height = newHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
