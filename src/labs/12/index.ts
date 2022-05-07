import P5 from 'p5'
import { CANVAS_SIZE } from '../../config'

export const sketch = (s: P5): void => {
    const creatures: Creature[] = []
    const margin = 100
    const maxLife = 500
    const amount = 1000
    let randomID: number

    const colorList = 'dfbbb1-f56476-e43f6f-be3e82-5e4352'.split('-').map((c) => '#' + c)

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        for (let i = 0; i < amount; i++) {
            creatures.push(new Creature())
        }

        s.background(0)
        randomID = s.random(0, 10000)
    }

    s.draw = () => {
        s.background(0, 10)
        for (const creature of creatures) {
            creature.update()
            creature.draw()
        }
    }

    class Creature {
        maxSize: number
        age: number
        alpha: number
        size: number
        life: number
        p: P5.Vector
        v: P5.Vector
        color: P5.Color

        constructor() {
            this.maxSize = 2
            this.life = s.random(Math.round(maxLife / 3), maxLife)
            this.age = 0
            this.alpha = 0
            this.size = 0
            this.p = s.createVector(s.random(-margin, s.width + margin), s.random(-margin, s.height + margin))
            this.v = s.createVector()
            this.color = s.color(s.random(colorList))
        }

        init() {
            this.age = 0
            this.alpha = 0
            this.size = 0
            this.p = s.createVector(s.random(-margin, s.width + margin), s.random(-margin, s.height + margin))
            this.v = s.createVector()
            this.color = s.color(s.random(colorList))
        }

        draw() {
            s.push()
            s.noStroke()
            this.color.setAlpha(this.alpha)
            s.fill(this.color)
            s.translate(this.p.x, this.p.y)
            s.ellipse(0, 0, this.size)
            s.pop()
        }

        update() {
            if (
                this.life <= 0 ||
                this.p.x < -margin ||
                this.p.x > s.width + margin ||
                this.p.y < -margin ||
                this.p.y > s.height + margin
            ) {
                this.init()
                this.life = maxLife
            }

            let iteration = 5

            const noiseScale = 1000
            while (iteration > 0) {
                const angle = s.noise(this.p.x / noiseScale, this.p.y / noiseScale, randomID) * s.TWO_PI * noiseScale

                this.v = s.createVector(s.cos(angle), s.sin(angle)).mult(0.2)
                this.p.add(this.v)
                iteration--
            }

            this.alpha = s.map(s.min(this.age, this.life), 0, 50, 0, 255, true)
            this.size = s.map(s.min(this.age, this.life), 0, 50, 0, this.maxSize, true)

            this.life--
            this.age++
        }
    }
}

export class Lab12 {
    static title = 'Noise Flow 2'
    static tags = 'p5js'
    static description = 'Practice of p5.js generative animation'

    instance: P5
    playing = true
    constructor(element: HTMLElement) {
        this.instance = new P5(sketch, element)
    }

    destroy = (): void => {
        this.instance.remove()
    }
}
