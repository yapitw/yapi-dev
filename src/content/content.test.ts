import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { experiments, findExperiment } from './experiments'
import { findNocExercise, nocExercises } from './noc'

describe('experiments', () => {
  it('have unique slugs and numbers', () => {
    expect(new Set(experiments.map((e) => e.slug)).size).toBe(experiments.length)
    expect(new Set(experiments.map((e) => e.number)).size).toBe(experiments.length)
  })

  it('are listed newest first', () => {
    const numbers = experiments.map((e) => e.number)
    expect(numbers).toEqual([...numbers].sort((a, b) => b - a))
  })

  it('link to their neighbours', () => {
    const found = findExperiment(experiments[1].slug)
    expect(found?.newer?.slug).toBe(experiments[0].slug)
    expect(found?.older?.slug).toBe(experiments[2].slug)
    expect(findExperiment('missing')).toBeUndefined()
  })

  it('each keep a redirect from their old /exp/LabN URL', () => {
    const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'))
    const redirects = new Map<string, string>(
      vercel.redirects.map((r: { source: string; destination: string }) => [
        r.source,
        r.destination,
      ]),
    )
    for (const experiment of experiments) {
      expect(redirects.get(`/exp/Lab${experiment.number}`)).toBe(`/lab/${experiment.slug}`)
    }
  })
})

describe('Nature of Code exercises', () => {
  it('match an exported sketch', () => {
    const sources = ['lecture0', 'lecture1', 'lecture2']
      .map((file) => readFileSync(new URL(`../sketches/noc/${file}.ts`, import.meta.url), 'utf8'))
      .join('\n')
    for (const exercise of nocExercises) {
      expect(sources).toContain(`export const ${exercise.id} =`)
    }
    expect(findNocExercise('lecture9_9')).toBeUndefined()
  })
})
