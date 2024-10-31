/*eslint array-bracket-newline: ["error", { "multiline": true }]*/

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  FontLoader,
  RGBELoader,
  TextGeometry,
} from 'three/examples/jsm/Addons.js';

function Page() {
  const el = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let requestId: number;

    async function main() {
      if (!el.current) {
        return;
      }
      el.current.innerHTML = '';

      const canvas = el.current;
      // Scene
      const scene = new THREE.Scene();

      /**
       * Textures
       */

      const textureLoader = new THREE.TextureLoader();
      const matcapTexture = textureLoader.load(
        new URL('@/assets/textures/matcaps/10.png', import.meta.url).href,
      );
      matcapTexture.colorSpace = THREE.SRGBColorSpace;

      const fontLoader = new FontLoader();

      const donuts: THREE.Mesh<
        THREE.TorusGeometry,
        THREE.MeshMatcapMaterial,
        THREE.Object3DEventMap
      >[] = [];

      fontLoader.load(
        new URL('@/assets/fonts/Gugi_Regular.json', import.meta.url).href,
        font => {
          // Material
          const material = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture,
          });
          // const material = new THREE.MeshBasicMaterial({
          //   wireframe: true,
          // });

          // Text
          const textGeometry = new TextGeometry('바보 멍청이', {
            font: font,
            size: 1,
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });
          // textGeometry.computeBoundingBox();
          // console.log(textGeometry.boundingBox);

          // textGeometry.translate(
          //   textGeometry.boundingBox.max.x * 0.5,
          //   textGeometry.boundingBox.max.y * 0.5,
          //   textGeometry.boundingBox.max.z * 0.5,
          // );
          //
          textGeometry.center();

          const text = new THREE.Mesh(textGeometry, material);
          scene.add(text);

          // Donuts
          const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);

          for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(donutGeometry, material);
            donut.position.x = (Math.random() - 0.5) * 10;
            donut.position.y = (Math.random() - 0.5) * 10;
            donut.position.z = (Math.random() - 0.5) * 10;

            donut.rotation.x = Math.random() * Math.PI;
            donut.rotation.y = Math.random() * Math.PI;
            const scale = Math.random();
            donut.scale.set(scale, scale, scale);

            donuts.push(donut);
            scene.add(donut);
          }
        },
      );

      /**
       * Sizes
       */
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

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100,
      );
      camera.position.x = 1;
      camera.position.y = 1;
      camera.position.z = 2;
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        donuts.forEach((donut, index) => {
          donut.rotation.y = index * 0.1 * elapsedTime;
          donut.rotation.x = index * 0.1 * elapsedTime;
        });

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    }
    main();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return <canvas style={{ display: 'block' }} ref={el}></canvas>;
}

export default Page;
