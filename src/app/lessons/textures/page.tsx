'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { css } from '../../../../styled-system/css';
import { GUI } from 'lil-gui';
import ColorDoorTexture from '@/assets/textures/door/color.jpg';
import AlphaDoorTexture from '@/assets/textures/door/alpha.jpg';
import HeightDoorTexture from '@/assets/textures/door/height.jpg';
import NormalDoorTexture from '@/assets/textures/door/normal.jpg';
import AmbientOcclusionDoorTexture from '@/assets/textures/door/ambientOcclusion.jpg';
import MetalnessDoorTexture from '@/assets/textures/door/metalness.jpg';
import RoughnessDoorTexture from '@/assets/textures/door/roughness.jpg';
import CheckerBoard1024Texture from '@/assets/textures/checkerboard-1024x1024.png';
import CheckerBoard8Texture from '@/assets/textures/checkerboard-8x8.png';
import MineCraftTexture from '@/assets/textures/minecraft.png';
import * as dat from 'lil-gui';

function Page() {
  const el = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }

    const canvas = el.current;
    canvas.innerHTML = '';

    // Scene
    const scene = new THREE.Scene();

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Or
    // const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Or
    //     const geometry = new THREE.ConeGeometry(1, 1, 32)

    // Or
    // const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100);

    const loadingManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const colorTexture = textureLoader.load(ColorDoorTexture.src);
    // color space conversion for sRGB
    colorTexture.colorSpace = THREE.SRGBColorSpace;

    // colorTexture.repeat.x = 2;
    // colorTexture.repeat.y = 3;
    // colorTexture.wrapS = THREE.RepeatWrapping;
    // colorTexture.wrapT = THREE.RepeatWrapping;
    // colorTexture.wrapS = THREE.MirroredRepeatWrapping;
    // colorTexture.wrapT = THREE.MirroredRepeatWrapping;

    const alphaTexture = textureLoader.load(AlphaDoorTexture.src);
    const heightTexture = textureLoader.load(HeightDoorTexture.src);
    const normalTexture = textureLoader.load(NormalDoorTexture.src);
    const ambientOcclusionTexture = textureLoader.load(
      AmbientOcclusionDoorTexture.src,
    );
    const metalnessTexture = textureLoader.load(MetalnessDoorTexture.src);
    const roughnessTexture = textureLoader.load(RoughnessDoorTexture.src);

    const checkerBoard1024Texture = textureLoader.load(
      CheckerBoard1024Texture.src,
    );
    const checkerBoard8Texture = textureLoader.load(CheckerBoard8Texture.src);
    // color space conversion for sRGB
    checkerBoard8Texture.colorSpace = THREE.SRGBColorSpace;
    checkerBoard8Texture.magFilter = THREE.NearestFilter;

    const mineCraftTexture = textureLoader.load(MineCraftTexture.src);
    // color space conversion for sRGB
    // mineCraftTexture.colorSpace = THREE.SRGBColorSpace;
    // mineCraftTexture.magFilter = THREE.NearestFilter;
    // mineCraftTexture.minFilter = THREE.NearestFilter;
    mineCraftTexture.generateMipmaps = false;

    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // const material = new THREE.MeshBasicMaterial({ map: checkerBoard8Texture });
    const material = new THREE.MeshBasicMaterial({ map: mineCraftTexture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const gui = new dat.GUI();

    // dubug ui magFilter, minFilter
    gui
      .add(mineCraftTexture, 'magFilter', {
        NearestFilter: THREE.NearestFilter,
        LinearFilter: THREE.LinearFilter,
      })
      .name('magFilter')
      .onChange(() => {
        mineCraftTexture.needsUpdate = true;
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
    camera.position.z = 1;
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
