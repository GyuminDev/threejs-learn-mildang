'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Page() {
  const el = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!el.current) {
      return;
    }

    el.current.innerHTML = '';

    // Scene
    const scene = new THREE.Scene();

    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera
    const virtualCamera = new THREE.PerspectiveCamera(
      15,
      sizes.width / sizes.height,
      5,
      10,
    );

    const helper = new THREE.CameraHelper(virtualCamera);
    scene.add(helper);

    virtualCamera.position.z = 10;
    virtualCamera.lookAt(mesh.position);
    scene.add(virtualCamera);

    // const radian = Math.PI;
    // // radian을 활용해서 virtualCamera를 y축 회전 시켜보세요 회전 변환을 해보세요
    // // y축 기준으로 90도 회전
    // const rotationMatrix = new THREE.Matrix4().makeRotationY(radian / 2);
    // virtualCamera.applyMatrix4(rotationMatrix);
    //
    // virtualCamera.lookAt(mesh.position);

    const realCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
    );
    realCamera.position.z = 20;
    realCamera.position.y = 20;
    realCamera.lookAt(mesh.position);
    scene.add(realCamera);

    const axesHelper = new THREE.AxesHelper(4);
    scene.add(axesHelper);

    const renderer = new THREE.WebGLRenderer({
      canvas: el.current,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let requestId: number;

    const clock = new THREE.Clock();

    const controls = new OrbitControls(realCamera, el!.current);
    controls.enableDamping = true;

    function tick() {
      controls.update();

      const eslapsedTime = clock.getElapsedTime();
      // const delta = clock.getDelta();

      // console.log(eslapsedTime);

      // virtualCamera.lookAt(mesh.position);

      const radian = (Math.PI / 100000) * eslapsedTime;
      // radian을 활용해서 virtualCamera를 y축 회전 시켜보세요 회전 변환을 해보세요
      // y축 기준으로 90도 회전
      const rotationMatrix = new THREE.Matrix4().makeRotationY(radian / 2);
      virtualCamera.applyMatrix4(rotationMatrix);

      // virtualCamera.lookAt(mesh.position);

      renderer.render(scene, realCamera);

      requestId = window.requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return <canvas style={{ display: 'block' }} ref={el}></canvas>;
}

export default Page;
