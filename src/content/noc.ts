export interface NocExercise {
  /** Matches the sketch export name in `src/sketches/noc`. */
  id: string
  episode: string
  title: string
}

// In lecture order.
export const nocExercises: NocExercise[] = [
  { id: 'lecture0_3', episode: '0.3', title: 'Perlin noise' },
  { id: 'lecture0_4', episode: '0.4', title: 'Perlin noise' },
  { id: 'lecture0_5', episode: '0.5', title: '2D Perlin noise' },
  { id: 'lecture0_6', episode: '0.6', title: 'Simplex noise' },
  { id: 'lecture0_7', episode: '0.7', title: 'Random walker' },
  { id: 'lecture1_1', episode: '1.1', title: 'Vector random walker' },
  { id: 'lecture1_2', episode: '1.2', title: 'Vector math: add' },
  { id: 'lecture1_3', episode: '1.3', title: 'Vector math: random vector' },
  { id: 'lecture1_5', episode: '1.5', title: 'Vector math: unit vector (normalize)' },
  { id: 'lecture1_6', episode: '1.6', title: 'Vector math: acceleration vector' },
  {
    id: 'lecture1_7',
    episode: '1.7',
    title: 'Vector math: random walker with vectors and Lévy flight',
  },
  { id: 'lecture2_1', episode: '2.1', title: 'Forces: gravity and wind' },
  { id: 'lecture2_2', episode: '2.2', title: 'Forces: mass and acceleration' },
  { id: 'lecture2_3', episode: '2.3', title: 'Forces: friction' },
  { id: 'lecture2_4', episode: '2.4', title: 'Forces: drag' },
]

export function findNocExercise(id: string) {
  const index = nocExercises.findIndex((exercise) => exercise.id === id)
  if (index === -1) return undefined
  return {
    exercise: nocExercises[index],
    previous: nocExercises[index - 1],
    next: nocExercises[index + 1],
  }
}
