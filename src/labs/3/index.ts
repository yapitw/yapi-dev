import * as THREE from 'three'
import { ThreeLab } from '../template'
import vertexShader from './shaderVertex.glsl?raw'
import fragmentShader from './shaderFragment.glsl?raw'

// const texture = new THREE.TextureLoader().load('dist/doodle.png')

type IUniforms = {
    u_time?: { type: 'f'; value: number }
    u_resolution?: { type: 'v2'; value: THREE.Vector2 }
    u_mouse?: { type: 'v2'; value: THREE.Vector2 }
    u_texture?: { type: 't'; value: THREE.Texture }
    u_picture?: { type: 't'; value: THREE.Texture }
}

export class Lab3 extends ThreeLab {
    static title = 'Reaction Diffusion'
    static tags = 'glsl reaction-diffusion three.js'
    static description = ''

    uniforms: IUniforms = {}
    textBuffer1 = new THREE.WebGLRenderTarget(0, 0)
    textBuffer2 = new THREE.WebGLRenderTarget(0, 0)
    switchTag: boolean

    constructor(container: HTMLDivElement) {
        super(container)
        this.pixelRatio = 1
        this.renderSize = 512
        this.switchTag = false

        this.init()
        this.animation()
    }

    init = (): void => {
        const { scene, camera, renderer, pixelRatio, renderSize } = this

        renderer.setSize(renderSize, renderSize, false)
        renderer.setPixelRatio(pixelRatio)

        camera.position.set(1, 1, 1)
        camera.lookAt(0, 0, 0)

        this.canvas = this.container.querySelector('canvas')
        if (!this.canvas) return
        this.canvas.style.filter = 'saturate(0) brightness(1.2) contrast(2) invert(1)'
        const geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.uniforms = {
            u_time: { type: 'f', value: 0 },
            u_resolution: { type: 'v2', value: new THREE.Vector2() },
            u_mouse: { type: 'v2', value: new THREE.Vector2() },
            u_texture: { type: 't', value: new THREE.Texture() },
            // u_picture: { type: 't', value: texture },
        }

        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        const targetOptions = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            // type: THREE.FloatType,
            type: THREE.HalfFloatType, // for ios compatibility
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
        }
        this.textBuffer1 = new THREE.WebGLRenderTarget(renderSize * pixelRatio, renderSize * pixelRatio, targetOptions)
        this.textBuffer2 = new THREE.WebGLRenderTarget(renderSize * pixelRatio, renderSize * pixelRatio, targetOptions)
        if (this.uniforms.u_resolution) {
            this.uniforms.u_resolution.value.x = renderSize * pixelRatio
            this.uniforms.u_resolution.value.y = renderSize * pixelRatio
        }

        document.onmousemove = (e) => {
            const x = e.pageX - this.container.offsetLeft
            const y = e.pageY - this.container.offsetTop
            if (this.uniforms.u_mouse) {
                this.uniforms.u_mouse.value.x = x
                this.uniforms.u_mouse.value.y = y
            }
        }
    }

    animation = (): void => {
        if (!this.playing) return
        const { scene, camera, renderer } = this
        if (this.uniforms.u_texture) {
            for (let i = 0; i < 24; i++) {
                this.uniforms.u_texture.value = this[this.switchTag ? 'textBuffer1' : 'textBuffer2'].texture
                renderer.setRenderTarget(this[this.switchTag ? 'textBuffer2' : 'textBuffer1'])
                renderer.render(scene, camera)
                this.uniforms.u_texture.value = this[this.switchTag ? 'textBuffer2' : 'textBuffer1'].texture
                this.switchTag = !this.switchTag
                if (this.uniforms.u_time) this.uniforms.u_time.value += 1
            }
        }

        renderer.setRenderTarget(null)
        renderer.render(scene, camera)
        if (!this.terminated) requestAnimationFrame(this.animation)
    }
}
