import * as THREE from 'three'
import { ThreeLab } from '../template'
import vertexShader from './shaderVertex.glsl?raw'
import fragmentShader from './shaderFragment.glsl?raw'

type IUniforms = {
    u_time?: { type: 'f'; value: number }
    u_resolution?: { type: 'v2'; value: THREE.Vector2 }
    u_mouse?: { type: 'v2'; value: THREE.Vector2 }
    u_texture?: { type: 't'; value: THREE.Texture }
    u_picture?: { type: 't'; value: THREE.Texture }
}

export class Lab2 extends ThreeLab {
    static title = 'GLSL Basic'
    static tags = 'glsl three.js'
    static description = 'Calculation on previous screen'

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

        const geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.uniforms = {
            u_time: { type: 'f', value: 1.0 },
            u_resolution: {
                type: 'v2',
                value: new THREE.Vector2(renderSize * pixelRatio, renderSize * pixelRatio),
            },
            u_mouse: { type: 'v2', value: new THREE.Vector2() },
            u_texture: { type: 't', value: new THREE.Texture() },
            u_picture: { type: 't', value: new THREE.Texture() },
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
    }
    animation = (): void => {
        if (!this.playing) return
        const { scene, camera, renderer } = this
        if (this.uniforms.u_texture) {
            for (let i = 0; i < 8; i++) {
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
