import p5 from 'p5'
import { CANVAS_SIZE } from './configs'

export const lecture1_1 = (s: p5): void => {
    class Walker {
        pos: p5.Vector
        s: p5
        constructor(x: number, y: number, s: p5) {
            this.s = s
            this.pos = this.s.createVector(x, y)
        }

        update() {
            const { s } = this
            this.pos.x = this.pos.x + s.random(-5, 5)
            this.pos.y = this.pos.y + s.random(-5, 5)
        }

        show() {
            const { s } = this
            s.point(this.pos.x, this.pos.y)
        }
    }

    let walker: Walker

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        walker = new Walker(CANVAS_SIZE / 2, CANVAS_SIZE / 2, s)
        s.background(0)
    }

    s.draw = () => {
        s.stroke(255, 100)
        s.strokeWeight(2)
        walker.update()
        walker.show()
    }
}
lecture1_1.title = 'Vector Random Walker'

export const lecture1_2 = (s: p5): void => {
    class Walker {
        pos: p5.Vector
        vel: p5.Vector
        s: p5
        constructor(x: number, y: number, s: p5) {
            this.s = s
            this.pos = this.s.createVector(x, y)
            this.vel = p5.Vector.random2D()
            this.vel.mult(s.random(3))
        }

        update() {
            this.pos.add(this.vel)
        }

        show() {
            const { s } = this
            s.stroke(255, 100)
            s.fill(255, 100)
            s.strokeWeight(2)
            s.ellipse(this.pos.x, this.pos.y, 32)
        }
    }

    let walker: Walker

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        walker = new Walker(CANVAS_SIZE / 2, CANVAS_SIZE / 2, s)
    }

    s.draw = () => {
        s.background(0)
        walker.update()
        walker.show()
    }
}
lecture1_2.title = 'Vector Math - Add'

export const lecture1_3 = (s: p5): void => {
    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(0)
    }

    s.draw = () => {
        s.translate(s.width / 2, s.height / 2)

        // let v = s.createVector(s.random(-100, 100), s.random(-100, 100))
        const v = p5.Vector.random2D()
        v.mult(s.random(0, 100))

        s.strokeWeight(2)
        s.stroke(255, 50)
        s.line(0, 0, v.x, v.y)
    }
}
lecture1_3.title = 'Vector Math - Random Vector'

export const lecture1_5 = (s: p5): void => {
    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(0)
    }

    s.draw = () => {
        s.background(0)
        const pos = s.createVector(s.width / 2, s.height / 2)
        const mouse = s.createVector(s.mouseX || s.width / 2, s.mouseY || s.height / 2)

        const v = p5.Vector.sub(mouse, pos)

        v.setMag(50)

        s.translate(s.width / 2, s.height / 2)
        s.strokeWeight(2)
        s.stroke(255)
        s.line(0, 0, v.x, v.y)
    }
}
lecture1_5.title = 'Vector Math - Unit Vector (Normalize)'
// Pythagorean theorem
// a^2 + b^2 = c^2

export const lecture1_6 = (s: p5): void => {
    class Mover {
        s: p5
        pos: p5.Vector
        vel: p5.Vector
        acc: p5.Vector
        constructor(x: number, y: number, s: p5) {
            this.s = s
            this.pos = s.createVector(x, y)
            this.vel = p5.Vector.random2D()
            this.vel.mult(s.random(3))
            this.acc = p5.Vector.random2D()
            this.acc.setMag(0.01)
        }

        update() {
            const { s } = this
            const mouse = s.createVector(s.mouseX || s.width / 2, s.mouseY || s.height / 2)
            this.acc = p5.Vector.sub(mouse, this.pos)
            this.acc.setMag(0.5)
            this.vel.add(this.acc)
            // this.vel.limit(2)
            this.pos.add(this.vel)
        }

        show() {
            const { s } = this
            s.stroke(255)
            s.strokeWeight(0)
            s.fill(255)
            s.ellipse(this.pos.x, this.pos.y, 5)
        }
    }

    let mover: Mover

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.translate(s.width / 2, s.height / 2)
        s.background(0)
        mover = new Mover(CANVAS_SIZE / 2, CANVAS_SIZE / 2, s)
    }

    s.draw = () => {
        // s.background(0, 10)
        mover.update()
        mover.show()
    }

    s.keyTyped = () => {
        if (s.key === 'r') {
            s.background(0)
        }
    }
}
lecture1_6.title = 'Vector Math - Acceleration Vector'

export const lecture1_7 = (s: p5): void => {
    let prevPos: p5.Vector
    let pos: p5.Vector

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(0)
        pos = s.createVector(CANVAS_SIZE / 2, CANVAS_SIZE / 2)
        prevPos = pos.copy()
    }

    s.draw = () => {
        s.stroke(255, 100)
        s.strokeWeight(2)
        // s.point(pos.x, pos.y)
        s.line(pos.x, pos.y, prevPos.x, prevPos.y)
        prevPos = pos.copy()

        const step = p5.Vector.random2D()

        const r = s.random(100)
        if (r < 1) {
            step.setMag(s.random(25, 100))
        } else {
            step.setMag(2)
        }

        pos.add(step)
    }

    s.keyTyped = () => {
        if (s.key === 'r') {
            s.background(0)
        }
    }
}
lecture1_7.title = 'Vector Math - Random Walker with Vectors and Lévy Flight'
