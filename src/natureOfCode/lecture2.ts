import p5 from 'p5'
import { CANVAS_SIZE } from './configs'

export const lecture2_1 = (s: p5): void => {
    class Mover {
        s: p5
        pos: p5.Vector
        vel: p5.Vector
        acc: p5.Vector
        r: number

        constructor(x: number, y: number, s: p5) {
            this.s = s
            this.pos = s.createVector(x, y)
            this.vel = p5.Vector.random2D()
            this.vel.mult(s.random(3))
            this.acc = s.createVector(0, 0)
            this.r = 16
        }

        applyForce(force: p5.Vector) {
            this.acc.add(force)
        }

        edges() {
            const { s } = this
            if (this.pos.y <= 0 + this.r) {
                this.pos.y = 0 + this.r
                this.vel.y *= -1
            }
            if (this.pos.y >= s.height - this.r) {
                this.pos.y = s.height - this.r
                this.vel.y *= -1
            }
            if (this.pos.x <= 0 + this.r) {
                this.pos.x = 0 + this.r
                this.vel.x *= -1
            }
            if (this.pos.x >= s.width - this.r) {
                this.pos.x = s.width - this.r
                this.vel.x *= -1
            }
        }

        update() {
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.set(0, 0)
        }

        show() {
            s.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
        }
    }

    let mover: Mover

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(0)
        mover = new Mover(CANVAS_SIZE / 2, CANVAS_SIZE / 2, s)
    }

    s.draw = () => {
        s.stroke(255, 100)
        s.strokeWeight(2)
        s.background(0)

        const wind = s.createVector(0.2, 0)
        if (s.mouseIsPressed) {
            mover.applyForce(wind)
        }

        const gravity = s.createVector(0, 0.98)
        mover.applyForce(gravity)

        mover.update()
        mover.edges()
        mover.show()
    }
}
lecture2_1.title = 'Force - Simulating Forces: Gravity and Wind'

export const lecture2_2 = (s: p5): void => {
    class Mover {
        s: p5
        pos: p5.Vector
        vel: p5.Vector
        acc: p5.Vector
        r: number
        mass: number

        constructor(x: number, y: number, mass: number, s: p5) {
            this.s = s
            this.pos = s.createVector(x, y)
            this.vel = s.createVector(0, 0)
            this.acc = s.createVector(0, 0)
            this.r = Math.sqrt(mass) * 10
            this.mass = mass
        }

        applyForce(force: p5.Vector) {
            const f = force.div(this.mass)
            this.acc = this.acc.add(f)
        }

        edges() {
            const { s } = this
            if (this.pos.y <= 0 + this.r) {
                this.pos.y = 0 + this.r
                this.vel.y *= -1
            }
            if (this.pos.y >= s.height - this.r) {
                this.pos.y = s.height - this.r
                this.vel.y *= -1
            }
            if (this.pos.x <= 0 + this.r) {
                this.pos.x = 0 + this.r
                this.vel.x *= -1
            }
            if (this.pos.x >= s.width - this.r) {
                this.pos.x = s.width - this.r
                this.vel.x *= -1
            }
        }

        update() {
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.set(0, 0)
        }

        show() {
            s.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
        }
    }

    let moverA: Mover
    let moverB: Mover

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(0)
        moverA = new Mover(100, 200, 10, s)
        moverB = new Mover(300, 200, 1, s)
    }

    s.draw = () => {
        s.stroke(255, 100)
        s.strokeWeight(2)
        s.background(0)

        const wind = s.createVector(0.2, 0)
        if (s.mouseIsPressed) {
            moverA.applyForce(wind)
            moverB.applyForce(wind)
        }

        const gravity = s.createVector(0, 1)
        const weightA = gravity.mult(moverA.mass)
        const weightB = gravity.mult(moverB.mass)
        moverA.applyForce(weightA)
        moverB.applyForce(weightB)

        moverA.update()
        moverA.edges()
        moverA.show()

        moverB.update()
        moverB.edges()
        moverB.show()
    }
}
lecture2_2.title = 'Force - Mass and Acceleration'

