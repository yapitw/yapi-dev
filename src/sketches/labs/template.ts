import * as THREE from 'three'
import { CANVAS_SIZE } from '../config'

type IUniforms = {
    u_time?: { type: 'f'; value: number }
    u_resolution?: { type: 'v2'; value: THREE.Vector2 }
    u_mouse?: { type: 'v2'; value: THREE.Vector2 }
    u_texture?: { type: 't'; value: THREE.Texture }
}

export class ThreeLab {
    container: HTMLDivElement
    camera: THREE.OrthographicCamera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    canvas: HTMLCanvasElement | null = null
    pixelRatio = 1
    renderSize = CANVAS_SIZE
    uniforms: IUniforms = {}
    terminated = false
    playing = true
    animation: () => void = () => undefined

    constructor(container: HTMLDivElement) {
        this.container = container
        this.scene = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera(-2, 2, -2, 2)
        this.renderer = new THREE.WebGLRenderer({ alpha: true })
        this.container.appendChild(this.renderer.domElement)
    }

    pause = (): void => {
        if (!this.playing) return
        this.playing = false
    }
    resume = (): void => {
        if (this.playing) return
        this.playing = true
        this.animation()
    }
}

export class P5Lab {
    playing = true
    update: () => void = () => undefined

    pause = (): void => {
        if (this.playing) {
            this.playing = false
        }
    }

    resume = (): void => {
        if (!this.playing) {
            this.playing = true
            this.update()
        }
    }
}
