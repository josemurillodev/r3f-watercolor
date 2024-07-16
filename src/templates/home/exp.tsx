/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { folder, useControls, useCreateStore } from 'leva';
import CustomCanvasTexture from './canvas-texture';
import { getElemSize } from '@/helpers/helper-util';

const vertShaderString = `
precision mediump float;

varying vec2 texCoord;

void main() {
  gl_Position = vec4(uv, 0.0, 1.0);
  texCoord = uv;
}`;

const distortionFragShaderString = `
precision mediump float;

uniform sampler2D u_tex;

varying vec2 texCoord;

void main() {
    vec4 sample_col = texture2D(u_tex, texCoord);
    // MESS WITH THE SAMPLE COLOR HERE
    gl_FragColor = sample_col;
}
`;

const outputFragShaderString = `
precision mediump float;

uniform sampler2D u_tex;

varying vec2 texCoord;

void main() {
    vec4 sample_col = texture2D(u_tex, texCoord);
    gl_FragColor = sample_col;
}
`;
const defSize = getElemSize();
const canvasTexture = new CustomCanvasTexture(defSize.width, defSize.height);

export default function ShaderRenderTest(props: any) {
  const gl_ref: any = useRef();

  const [dist_uniforms, output_uniforms, target_0, target_1] = useMemo(() => {
    const t0 = new THREE.WebGLRenderTarget(1024, 1024);
    const t1 = new THREE.WebGLRenderTarget(1024, 1024);
    const d_unif = {
      u_time: { value: 0.0 },
      u_tex: { value: new THREE.Texture() },
    };
    const o_unif = {
      u_tex: { value: new THREE.Texture() },
    };

    t0.texture = canvasTexture.instance;
    t1.texture = t0.texture.clone();
    return [d_unif, o_unif, t0, t1];
  }, []);

  const distortion_mat = useRef(
    new THREE.ShaderMaterial({
      uniforms: dist_uniforms,
      vertexShader: vertShaderString,
      fragmentShader: distortionFragShaderString,
    })
  ).current;

  const store = useRef(useCreateStore()).current;
  useControls(
    {
      TEXTURE: folder(canvasTexture.getLevaConfig(), {
        collapsed: true,
      }),
    },
    { store }
  );

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(({ gl, scene, camera }, delta) => {
    const mat = gl_ref.current.material;
    distortion_mat.uniforms.u_time.value += delta;

    mat.uniforms.u_tex.value = target_0.texture;

    // gl.autoClear = false;
    // scene.overrideMaterial = distortion_mat;
    gl.setRenderTarget(target_1);
    gl.render(scene, camera);
    mat.uniforms.u_tex.value = target_1.texture;
    
    // gl.autoClear = true;
    // scene.overrideMaterial = null;
    gl.setRenderTarget(null);
    gl.render(scene, camera);


    const temp = target_0.texture;
    target_0.texture = target_1.texture;
    target_1.texture = temp;
  });

  return (
    <mesh ref={gl_ref}>
      <planeGeometry />
      <shaderMaterial
        uniforms={output_uniforms}
        fragmentShader={outputFragShaderString}
        vertexShader={vertShaderString}
      />
    </mesh>
  );
}
