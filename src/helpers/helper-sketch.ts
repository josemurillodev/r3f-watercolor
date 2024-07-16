import { shaderMaterial } from '@react-three/drei';

import { extractValues } from './helper-leva';

export const createSketchMaterial = (vert: string, frag: string, uniforms: any = {}) => {
  const getShaderConfig = () => extractValues(frag).values;
  const SketchMaterial = shaderMaterial(
    {
      ...getShaderConfig(),
      resolution: [window.innerWidth, window.innerHeight],
      time: 0,
      opacity: 1.0,
      ...uniforms,
    },
    vert,
    frag
  );
  return { SketchMaterial, getShaderConfig, frag, vert };
};

export default createSketchMaterial;
