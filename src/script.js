import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import doorColorUrl from './assets/textures/door/color.jpg'
import doorAlphaUrl from './assets/textures/door/alpha.jpg'
import doorHeightUrl from './assets/textures/door/height.jpg'
import doorMetalnessUrl from './assets/textures/door/metalness.jpg'
import doorNormalUrl from './assets/textures/door/normal.jpg'
import doorRoughnessUrl from './assets/textures/door/roughness.jpg'
import doorAmbientUrl from './assets/textures/door/ambientOcclusion.jpg'

import brickColorUrl from './assets/textures/bricks/color.jpg'
import brickAmbientUrl from './assets/textures/bricks/ambientOcclusion.jpg'
import brickNormalUrl from './assets/textures/bricks/normal.jpg'
import brickRoughnessUrl from './assets/textures/bricks/roughness.jpg'

import grassColorUrl from './assets/textures/grass/color.jpg'
import grassAmbientUrl from './assets/textures/grass/ambientOcclusion.jpg'
import grassNormalUrl from './assets/textures/grass/normal.jpg'
import grassRoughnessUrl from './assets/textures/grass/roughness.jpg'

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load(doorColorUrl)
const doorAlphaTexture = textureLoader.load(doorAlphaUrl)
const doorHeightTexture = textureLoader.load(doorHeightUrl)
const doorMetalTexture = textureLoader.load(doorMetalnessUrl)
const doorNormalTexture = textureLoader.load(doorNormalUrl)
const doorRoughnessTexture = textureLoader.load(doorRoughnessUrl)
const doorAmbientTexture = textureLoader.load(doorAmbientUrl)

const bricksColorTexture = textureLoader.load(brickColorUrl)
const bricksAmbientTexture = textureLoader.load(brickAmbientUrl)
const bricksNormalTexture = textureLoader.load(brickNormalUrl)
const bricksRoughnessTexture = textureLoader.load(brickRoughnessUrl)

const grassColorTexture = textureLoader.load(grassColorUrl)
const grassAmbientTexture = textureLoader.load(grassAmbientUrl)
const grassNormalTexture = textureLoader.load(grassNormalUrl)
const grassRoughnessTexture = textureLoader.load(grassRoughnessUrl)

grassColorTexture.repeat.set(8, 8)
grassAmbientTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
);
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 / 2;
house.add(walls);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI / 4;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalTexture,
    roughnessMap: doorRoughnessTexture
  })
);
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.z = 4 / 2 + 0.001
door.position.y = 1
house.add(door)

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8 + (Math.random() - 0.5), 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'})
for(let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.position.set(x, 0.4, z)
  grave.rotation.y = (Math.random() - 0.5) * 1
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  graves.add(grave)
}

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
  })
);
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

const doorLight = new THREE.PointLight('#ff7d46', 2, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837')

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  const ghost1Angle = -elapsedTime * 0.32
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(elapsedTime * 3)

  const ghost2Angle = elapsedTime * 0.5
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 6
  ghost2.position.y = Math.sin(elapsedTime * 1) + Math.sin(elapsedTime * 2.5)

  const ghost3Angle = elapsedTime * 0.18
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
  ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2) + 1.5

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
