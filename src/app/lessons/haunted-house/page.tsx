'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/examples/jsm/misc/Timer';
import { Sky } from 'three/addons/objects/Sky.js';

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

      const textureLoader = new THREE.TextureLoader();

      /**
       * Sky
       */
      const sky = new Sky();
      sky.scale.set(100, 100, 100);
      scene.add(sky);

      sky.material.uniforms['turbidity'].value = 10;
      sky.material.uniforms['rayleigh'].value = 3;
      sky.material.uniforms['mieCoefficient'].value = 0.1;
      sky.material.uniforms['mieDirectionalG'].value = 0.95;
      sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

      /**
       * Fog
       */
      // scene.fog = new THREE.Fog('#ff0000', 1, 13);
      scene.fog = new THREE.FogExp2('#04343f', 0.1);

      // Floor
      const floorAlphaTexture = textureLoader.load(
        new URL('@/assets/haunted-house/floor/alpha.jpg', import.meta.url).href,
      );
      const floorColorTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg',
          import.meta.url,
        ).href,
      );
      const floorARMTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg',
          import.meta.url,
        ).href,
      );
      const floorNormalTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg',
          import.meta.url,
        ).href,
      );
      const floorDisplacementTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg',
          import.meta.url,
        ).href,
      );

      floorColorTexture.repeat.set(8, 8);
      floorARMTexture.repeat.set(8, 8);
      floorNormalTexture.repeat.set(8, 8);
      floorDisplacementTexture.repeat.set(8, 8);

      floorColorTexture.wrapS = THREE.RepeatWrapping;
      floorARMTexture.wrapS = THREE.RepeatWrapping;
      floorNormalTexture.wrapS = THREE.RepeatWrapping;
      floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

      floorColorTexture.wrapT = THREE.RepeatWrapping;
      floorARMTexture.wrapT = THREE.RepeatWrapping;
      floorNormalTexture.wrapT = THREE.RepeatWrapping;
      floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

      floorColorTexture.colorSpace = THREE.SRGBColorSpace;
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20, 100, 100),
        new THREE.MeshStandardMaterial({
          alphaMap: floorAlphaTexture,
          transparent: true,
          map: floorColorTexture,
          aoMap: floorARMTexture,
          roughnessMap: floorARMTexture,
          metalnessMap: floorARMTexture,
          normalMap: floorNormalTexture,
          displacementMap: floorDisplacementTexture,
          displacementScale: 0.3,
          displacementBias: -0.2,
        }),
      );
      floor.rotation.x = -Math.PI * 0.5;
      scene.add(floor);

      gui
        .add(floor.material, 'displacementScale')
        .min(0)
        .max(1)
        .step(0.001)
        .name('floorDisplacementScale');
      gui
        .add(floor.material, 'displacementBias')
        .min(-1)
        .max(1)
        .step(0.001)
        .name('floorDisplacementBias');

      /**
       * House
       */
      // House container
      const house = new THREE.Group();
      scene.add(house);

      /**
       * Ghosts
       */
      const ghost1 = new THREE.PointLight('#8800ff', 6);
      const ghost2 = new THREE.PointLight('#ff0088', 6);
      const ghost3 = new THREE.PointLight('#ff0000', 6);

      ghost1.shadow.mapSize.width = 256;
      ghost1.shadow.mapSize.height = 256;
      ghost1.shadow.camera.far = 10;

      ghost2.shadow.mapSize.width = 256;
      ghost2.shadow.mapSize.height = 256;
      ghost2.shadow.camera.far = 10;

      ghost3.shadow.mapSize.width = 256;
      ghost3.shadow.mapSize.height = 256;
      ghost3.shadow.camera.far = 10;

      scene.add(ghost1, ghost2, ghost3);

      // Walls
      const wallColorTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.jpg',
          import.meta.url,
        ).href,
      );
      const wallARMTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.jpg',
          import.meta.url,
        ).href,
      );
      const wallNormalTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.jpg',
          import.meta.url,
        ).href,
      );

      wallColorTexture.colorSpace = THREE.SRGBColorSpace;

      const walls = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2.5, 4),
        new THREE.MeshStandardMaterial({
          map: wallColorTexture,
          aoMap: wallARMTexture,
          roughnessMap: wallARMTexture,
          metalnessMap: wallARMTexture,
          normalMap: wallNormalTexture,
        }),
      );
      walls.position.y += 1.25;
      house.add(walls);

      // Roof
      const roofColorTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg',
          import.meta.url,
        ).href,
      );
      const roofARMTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg',
          import.meta.url,
        ).href,
      );
      const roofNormalTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg',
          import.meta.url,
        ).href,
      );

      roofColorTexture.colorSpace = THREE.SRGBColorSpace;

      roofColorTexture.repeat.set(3, 1);
      roofARMTexture.repeat.set(3, 1);
      roofNormalTexture.repeat.set(3, 1);

      roofColorTexture.wrapS = THREE.RepeatWrapping;
      roofARMTexture.wrapS = THREE.RepeatWrapping;
      roofNormalTexture.wrapS = THREE.RepeatWrapping;

      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 1.5, 4),
        new THREE.MeshStandardMaterial({
          map: roofColorTexture,
          aoMap: roofARMTexture,
          roughnessMap: roofARMTexture,
          metalnessMap: roofARMTexture,
          normalMap: roofNormalTexture,
        }),
      );
      roof.position.y = 2.5 + 0.75;
      roof.rotation.y = Math.PI * 0.25;
      house.add(roof);

      // Door
      const doorColorTexture = textureLoader.load(
        new URL('@/assets/haunted-house/door/color.jpg', import.meta.url).href,
      );
      const doorAlphaTexture = textureLoader.load(
        new URL('@/assets/haunted-house/door/alpha.jpg', import.meta.url).href,
      );
      const doorAmbientOcclusionTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/door/ambientOcclusion.jpg',
          import.meta.url,
        ).href,
      );
      const doorHeightTexture = textureLoader.load(
        new URL('@/assets/haunted-house/door/height.jpg', import.meta.url).href,
      );
      const doorNormalTexture = textureLoader.load(
        new URL('@/assets/haunted-house/door/normal.jpg', import.meta.url).href,
      );
      const doorMetalnessTexture = textureLoader.load(
        new URL('@/assets/haunted-house/door/metalness.jpg', import.meta.url)
          .href,
      );
      const doorRoughnessTexture = textureLoader.load(
        new URL('@/assets/haunted-house/door/roughness.jpg', import.meta.url)
          .href,
      );

      doorColorTexture.colorSpace = THREE.SRGBColorSpace;

      const door = new THREE.Mesh(
        new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
        new THREE.MeshStandardMaterial({
          displacementScale: 0.15,
          displacementBias: -0.04,
          map: doorColorTexture,
          transparent: true,
          alphaMap: doorAlphaTexture,
          aoMap: doorAmbientOcclusionTexture,
          displacementMap: doorHeightTexture,
          normalMap: doorNormalTexture,
          metalnessMap: doorMetalnessTexture,
          roughnessMap: doorRoughnessTexture,
        }),
      );
      door.position.y = 1;
      door.position.z = 2 + 0.01;
      house.add(door);

      // Bushes
      const bushColorTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg',
          import.meta.url,
        ).href,
      );
      const bushARMTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg',
          import.meta.url,
        ).href,
      );
      const bushNormalTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg',
          import.meta.url,
        ).href,
      );

      bushColorTexture.colorSpace = THREE.SRGBColorSpace;

      bushColorTexture.repeat.set(2, 1);
      bushARMTexture.repeat.set(2, 1);
      bushNormalTexture.repeat.set(2, 1);

      bushColorTexture.wrapS = THREE.RepeatWrapping;
      bushARMTexture.wrapS = THREE.RepeatWrapping;
      bushNormalTexture.wrapS = THREE.RepeatWrapping;

      const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
      const bushMaterial = new THREE.MeshStandardMaterial({
        color: '#ccffcc',
        map: bushColorTexture,
        aoMap: bushARMTexture,
        roughnessMap: bushARMTexture,
        metalnessMap: bushARMTexture,
        normalMap: bushNormalTexture,
      });

      const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
      bush1.scale.set(0.5, 0.5, 0.5);
      bush1.position.set(0.8, 0.2, 2.2);
      bush1.rotation.x = -0.75;

      const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
      bush2.scale.set(0.25, 0.25, 0.25);
      bush2.position.set(1.4, 0.1, 2.1);
      bush2.rotation.x = -0.75;

      const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
      bush3.scale.set(0.4, 0.4, 0.4);
      bush3.position.set(-0.8, 0.1, 2.2);
      bush3.rotation.x = -0.75;

      const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
      bush4.scale.set(0.15, 0.15, 0.15);
      bush4.position.set(-1, 0.05, 2.6);
      bush4.rotation.x = -0.75;

      house.add(bush1, bush2, bush3, bush4);

      // Graves
      const graveColorTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg',
          import.meta.url,
        ).href,
      );
      const graveARMTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg',
          import.meta.url,
        ).href,
      );
      const graveNormalTexture = textureLoader.load(
        new URL(
          '@/assets/haunted-house/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg',
          import.meta.url,
        ).href,
      );

      graveColorTexture.colorSpace = THREE.SRGBColorSpace;

      graveColorTexture.repeat.set(0.3, 0.4);
      graveARMTexture.repeat.set(0.3, 0.4);
      graveNormalTexture.repeat.set(0.3, 0.4);

      const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
      const graveMaterial = new THREE.MeshStandardMaterial({
        map: graveColorTexture,
        aoMap: graveARMTexture,
        roughnessMap: graveARMTexture,
        metalnessMap: graveARMTexture,
        normalMap: graveNormalTexture,
      });

      const graves = new THREE.Group();
      scene.add(graves);

      for (let i = 0; i < 50; i++) {
        // Coordinates
        const angle = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 6;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        // Mesh
        const grave = new THREE.Mesh(graveGeometry, graveMaterial);
        grave.position.x = x;
        grave.position.y = Math.random() * 0.4;
        grave.position.z = z;

        grave.rotation.x = (Math.random() - 0.5) * 0.4;
        grave.rotation.y = (Math.random() - 0.5) * 0.4;
        grave.rotation.z = (Math.random() - 0.5) * 0.4;

        // Add to the graves group
        graves.add(grave);
      }

      /**
       * Lights
       */
      // Ambient light
      const ambientLight = new THREE.AmbientLight('#86cdff', 0.275);
      scene.add(ambientLight);

      // Directional light
      const directionalLight = new THREE.DirectionalLight('#86cdff', 1);
      directionalLight.position.set(3, 2, -8);
      scene.add(directionalLight);

      // Mappings
      directionalLight.shadow.mapSize.width = 256;
      directionalLight.shadow.mapSize.height = 256;
      directionalLight.shadow.camera.top = 8;
      directionalLight.shadow.camera.right = 8;
      directionalLight.shadow.camera.bottom = -8;
      directionalLight.shadow.camera.left = -8;
      directionalLight.shadow.camera.near = 1;
      directionalLight.shadow.camera.far = 20;

      // Door light
      const doorLight = new THREE.PointLight('#ff7d46', 5);
      doorLight.position.set(0, 2.2, 2.5);
      house.add(doorLight);

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
      camera.position.x = 4;
      camera.position.y = 2;
      camera.position.z = 5;
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
       * Shadows
       */
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Cast and receive
      directionalLight.castShadow = true;
      ghost1.castShadow = true;
      ghost2.castShadow = true;
      ghost3.castShadow = true;

      walls.castShadow = true;
      walls.receiveShadow = true;
      roof.castShadow = true;
      floor.receiveShadow = true;

      for (const grave of graves.children) {
        grave.castShadow = true;
        grave.receiveShadow = true;
      }

      /**
       * Animate
       */
      const timer = new Timer();

      const tick = () => {
        // Timer
        timer.update();
        const elapsedTime = timer.getElapsed();

        // Ghosts
        const ghost1Angle = elapsedTime * 0.5;
        ghost1.position.x = Math.cos(ghost1Angle) * 4;
        ghost1.position.z = Math.sin(ghost1Angle) * 4;
        ghost1.position.y =
          Math.sin(ghost1Angle) *
          Math.sin(ghost1Angle * 2.34) *
          Math.sin(ghost1Angle * 3.45);

        const ghost2Angle = -elapsedTime * 0.3;
        ghost2.position.x = Math.cos(ghost2Angle) * 5;
        ghost2.position.z = Math.sin(ghost2Angle) * 5;
        ghost2.position.y =
          Math.sin(ghost2Angle) *
          Math.sin(ghost2Angle * 2.34) *
          Math.sin(ghost2Angle * 3.45);

        const ghost3Angle = elapsedTime * 0.23;
        ghost3.position.x = Math.cos(ghost3Angle) * 6;
        ghost3.position.z = Math.sin(ghost3Angle) * 6;
        ghost3.position.y =
          Math.sin(ghost3Angle) *
          Math.sin(ghost3Angle * 2.34) *
          Math.sin(ghost3Angle * 3.45);

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