'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Page() {
  const el = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let requestId: number;

    async function main() {
      if (!el.current) {
        return;
      }
      el.current.innerHTML = '';

      const gui = new GUI();

      const canvas = el.current;
      // Scene
      const scene = new THREE.Scene();

      /**
       * Lights
       */
      // Ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);
      scene.add(ambientLight);

      // Directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.castShadow = true;
      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 6;
      directionalLight.shadow.camera.top = 2;
      directionalLight.shadow.camera.right = 2;
      directionalLight.shadow.camera.bottom = -2;
      directionalLight.shadow.camera.left = -2;
      directionalLight.shadow.radius = 10;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;

      directionalLight.position.set(2, 2, -1);
      gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001);
      gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001);
      gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001);
      gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001);
      scene.add(directionalLight);

      // Spot light
      const spotLight = new THREE.SpotLight(0xffffff, 3.6, 10, Math.PI * 0.3);
      spotLight.castShadow = true;
      spotLight.position.set(0, 2, 2);
      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.far = 6;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      scene.add(spotLight);
      scene.add(spotLight.target);

      const spotLightCameraHelper = new THREE.CameraHelper(
        spotLight.shadow.camera,
      );
      spotLightCameraHelper.visible = false;
      scene.add(spotLightCameraHelper);

      // Point light
      const pointLight = new THREE.PointLight(0xffffff, 2.7);
      pointLight.castShadow = true;
      pointLight.shadow.mapSize.width = 1024;
      pointLight.shadow.mapSize.height = 1024;
      pointLight.shadow.camera.near = 0.1;
      pointLight.shadow.camera.far = 5;
      pointLight.position.set(-1, 1, 0);
      scene.add(pointLight);

      const pointLightCameraHelper = new THREE.CameraHelper(
        pointLight.shadow.camera,
      );
      pointLightCameraHelper.visible = false;
      scene.add(pointLightCameraHelper);

      /**
       * Materials
       */
      const material = new THREE.MeshStandardMaterial();
      material.roughness = 0.7;
      gui.add(material, 'metalness').min(0).max(1).step(0.001);
      gui.add(material, 'roughness').min(0).max(1).step(0.001);

      /**
       * Objects
       */
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        material,
      );
      sphere.castShadow = true;

      const textureLoader = new THREE.TextureLoader();

      const bakedShadow = textureLoader.load(
        new URL('@/assets/textures/shadows/bakedShadow.jpg', import.meta.url)
          .href,
      );
      bakedShadow.colorSpace = THREE.SRGBColorSpace;

      const simpleShadow = textureLoader.load(
        new URL('@/assets/textures/shadows/simpleShadow.jpg', import.meta.url)
          .href,
      );

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
      // const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5),         new THREE.MeshBasicMaterial({
      //   map: bakedShadow,
      // }));
      plane.rotation.x = -Math.PI * 0.5;
      plane.position.y = -0.5;
      plane.receiveShadow = true;

      const sphereShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 1.5),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          alphaMap: simpleShadow,
        }),
      );
      sphereShadow.rotation.x = -Math.PI * 0.5;
      sphereShadow.position.y = plane.position.y + 0.01;

      scene.add(sphere, sphereShadow, plane);

      // scene.add(sphere, plane);

      /**
       * Sizes
       */
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
      camera.position.x = 1;
      camera.position.y = 1;
      camera.position.z = 2;
      scene.add(camera);

      // Camera helper
      const directionalLightCameraHelper = new THREE.CameraHelper(
        directionalLight.shadow.camera,
      );
      directionalLightCameraHelper.visible = false;
      scene.add(directionalLightCameraHelper);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });
      // renderer.shadowMap.enabled = true;
      renderer.shadowMap.enabled = false;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Animate
       */
      const clock = new THREE.Clock();

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update the sphere
        sphere.position.x = Math.cos(elapsedTime) * 1.5;
        sphere.position.z = Math.sin(elapsedTime) * 1.5;
        sphere.position.y = Math.abs(Math.sin(elapsedTime * 5));

        // Update the shadow
        sphereShadow.position.x = sphere.position.x;
        sphereShadow.position.z = sphere.position.z;
        sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3;

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
