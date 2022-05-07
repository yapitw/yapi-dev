import P5 from 'p5'
import { CANVAS_SIZE } from '../../config'

export const sketch = (s: P5): void => {
    let centerPoint: P5.Vector

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(100)
        centerPoint = s.createVector(s.width / 2, s.height / 2)
    }

    s.draw = () => {
        const { frameCount, mouseX, mouseY } = s

        s.noStroke()
        const points = []
        const feats = 16
        const radius = 100
        const dist = centerPoint.dist(s.createVector(mouseX, mouseY))

        let nervous = false
        if (dist < 250 && dist > 100) {
            centerPoint.lerp(s.createVector(mouseX, mouseY), 0.03)
            nervous = true
        }

        if (dist < 40) nervous = false

        const charColor = s.color('black')

        s.background('white')
        s.fill(0)

        for (let i = 0; i < feats * 2; i++) {
            const radian = s.radians((360 / (feats * 2)) * i - 90)
            const newPoint = s.createVector(centerPoint.x, centerPoint.y)
            const mousePoint = s.createVector(mouseX, mouseY)

            if (i % 2 === 0) {
                newPoint.add(s.cos(radian) * radius, s.sin(radian) * radius)

                const dist2 = newPoint.dist(mousePoint)
                const tolerance = radius * 1
                let strength = 0.2
                if (dist2 < tolerance) {
                    strength = (tolerance - dist2) / tolerance
                    newPoint.add(mousePoint.sub(newPoint).mult(strength))
                }
                newPoint.add(
                    (((s.noise(frameCount / (strength > 0.2 ? 10 : 30) + i * 10) - 0.5) * tolerance) / 2) * strength,
                    (((s.noise(frameCount / (strength > 0.2 ? 10 : 30) + i * 10 + 3000) - 0.5) * tolerance) / 2) *
                        strength
                )
            } else {
                newPoint.add(s.cos(radian) * radius * 0.4, s.sin(radian) * radius * 0.4)
            }

            points.push(newPoint)
        }

        s.fill(charColor)
        s.strokeWeight(2)
        s.beginShape()
        for (const point of points) {
            s.curveVertex(point.x, point.y)
        }
        for (let i = 0; i < 3; i++) {
            s.curveVertex(points[i].x, points[i].y)
        }
        s.endShape()
        s.fill('white')
        const eyeMovement = s
            .createVector(mouseX, mouseY)
            .sub(centerPoint)
            .setMag(((300 - s.min(0, s.max(300, dist))) / 300) * 5)
        const eyePosition = centerPoint.copy().add(eyeMovement)
        s.circle(eyePosition.x - 20, eyePosition.y - 20, 30 + (nervous ? s.noise(frameCount / 2) : 0.5) * 20)
        s.circle(eyePosition.x + 20, eyePosition.y - 20, 25)
        s.fill(0)
        eyePosition.add(eyeMovement)
        s.circle(eyePosition.x - 20, eyePosition.y - 20, 10)
        s.circle(eyePosition.x + 20, eyePosition.y - 20, 10)

        s.noStroke()
        s.fill('yellow')
        s.ellipse(mouseX, mouseY, 20, 20)
    }
}

export class Lab10 {
    static title = 'Little Creature'
    static tags = 'p5js interaction creativeCoding'
    static description = 'A simple interactive toy for children. Practice of p5.js interaction control'

    container: HTMLElement
    instance: P5
    playing = true
    constructor(element: HTMLElement) {
        this.instance = new P5(sketch, element)
        this.container = element
        this.container.addEventListener('touchmove', this.preventScroll)
    }
    preventScroll = (e: Event): void => e.preventDefault()
    destroy = (): void => {
        this.container.addEventListener('touchmove', this.preventScroll)
        this.instance.remove()
    }
}
