import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const canvas = document.querySelector(".webgl");
gsap.registerPlugin(ScrollTrigger);

let rocketGLTF,
  spaceShipMax = -75,
  spaceShipMin = 52,
  spaceDuration = 7,
  rotationSpeed = 0.001,
  scene,
  camera,
  renderer,
  light,
  stars,
  sizeOfStars = 1;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 100;

const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 10000;
const posArr = new Float32Array(particlesCnt * 3);
for (let i = 0; i < particlesCnt; i += 3) {
  posArr[i] = (Math.random() - 0.5) * 1000;
  posArr[i + 1] = (Math.random() - 0.5) * 1000;
  posArr[i + 2] = (Math.random() - 0.5) * 1000;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArr, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  size: sizeOfStars,
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

light = new THREE.AmbientLight("white", 1);
scene.add(light);

stars = scene.children[0];

const loadingManager = new THREE.LoadingManager();

// const progressBar = document.querySelector("#progress-bar");
// loadingManager.onProgress = function (url, loaded, total) {
//   progressBar.value = (loaded / total) * 100;
// };

// const progressBarContainer = document.querySelector(".progress-bar-container");
// loadingManager.onLoad = function () {
//   progressBarContainer.style.display = "none";
// };

const loader = new GLTFLoader(loadingManager);
loader.load("./toy_rocket/scene.gltf", (gltf) => {
  rocketGLTF = gltf.scene;
  rocketGLTF.position.y = spaceShipMax;
  rocketGLTF.scale.set(70, 70, 70);
  scene.add(rocketGLTF);

  const t1 = gsap.timeline();
  t1.to(rocketGLTF.position, {
    scrollTrigger: {
      trigger: ".container2",
      start: "top bottom",
      end: "top top",
      scrub: 1,
    },
    y: spaceShipMin,
    duration: spaceDuration,
  })
    .to(".info", {
      scrollTrigger: {
        trigger: ".container2",
        start: "top bottom",
        end: "top 99%",
        scrub: 1,
      },
      opacity: 0,
      duration: spaceDuration,
    })
    .to(stars.position, {
      scrollTrigger: {
        trigger: ".container2",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
      y: -270,
      z: 200,
    })
    .to(".about", {
      scrollTrigger: {
        trigger: ".container2",
        start: "top bottom",
        end: "top 80%",
        scrub: 1,
      },
      opacity: 1,
      duration: spaceDuration,
    })
    .to(rocketGLTF.rotation, {
      scrollTrigger: {
        trigger: ".container2",
        start: "top bottom",
        end: "top 80%",
        scrub: 1,
      },
      y: Math.PI * 2,
      duration: spaceDuration,
    })
    .to(".proj", {
      scrollTrigger: {
        trigger: ".container2",
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
      },
      opacity: 1,
      duration: spaceDuration,
    })
    .to(rocketGLTF.rotation, {
      scrollTrigger: {
        trigger: ".container2",
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
      },
      y: Math.PI * 2,
      duration: spaceDuration,
    })
    .to(".exp", {
      scrollTrigger: {
        trigger: ".container2",
        start: "top 60%",
        end: "top 40%",
        scrub: 1,
      },
      opacity: 1,
      duration: spaceDuration,
    })
    .to(rocketGLTF.rotation, {
      scrollTrigger: {
        trigger: ".container2",
        start: "top 60%",
        end: "top 40%",
        scrub: 1,
      },
      y: Math.PI * 2,
      duration: spaceDuration,
    })
    .to(".contact", {
      scrollTrigger: {
        trigger: ".container2",
        start: "top 40%",
        end: "top 20%",
        scrub: 1,
      },
      opacity: 1,
      duration: spaceDuration,
    })
    .to(rocketGLTF.rotation, {
      scrollTrigger: {
        trigger: ".container2",
        start: "top 40%",
        end: "top 20%",
        scrub: 1,
      },
      y: Math.PI * 2,
      duration: spaceDuration,
    });
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stars.rotation.x += rotationSpeed;
  stars.rotation.y += rotationSpeed;
  stars.rotation.z += rotationSpeed;
}
animate();
