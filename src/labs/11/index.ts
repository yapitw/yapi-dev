import P5 from 'p5'
import { CANVAS_SIZE } from '../../config'

export const sketch = (s: P5): void => {
    const creatures: Creature[] = []
    const margin = 50
    const maxLife = 500
    let amount: number
    let cvs1: P5.Graphics
    let cvs2: P5.Graphics

    const colorList = 'e63946-f1faee-a8dadc-457b9d'.split('-').map((c) => '#' + c)

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        amount = (s.width * s.height) / s.pow(75, 2)
        for (let i = 0; i < amount; i++) {
            creatures.push(new Creature())
        }

        cvs1 = s.createGraphics(s.width, s.height)
        cvs2 = s.createGraphics(s.width, s.height)
        cvs2.background(0)
    }

    s.draw = () => {
        s.push()
        s.background(30, 30, 36)

        cvs1.clear(0, 0, 0, 1)
        cvs2.push()
        cvs2.blendMode(s.DARKEST)
        cvs2.background(0, 5)
        cvs2.pop()
        cvs2.blendMode(s.LIGHTEST)
        for (const creature of creatures) {
            creature.update()
            creature.draw()
        }

        s.blendMode(s.LIGHTEST)
        s.image(cvs2, 0, 0)
        s.image(cvs1, 0, 0)
        s.pop()
    }

    class Creature {
        age: number
        alpha: number
        size: number
        p: P5.Vector
        v: P5.Vector
        color: P5.Color
        maxSize: number
        life: number
        constructor() {
            this.maxSize = 3
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
            this.color.setAlpha(this.alpha)
            cvs2.push()
            cvs2.noStroke()
            cvs2.fill(this.color)
            cvs2.translate(this.p.x, this.p.y)
            cvs2.ellipse(0, 0, this.size)
            cvs2.pop()

            cvs1.push()
            cvs1.fill(this.color)
            cvs1.translate(this.p.x, this.p.y)
            cvs1.noStroke()
            cvs1.ellipse(0, 0, this.size * 3)
            cvs1.pop()
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

            const nScale = 500

            if (this.age % 30 === 0) {
                let angle
                angle = s.noise(this.p.x / nScale, this.p.y / nScale, s.frameCount / 300)
                angle *= s.TWO_PI * nScale
                const newAngle = s.round(angle / (s.TWO_PI / 6)) * (s.TWO_PI / 6)
                this.v = s.createVector(s.cos(newAngle), s.sin(newAngle)).setMag(-1)
            }

            this.p.add(this.v)

            this.alpha = s.map(s.min(this.age, this.life), 0, 50, 0, 255, true)
            this.size = s.map(s.min(this.age, this.life), 0, 50, 0, this.maxSize, true)

            this.life--
            this.age++
        }
    }
}

export class Lab11 {
    static title = 'Hex Runner'
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
