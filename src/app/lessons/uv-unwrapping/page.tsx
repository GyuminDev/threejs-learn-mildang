'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { useEffect, useRef } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import PugTexture from '@/assets/textures/pug.png';
import { GUI } from 'lil-gui';
import gsap from 'gsap';

function Page() {
  const el = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }

    el.current.innerHTML = '';

    const gui = new GUI({
      width: 300,
      title: 'debug UI',
      closeFolders: true,
    });

    // Scene
    const scene = new THREE.Scene();

    const geometry = new THREE.BufferGeometry();
    // prettier-ignore
    const positionArray = new Float32Array([
      -0.5, 0.5, 0,
      0.5, 0.5, 0,
      -0.5, -0.5, 0,
      0.5, -0.5, 0
    ]);
    const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
    geometry.setAttribute('position', positionAttribute);

    const indices = [0, 2, 1, 2, 3, 1];
    geometry.setIndex(indices);

    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    // console.log(planeGeometry.attributes.uv.array);
    // TODO: uvArray를 작성해줘
    // prettier-ignore
    // const uvArray = new Float32Array([
    //   0, 1,
    //   1, 1,
    //   0, 0,
    //   1, 0
    // ]);

    const uvArray = new Float32Array([
      1, 1, // 오른쪽 상단
      0, 1, // 왼쪽 상단
      1, 0, // 오른쪽 하단
      0, 0  // 왼쪽 하단
    ]);

    const uvAttribute = new THREE.BufferAttribute(uvArray, 2);
    planeGeometry.setAttribute('uv', uvAttribute);

    const textureLoader = new THREE.TextureLoader();
    const colorTexture = textureLoader.load(PugTexture.src);

    const material = new THREE.MeshBasicMaterial({
      map: colorTexture,
      // wireframe: true,
    });
    const mesh = new THREE.Mesh(planeGeometry, material);
    scene.add(mesh);

    gui
      .add(colorTexture.repeat, 'x')
      .min(-3)
      .max(100)
      .step(0.01)
      .name('repeat x');

    gui
      .add(colorTexture.repeat, 'y')
      .min(-3)
      .max(100)
      .step(0.01)
      .name('repeat y');

    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;

    gui
      .add(colorTexture.offset, 'x')
      .min(-3)
      .max(3)
      .step(0.01)
      .name('offset x');

    gui
      .add(colorTexture.offset, 'y')
      .min(-3)
      .max(3)
      .step(0.01)
      .name('offset y');

    gui
      .add(colorTexture, 'rotation')
      .min(0)
      .max(Math.PI * 2)
      .step(0.01);

    gui.add(colorTexture.center, 'x').min(0).max(1).step(0.01).name('center x');
    gui.add(colorTexture.center, 'y').min(0).max(1).step(0.01).name('center y');

    // const debugObject = {};

    // // @ts-ignore
    // debugObject.spin = () => {
    //   gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
    // };
    // gui.add(debugObject, 'spin');

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100,
    );
    camera.position.z = 3;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, el.current);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: el.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Animate
    const clock = new THREE.Clock();

    let requestId: number;
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestId = window.requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return <canvas style={{ display: 'block' }} ref={el}></canvas>;
}

export default Page;
