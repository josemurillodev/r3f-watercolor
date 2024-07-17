import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal, ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { folder, useControls, useCreateStore } from 'leva';
import { StoreType } from 'leva/dist/declarations/src/types';
import * as THREE from 'three';

import CustomMaterial from './custom-material';
import CanvasTexture, { createCanvasTexture } from './canvas-texture';
import { getElemSize, throttle } from '@/helpers/helper-util';

type ExperienceProps = ThreeElements['group'] & {
  animate?: boolean;
  setAnimate: (e: boolean) => void;
  setLevaStore: (e: StoreType) => void;
};

function Experience({
  animate = true,
  setAnimate,
  setLevaStore,
  ...props
}: ExperienceProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const { width, height } = useThree((state) => state.viewport);
  const sizeRef = useRef(getElemSize());
  // const textureRef = useRef(new CanvasTexture());
  // const [tx, setTx] = useState(textureRef.current);
  const canvasTexture = useMemo(() => createCanvasTexture(), [width, height]);
  const store = useRef(useCreateStore()).current;
  // const animateRef = useRef(animate);
  const { gl, scene, camera } = useThree();
  const fboScene = useRef(new THREE.Scene());
  const targetA = useRef(
    new THREE.WebGLRenderTarget(sizeRef.current.width, sizeRef.current.height)
  );
  const targetB = useRef(
    new THREE.WebGLRenderTarget(sizeRef.current.width, sizeRef.current.height)
  );
  const fboMaterial = useRef<CustomMaterial>(null);
  const fboQuad = useRef<THREE.Mesh>(null);

  const onRender = useRef(() => {
    if (!camera || !fboMaterial.current) {
      return;
    }

    // running PING PONG
    gl.setRenderTarget(targetA.current);
    gl.render(fboScene.current, camera);

    // fboMaterial.current.texture = canvasTexture.instance;
    fboMaterial.current.prev = targetA.current.texture;
    // fboMaterial.time = time;

    // final OUTPUT
    gl.setRenderTarget(null);
    gl.render(scene, camera);

    // swap
    const temp = targetA.current;
    targetA.current = targetB.current;
    targetB.current = temp;
  }).current;

  const delayedRender = useRef(throttle(onRender, 200)).current;

  const resize = useRef(() => {
    sizeRef.current = getElemSize();
    // canvasTexture.resize();
    // targetA.current.setSize(sizeRef.current.width, sizeRef.current.height);
    // gl.setSize(sizeRef.current.width, sizeRef.current.height);

    if (fboMaterial.current) {
      fboMaterial.current.uniforms.resolution.value = [
        sizeRef.current.width,
        sizeRef.current.height,
        1,
        1,
      ];
    }
    // camera.updateProjectionMatrix();
    delayedRender();
  }).current;

  useControls(
    {
      TEXTURE: folder(canvasTexture.getLevaConfig(delayedRender), {
        collapsed: true,
      }),
    },
    { store }
  );

  useFrame((state, delta) => {
    // console.log(delta);
    // canvasTexture.hue += delta * 10;
    canvasTexture.update(delta);
    onRender();
  });

  useEffect(() => {
    setLevaStore(store);
    console.log(fboMaterial.current);
    window.addEventListener('resize', resize);
    return () => {
      // textureRef.dispose();
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <group {...props}>
      {createPortal(
        <mesh ref={fboQuad} scale={[width, height, 1]}>
          <planeGeometry args={[1, 1, 1, 1]} />
          <customMaterial
            ref={fboMaterial}
            key={CustomMaterial.key}
            prev={canvasTexture.instance}
            texture={canvasTexture.instance}
          />
        </mesh>,
        fboScene.current
      )}
      <mesh ref={meshRef} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial ref={matRef} map={targetA.current.texture} />
      </mesh>
    </group>
  );
}

export default Experience;
