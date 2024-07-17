import * as THREE from 'three';
import { Object3DNode, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

import vertexShader from './shaders/vertex.glsl?raw';
import fragmentShader from './shaders/fbo.glsl?raw';

const key = THREE.MathUtils.generateUUID();

const MaterialBlank = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uDiffuse: null,
    uPrev: null,
    resolution: [window.innerWidth, window.innerHeight, 1, 1],
  },
  vertexShader,
  fragmentShader
);

export const BlankLevaConfig = {
  uProgress: {
    value: 0,
    min: 0,
    max: 1,
    step: 0.0001,
  },
};

export default class CustomMaterial extends MaterialBlank {
  key = key;

  set time(v: number) {
    this.uniforms.uTime.value = v || 0;
  }

  set progress(v: number) {
    this.uniforms.uProgress.value = v;
  }

  set texture(v: THREE.Texture | THREE.CanvasTexture) {
    this.uniforms.uDiffuse.value = v;
  }

  set prev(v: THREE.Texture | THREE.CanvasTexture) {
    this.uniforms.uPrev.value = v;
  }

  set resolution(v: THREE.Vector4) {
    this.uniforms.resolution.value = v;
  }
}

export const speedConfig = { min: 0.0, max: 1, value: 0.05, step: 0.0001 };
export const bumpConfig = { min: 0.0, max: 1, value: 0.01, step: 0.0001 };

extend({ CustomMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    customMaterial: Object3DNode<CustomMaterial, typeof CustomMaterial>;
  }
}
