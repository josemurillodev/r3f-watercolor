import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import { LinearEncoding, LinearToneMapping } from 'three';

import Configs from '@/components/organisms/configs';

import './style.scss';
import Experience from './experience';
import { useLevaContext } from '@/context/leva-context';
import CanvasNav from './canvas-nav';

function Loader({ progress }: { progress: number }) {
  return (
    <Html center style={{ fontSize: 24 }}>
      {progress.toFixed(2)}%
    </Html>
  );
}

export default function App() {
  // Current route
  const { progress } = useProgress();
  const { levaStore, setLevaStore, animate, setAnimate } = useLevaContext();
  return (
    <>
      <Canvas
        // concurrent
        camera={{
          position: [0, 0, 2],
          fov: 70,
          near: 0.01,
        }}
        onCreated={({ gl }) => {
          console.log('gl', gl);
        }}
        gl={{
          toneMapping: LinearToneMapping,
          outputEncoding: LinearEncoding,
          antialias: true,
        }}
        frameloop={animate ? 'always' : 'never'}
        style={{ zIndex: 1 }}
      >
        <Suspense fallback={<Loader progress={progress} />}>
          <Experience
            animate={animate}
            setAnimate={setAnimate}
            setLevaStore={setLevaStore}
          />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
      <CanvasNav />
      <Configs levaStore={levaStore} />
    </>
  );
}
