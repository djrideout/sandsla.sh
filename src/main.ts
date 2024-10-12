import './style.less';
import {
  WebGLRenderer,
  PMREMGenerator,
  Scene,
  Color,
  PerspectiveCamera
} from 'three';
import {
  GLTFLoader,
  OrbitControls,
  RoomEnvironment,
} from 'three/examples/jsm/Addons.js';

const container = document.querySelector<HTMLDivElement>('#hims');

const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container?.appendChild(renderer.domElement);

const pmremGenerator = new PMREMGenerator(renderer);

const scene = new Scene();
scene.background = new Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(5, 2, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

let gltf;
try {
  gltf = await new GLTFLoader().loadAsync('model/Sandslash.gltf');
} catch (e) {
  console.error(e);
}

if (gltf) {
  const modelScene = gltf.scene;
  modelScene.position.set(0, -0.5, 0);
  scene.add(modelScene);

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });

  window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  };
}
