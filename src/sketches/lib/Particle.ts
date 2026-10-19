import { random } from './Math'

export class Vec2 {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    get u(): number {
        return this.x
    }
    get v(): number {
        return this.y
    }
    add = (vec: Vec2): void => {
        this.x += vec.x
        this.y += vec.y
    }
    deduct = (vec: Vec2): void => {
        this.x -= vec.x
        this.y -= vec.y
    }
    scale = (factor: number): void => {
        this.x *= factor
        this.y *= factor
    }
    normalize = (): void => {
        this.x /= this.magnitude()
        this.y /= this.magnitude()
    }
    magnitude = (): number => {
        const { pow } = Math
        const { x, y } = this
        return pow(pow(x, 2) + pow(y, 2), 0.5)
    }
}

interface IPartical {
    x: number
    y: number
}
export class Particle {
    position: Vec2
    speed: Vec2
    velocity: Vec2
    mass: number
    kill: boolean
    age: number
    constructor({ x, y }: IPartical) {
        this.age = 0
        this.kill = false
        this.position = new Vec2(x, y)
        this.speed = new Vec2(random(-1, 1), random(-1, 1))
        this.mass = random(1, 3)
        // this.speed = new Vec2(0, 0)
        this.speed.scale(5)
        this.velocity = new Vec2(0, 0)
    }

    update(): void {
        this.age++
        this.speed.scale(this.mass)
        this.speed.add(this.velocity)
        this.speed.scale(1 / this.mass)
        this.position.add(this.speed)
    }

    get x(): number {
        return this.position.x
    }
    get y(): number {
        return this.position.y
    }
}

interface ILimit {
    x_min: number
    x_max: number
    y_min: number
    y_max: number
}

export class ParticleSystem {
    animationRequestID = 0
    particles: Particle[] = []
    time = 0
    MAXIMUM = 0
    limit: ILimit = {
        x_min: 0,
        y_min: 0,
        x_max: 300,
        y_max: 300,
    }
    constructor({ limit }: { limit: ILimit }) {
        this.MAXIMUM = 50
        if (limit) this.limit = limit
        this.init()
    }

    init = (): void => {
        this.particles = []
        this.time = 0
    }

    update = (): void => {
        for (let i = 0; i < 10; i++) {
            if (this.particles.length < this.MAXIMUM) {
                const particle = new Particle({
                    x: random(0, 1) * this.limit.x_max,
                    y: random(0, 1) * this.limit.y_max,
                })
                this.particles.push(particle)
            }
        }

        this.particles.forEach((particle) => {
            if (
                particle.x > this.limit.x_max ||
                particle.x < this.limit.x_min ||
                particle.y > this.limit.y_max ||
                particle.y < this.limit.y_min
            ) {
                particle.kill = true
            }
            particle.update()
            this.draw(particle)
        })

        this.particles = this.particles.filter((particle) => !particle.kill)
    }

    draw: (_particle: Particle) => void = () => undefined
}
