import PerlinNoise from '../../libs/PerlinNoise'
import { P5Lab } from '../template'

const perlin = new PerlinNoise()

export class Lab5 extends P5Lab {
    static title = 'Noise Direction'
    static tags = 'perlin-noise canvas'
    static description = ''

    terminated = false
    app: HTMLDivElement
    cvs: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    height = 500
    width = 500
    gridSize = 25 // size of force saving
    xoff = 0
    yoff = 0
    zoff = 0

    constructor(container: HTMLDivElement) {
        super()
        this.app = container
        this.cvs = document.createElement('canvas')
        this.ctx = this.cvs.getContext('2d')
        this.init()
    }

    init = () => {
        this.cvs.width = this.width
        this.cvs.height = this.height
        ;(this.app ? this.app : document.body).appendChild(this.cvs)

        this.draw()
        this.update()
    }

    clear = () => {
        if (!this.ctx) return
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    draw = () => {
        if (!this.ctx) return
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    drawPerlin = () => {
        if (!this.ctx) return
        // this.ctx.beginPath()
        this.ctx.strokeStyle = '#000'

        for (let x = 0; x < this.width / this.gridSize; x++) {
            for (let y = 0; y < this.height / this.gridSize; y++) {
                const alpha = perlin.noise(x * 0.03, y * 0.03, this.xoff)

                // this.ctx.fillRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize)

                this.ctx.beginPath()
                // this.ctx.globalAlpha = 1
                this.ctx.translate(x * this.gridSize + this.gridSize / 2, y * this.gridSize + this.gridSize / 2)
                this.ctx.rotate(alpha * Math.PI * 8)
                this.ctx.moveTo(0, 0)
                this.ctx.lineTo(0, this.gridSize / 2)
                this.ctx.resetTransform()
                this.ctx.stroke()

                // this.ctx.globalAlpha = 1
                this.ctx.fillStyle = `rgb(${alpha * 255},${alpha * 255},${alpha * 255})`
                this.ctx.beginPath()
                this.ctx.arc((x + 0.5) * this.gridSize, (y + 0.5) * this.gridSize, this.gridSize / 6, 0, 2 * Math.PI)
                this.ctx.fill()
            }
        }
    }

    update = () => {
        if (!this.playing) return
        this.draw()
        this.drawPerlin()
        this.xoff += 0.005

        if (!this.terminated) window.requestAnimationFrame(this.update)
    }
}
