uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  vec3 color = vec3(vUv, 1.);
  gl_FragColor = vec4(color, 1.);
  gl_FragColor = texture2D(uTexture, vUv);
}