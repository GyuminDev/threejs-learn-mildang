'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { css } from '../../../../styled-system/css';
import gsap from 'gsap';
import * as dat from 'lil-gui';
// import { GUI } from 'lil-gui';

function Page() {
  const el = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }

    const canvas = el.current;
    canvas.innerHTML = '';

    /**
     * Debug
     */
    const gui = new dat.GUI();
    // const gui = new GUI({
    //   width: 300,
    //   title: 'Nice debug UI',
    //   closeFolders: false,
    // });
    const debugObject = {};

    // @ts-ignore
    debugObject.spin = () => {
      gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
    };
    gui.add(debugObject, 'spin');

    const scene = new THREE.Scene();

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    // const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
    // const material = new THREE.MeshBasicMaterial({ color: '#ff0000' });
    const material = new THREE.MeshBasicMaterial({
      color: '#9c7fe3',
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // gui.add(mesh.position, 'y');
    // gui.add(mesh.position, 'y', -3, 3, 0.01);
    gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation');

    const myObject = {
      myVariable: 1337,
    };
    gui.add(myObject, 'myVariable');

    gui.add(mesh, 'visible');
    gui.add(material, 'wireframe');
    // gui.addColor(material, 'color');
    gui.addColor(material, 'color').onChange((value: any) => {
      console.log(value.getHexString());
    });

    // @ts-ignore
    debugObject.subdivision = 2;
    gui
      .add(debugObject, 'subdivision')
      .min(1)
      .max(20)
      .step(1)
      .onFinishChange(() => {
        mesh.geometry.dispose(); // remove the old geometry
        mesh.geometry = new THREE.BoxGeometry(
          1,
          1,
          1,
          // @ts-ignore
          debugObject.subdivision,
          // @ts-ignore
          debugObject.subdivision,
          // @ts-ignore
          debugObject.subdivision,
        );
      });

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

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return (
    <div
      className={css({
        position: 'relative',
        width: '100vw',
        height: '100vh',
      })}
    >
      <canvas
        className={css({
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          outline: 'none',
        })}
        ref={el}
      ></canvas>
    </div>
  );
}

export default Page;
