import galaxyThumb from '#/assets/thumbnails/galaxy.jpg'
import hexRunnerThumb from '#/assets/thumbnails/hex-runner.jpg'
import littleCreatureThumb from '#/assets/thumbnails/little-creature.jpg'
import noiseDirectionThumb from '#/assets/thumbnails/noise-direction.jpg'
import noiseFlowThumb from '#/assets/thumbnails/noise-flow.jpg'
import noiseFlow2Thumb from '#/assets/thumbnails/noise-flow-2.jpg'
import noisePaceThumb from '#/assets/thumbnails/noise-pace.jpg'
import reactionDiffusionThumb from '#/assets/thumbnails/reaction-diffusion.jpg'
import reactionDiffusionDrawThumb from '#/assets/thumbnails/reaction-diffusion-draw.jpg'
import vortexThumb from '#/assets/thumbnails/vortex.jpg'
import wavesThumb from '#/assets/thumbnails/waves.jpg'

/** A running sketch. Every lab class takes its container element in the constructor. */
export interface SketchInstance {
  terminated?: boolean
  destroy?: () => void
}

export type SketchConstructor = new (container: HTMLDivElement) => SketchInstance

export interface Experiment {
  slug: string
  /** Chronological number, kept from the original "Exp. N" naming. */
  number: number
  title: string
  tools: string[]
  description: string
  thumbnail: string
  /** Experiments that embed another deployed site instead of running locally. */
  externalUrl?: string
  /** Path of the sketch source on GitHub, relative to the repo root. */
  sourcePath: string
  load: () => Promise<SketchConstructor>
}

// Newest first: this is the order the gallery and prev/next navigation use.
export const experiments: Experiment[] = [
  {
    slug: 'vortex',
    number: 15,
    title: 'Vortex',
    tools: ['p5.js', 'generative design'],
    description:
      'A generative flow field that winds particles into a vortex. Click the canvas to draw a new frame.',
    thumbnail: vortexThumb,
    externalUrl: 'https://yapi-generative-vortex.vercel.app',
    sourcePath: 'src/sketches/labs/15',
    load: () => import('#/sketches/labs/15').then((m) => m.Lab15),
  },
  {
    slug: 'waves',
    number: 14,
    title: 'Waves',
    tools: ['three.js', 'GLSL'],
    description: 'An ocean surface shaded with a custom GLSL vertex and fragment shader.',
    thumbnail: wavesThumb,
    externalUrl: 'https://yapi-learn-threejs.vercel.app/26RagingSea/index.html',
    sourcePath: 'src/sketches/labs/14',
    load: () => import('#/sketches/labs/14').then((m) => m.Lab14),
  },
  {
    slug: 'galaxy',
    number: 13,
    title: 'Galaxy',
    tools: ['three.js'],
    description: 'A spiral galaxy built from a three.js particle system.',
    thumbnail: galaxyThumb,
    externalUrl: 'https://yapi-learn-threejs.vercel.app/27AnimatedGalaxy/index.html',
    sourcePath: 'src/sketches/labs/13',
    load: () => import('#/sketches/labs/13').then((m) => m.Lab13),
  },
  {
    slug: 'noise-flow-2',
    number: 12,
    title: 'Noise Flow 2',
    tools: ['p5.js'],
    description: 'Particles drifting through a Perlin noise field, drawn as generative animation.',
    thumbnail: noiseFlow2Thumb,
    sourcePath: 'src/sketches/labs/12',
    load: () => import('#/sketches/labs/12').then((m) => m.Lab12),
  },
  {
    slug: 'hex-runner',
    number: 11,
    title: 'Hex Runner',
    tools: ['p5.js'],
    description:
      'Short-lived runners turning at hexagonal angles, leaving trails that fade over time.',
    thumbnail: hexRunnerThumb,
    sourcePath: 'src/sketches/labs/11',
    load: () => import('#/sketches/labs/11').then((m) => m.Lab11),
  },
  {
    slug: 'little-creature',
    number: 10,
    title: 'Little Creature',
    tools: ['p5.js', 'interaction'],
    description:
      'A small interactive toy for children. Move your cursor near the creature and it follows, watches and gets nervous.',
    thumbnail: littleCreatureThumb,
    sourcePath: 'src/sketches/labs/10',
    load: () => import('#/sketches/labs/10').then((m) => m.Lab10),
  },
  {
    slug: 'noise-pace',
    number: 7,
    title: 'Noise Pace',
    tools: ['Perlin noise', 'Canvas API'],
    description: 'Particles pacing through a noise-driven force map.',
    thumbnail: noisePaceThumb,
    sourcePath: 'src/sketches/labs/7',
    load: () => import('#/sketches/labs/7').then((m) => m.Lab7),
  },
  {
    slug: 'noise-flow',
    number: 6,
    title: 'Noise Flow',
    tools: ['Perlin noise', 'Canvas API'],
    description: 'Particle trails following a Perlin noise flow field.',
    thumbnail: noiseFlowThumb,
    sourcePath: 'src/sketches/labs/6',
    load: () => import('#/sketches/labs/6').then((m) => m.Lab6),
  },
  {
    slug: 'noise-direction',
    number: 5,
    title: 'Noise Direction',
    tools: ['Perlin noise', 'Canvas API'],
    description: 'A grid of needles pointing along a slowly shifting 3D Perlin noise field.',
    thumbnail: noiseDirectionThumb,
    sourcePath: 'src/sketches/labs/5',
    load: () => import('#/sketches/labs/5').then((m) => m.Lab5),
  },
  {
    slug: 'reaction-diffusion-draw',
    number: 4,
    title: 'Reaction Diffusion, drawn',
    tools: ['GLSL', 'three.js'],
    description:
      'The reaction-diffusion simulation, seeded by hand. Press and drag on the canvas, and the pattern grows out of your strokes. It began as a step toward limiting growth to shapes taken from a hidden image layer.',
    thumbnail: reactionDiffusionDrawThumb,
    sourcePath: 'src/sketches/labs/4',
    load: () => import('#/sketches/labs/4').then((m) => m.Lab4),
  },
  {
    slug: 'reaction-diffusion',
    number: 3,
    title: 'Reaction Diffusion',
    tools: ['GLSL', 'three.js'],
    description:
      'A Gray-Scott reaction-diffusion simulation running in a ping-pong pair of render targets.',
    thumbnail: reactionDiffusionThumb,
    sourcePath: 'src/sketches/labs/3',
    load: () => import('#/sketches/labs/3').then((m) => m.Lab3),
  },
]

export function findExperiment(slug: string) {
  const index = experiments.findIndex((experiment) => experiment.slug === slug)
  if (index === -1) return undefined
  return {
    experiment: experiments[index],
    newer: experiments[index - 1],
    older: experiments[index + 1],
  }
}
