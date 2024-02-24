'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { css } from '../../../../styled-system/css';
import { Typography } from '@/app/components/typography';

function Page() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const el = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }

    const canvas = el.current;

    canvas.innerHTML = '';

    /**
     * Base
     */
    // Scene
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * Sizes
     */
    // const sizes = {
    //   width: 800,
    //   height: 600,
    // };
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

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
    camera.position.z = 3;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(sizes.width, sizes.height);

    /**
     * Animate
     */
    // const clock = new THREE.Clock();

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    const resize = () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const doubleClick = () => {
      const fullscreenElement =
        // @ts-ignore
        document.fullscreenElement || document.webkitFullscreenElement;

      const container = canvas.parentElement;

      if (!fullscreenElement) {
        if (container?.requestFullscreen) {
          container.requestFullscreen();
          // @ts-ignore
        } else if (container.webkitRequestFullscreen) {
          // @ts-ignore
          container.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          // @ts-ignore
        } else if (document.webkitExitFullscreen) {
          // @ts-ignore
          document.webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('dblclick', doubleClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('dblclick', doubleClick);
    };
  }, []);

  return (
    <div
      className={css({
        position: 'relative',
        width: '100vw',
        height: '100vh',
      })}
    >
      <header
        className={css({
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          mt: '30px',
          color: 'white',
          zIndex: 10,
        })}
      >
        <Typography bold level="h2">
          {isFullscreen ? 'Fullscreen' : 'double click to fullscreen'}
        </Typography>
      </header>
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
