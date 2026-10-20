import { describe, expect, it } from 'vitest'
import { blur } from './blur'

describe('blur', () => {
  it('spreads a point symmetrically and keeps its total away from the edges', () => {
    const width = 41
    const data = new Float32Array(width * width)
    data[20 * width + 20] = 1
    blur(data, width, width, 3)

    const total = data.reduce((sum, value) => sum + value, 0)
    expect(total).toBeCloseTo(1, 5)
    expect(data[20 * width + 17]).toBeCloseTo(data[20 * width + 23], 6)
    expect(data[17 * width + 20]).toBeCloseTo(data[20 * width + 17], 6)
    expect(data[20 * width + 20]).toBeGreaterThan(data[20 * width + 23])
  })

  it('leaves a uniform interior unchanged', () => {
    const width = 30
    const data = new Float32Array(width * width).fill(1)
    blur(data, width, width, 2)
    expect(data[15 * width + 15]).toBeCloseTo(1, 6)
  })
})
