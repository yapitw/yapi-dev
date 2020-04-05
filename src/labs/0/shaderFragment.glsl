uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  gl_FragColor = vec4(st.x, st.y, (sin(u_time * 0.01) + 1.0) / 2.0, 1.0);
}
