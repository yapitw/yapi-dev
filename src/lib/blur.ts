/**
 * Approximate Gaussian blur of a single-channel grid, in place: three box blurs per axis.
 * `radius` is in cells; the result's standard deviation is roughly `radius`.
 */
export function blur(data: Float32Array, width: number, height: number, radius: number) {
  const r = Math.max(1, Math.round(radius))
  const scratch = new Float32Array(Math.max(width, height))
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < height; y++) boxBlur1D(data, y * width, 1, width, r, scratch)
    for (let x = 0; x < width; x++) boxBlur1D(data, x, width, height, r, scratch)
  }
  return data
}

/** Running-sum box blur along one row or column, treating everything outside as 0. */
function boxBlur1D(
  data: Float32Array,
  offset: number,
  stride: number,
  length: number,
  r: number,
  scratch: Float32Array,
) {
  for (let i = 0; i < length; i++) scratch[i] = data[offset + i * stride]
  const size = 2 * r + 1
  let sum = 0
  for (let i = 0; i <= Math.min(r, length - 1); i++) sum += scratch[i]
  for (let i = 0; i < length; i++) {
    data[offset + i * stride] = sum / size
    const enter = i + r + 1
    const leave = i - r
    if (enter < length) sum += scratch[enter]
    if (leave >= 0) sum -= scratch[leave]
  }
}
