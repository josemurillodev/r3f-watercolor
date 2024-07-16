uniform float uTime;
uniform float uProgress;
uniform sampler2D uDiffuse;
uniform sampler2D uPrev;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

// Fractal noise from https://github.com/yiwenl/glsl-fbm
// Modified signature to accept num octaves as an optional 2nd parameter

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
}
float fbm(vec2 x, int numOctaves) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100);
    // Rotate to reduce axial bias

    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for(int i = 0; i < numOctaves; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

float blendDarken(float base, float blend) {
    return min(blend, base);
}
vec3 blendDarken(vec3 base, vec3 blend) {
    return vec3(blendDarken(base.r, blend.r), blendDarken(base.g, blend.g), blendDarken(base.b, blend.b));
}
vec3 blendDarken(vec3 base, vec3 blend, float opacity) {
    return (blendDarken(base, blend) * opacity + base * (1.0 - opacity));
}

vec3 bgColor = vec3(1., 1., 1.);
void main() {
	// vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
    vec4 color = texture2D(uDiffuse, vUv); // mouse movement
    vec4 prev = texture2D(uPrev, vUv); // prev frame

    vec2 aspect = vec2(1., resolution.x / resolution.y);

    vec2 disp = fbm(vUv * 22.0, 4) * aspect * 0.01;

    vec4 texel = texture2D(uPrev, vUv);
    vec4 texel2 = texture2D(uPrev, vec2(vUv.x + disp.x, vUv.y));
    vec4 texel3 = texture2D(uPrev, vec2(vUv.x - disp.x, vUv.y));
    vec4 texel4 = texture2D(uPrev, vec2(vUv.x, vUv.y + disp.y));
    vec4 texel5 = texture2D(uPrev, vec2(vUv.x, vUv.y - disp.y));
    vec3 floodcolor = texel.rgb;
    floodcolor = blendDarken(floodcolor, texel2.rgb);
    floodcolor = blendDarken(floodcolor, texel3.rgb);
    floodcolor = blendDarken(floodcolor, texel4.rgb);
    floodcolor = blendDarken(floodcolor, texel5.rgb);


    vec3 waterColor = blendDarken(prev.rgb, floodcolor * (1. + 0.02), 0.7);

    vec3 finalColor = blendDarken(waterColor, color.rgb, 1.);

    // gl_FragColor = texel3;
	// gl_FragColor = vec4(disp,0.,1.);
    // gl_FragColor = vec4(waterColor, 1.);
    // gl_FragColor = vec4(color.rgb, 1.);
    // gl_FragColor = vec4(gradient.rgb, 1.);
    // gl_FragColor = vec4(lcolor.rgb, 1.);
    // gl_FragColor = vec4(finalColor.rgb, 1.);

    gl_FragColor = vec4(min(bgColor, finalColor * (1. + 0.01) + 0.001), 1.);

	// gl_FragColor = color + prev;
}