uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 p = gl_FragCoord.xy / u_resolution.xy;
  vec2 q = (p - vec2(0.4, 0.6)) * vec2(1.0, 1.6);
  vec3 col = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.8, 0.3), sqrt(p.y));
  float r = 0.2 + 0.1 * cos(atan(q.y, q.x) * 10.0 + 20.0 * q.x + 1.0);
  // cos: cosine
  // atan: arctangent - returns angle in radians

  col *= smoothstep(r, r + 0.01, length(q));

  r = 0.02;
  r += 0.002 * cos(120.0 * q.y);
  r += exp(-45.0 * p.y);
  // col *= smoothstep(r, r + 0.005, abs(q.x));
  col *=
      1.0 - (1.0 - smoothstep(r, r + 0.005, abs(q.x - 0.25 * sin(2.0 * q.y)))) *
                (1.0 - smoothstep(0.0, 0.1, q.y));

  gl_FragColor = vec4(col, 1.0);
}