export const lecture2_3 = (s: p5): void => {
    class Mover {
        s: p5
        pos: p5.Vector
        vel: p5.Vector
        acc: p5.Vector
        r: number
        mass: number

        constructor(x: number, y: number, mass: number, s: p5) {
            this.s = s
            this.pos = s.createVector(x, y)
            this.vel = s.createVector(0, 0)
            this.acc = s.createVector(0, 0)
            this.r = Math.sqrt(mass) * 10
            this.mass = mass
        }

        friction() {
            const { s } = this
            const diff = s.height - (this.pos.y + this.r)
            if (diff < 1) {
                // console.log("friction")
                // Easier way
                // this.vel.mult(0.95)

                // Direction of Friction
                const friction = this.vel.copy()
                friction.normalize()
                friction.mult(-1)

                // Magnitude of Friction
                const normal = this.mass
                friction.setMag(mu * normal)

                this.applyForce(friction)
            }
        }

        applyForce(force: p5.Vector) {
            const f = force.div(this.mass)
            this.acc = this.acc.add(f)
        }

        edges() {
            const { s } = this
            if (this.pos.y <= 0 + this.r) {
                this.pos.y = 0 + this.r
                this.vel.y *= -1
            }
            if (this.pos.y >= s.height - this.r) {
                this.pos.y = s.height - this.r
                this.vel.y *= -1
            }
            if (this.pos.x <= 0 + this.r) {
                this.pos.x = 0 + this.r
                this.vel.x *= -1
            }
            if (this.pos.x >= s.width - this.r) {
                this.pos.x = s.width - this.r
                this.vel.x *= -1
            }
        }

        update() {
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.set(0, 0)
        }

        show() {
            s.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
        }
    }

    const movers: Mover[] = []
    const mu = 0.1

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(0)

        for (let i = 0; i < 10; i++) {
            movers[i] = new Mover(s.random(s.width), s.random(100), s.random(0.5, 5), s)
        }
    }

    s.draw = () => {
        s.stroke(255, 100)
        s.strokeWeight(2)
        s.fill(255, 255, 255, 100)
        s.background(0)

        const wind = s.createVector(0.2, 0)

        for (const mover of movers) {
            if (s.mouseIsPressed) {
                mover.applyForce(wind)
            }

            const gravity = s.createVector(0, 1)
            const weight = gravity.mult(mover.mass)
            mover.applyForce(weight)
            mover.friction()

            mover.update()
            mover.edges()
            mover.show()
        }
    }
}
lecture2_3.title = 'Force - Friction'

export const lecture2_4 = (s: p5): void => {
    class Mover {
        s: p5
        pos: p5.Vector
        vel: p5.Vector
        acc: p5.Vector
        r: number
        mass: number

        constructor(x: number, y: number, mass: number, s: p5) {
            this.s = s
            this.pos = s.createVector(x, y)
            this.vel = s.createVector(0, 0)
            this.acc = s.createVector(0, 0)
            this.r = Math.sqrt(mass) * 10
            this.mass = mass
        }

        drag(c: number) {
            // Direction of Drag
            const drag = this.vel.copy()
            drag.normalize()
            drag.mult(-1)

            const speedSq = this.vel.magSq()
            drag.setMag(c * speedSq)

            this.applyForce(drag)
        }

        applyForce(force: p5.Vector) {
            const f = force.div(this.mass)
            this.acc.add(f)
        }

        edges() {
            const { s } = this
            if (this.pos.y <= 0 + this.r) {
                this.pos.y = 0 + this.r
                this.vel.y *= -1
            }
            if (this.pos.y >= s.height - this.r) {
                this.pos.y = s.height - this.r
                this.vel.y *= -1
            }
            if (this.pos.x <= 0 + this.r) {
                this.pos.x = 0 + this.r
                this.vel.x *= -1
            }
            if (this.pos.x >= s.width - this.r) {
                this.pos.x = s.width - this.r
                this.vel.x *= -1
            }
        }

        update() {
            this.vel.add(this.acc)
            this.pos.add(this.vel)
            this.acc.set(0, 0)
        }

        show() {
            s.strokeWeight(2)
            s.fill(255, 255, 255, 100)
            s.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
        }
    }

    const movers: Mover[] = []
    const dragC = 0.1

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(0)

        for (let i = 0; i < 10; i++) {
            movers[i] = new Mover(s.random(s.width), s.random(100), s.random(1, 5), s)
        }
    }

    s.draw = () => {
        s.background(0)

        s.fill(255, 75)
        s.noStroke()
        s.rect(0, s.height / 2, s.width, s.height / 2)
        s.stroke(255, 100)

        const wind = s.createVector(0.2, 0)

        for (const mover of movers) {
            if (s.mouseIsPressed) {
                mover.applyForce(wind)
            }

            const gravity = s.createVector(0, 1)
            const weight = gravity.mult(mover.mass)
            mover.applyForce(weight)

            if (mover.pos.y > s.height / 2) {
                mover.drag(dragC)
            }

            mover.update()
            mover.edges()
            mover.show()
        }
    }
}
lecture2_4.title = 'Force - Drag'
