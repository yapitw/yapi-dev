import * as THREE from 'three'
import { ThreeLab } from '../template'
import vertexShader from './shaderVertex.glsl?raw'
import fragmentShader from './shaderFragment.glsl?raw'

const texture = new THREE.TextureLoader().load('dist/doodle.png')

type IUniforms = {
    u_time?: { type: 'f'; value: number }
    u_resolution?: { type: 'v2'; value: THREE.Vector2 }
    u_mouse?: { type: 'v2'; value: THREE.Vector2 }
    u_texture?: { type: 't'; value: THREE.Texture }
    u_picture?: { type: 't'; value: THREE.Texture }
    u_mousedown?: { type: 'bool'; value: boolean }
}

export class Lab4 extends ThreeLab {
    static title = 'Reaction Diffusion'
    static tags = 'glsl reaction-diffusion three.js'
    static description = `Further step to make the pattern more usable for design:
     To add a hidden image layer and use it's color data as the reaction factor 
     to make the growth area limited in some particular shapes.`

    uniforms: IUniforms = {}
    textBuffer1 = new THREE.WebGLRenderTarget(0, 0)
    textBuffer2 = new THREE.WebGLRenderTarget(0, 0)
    switchTag = false

    constructor(container: HTMLDivElement) {
        super(container)
        this.init()
        this.animation()
    }

    init = (): void => {
        this.pixelRatio = 1
        this.renderSize = 512
        this.switchTag = false

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
            u_picture: { type: 't', value: texture },
            u_mousedown: { type: 'bool', value: false },
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

        const text = document.createElement('div')
        text.innerText = 'TOUCH'
        text.style.width = window.getComputedStyle(this.canvas).width
        text.style.position = 'absolute'
        text.style.left = '0'
        text.style.top = '50%'
        text.style.transform = 'translateY(-50%)'
        text.style.textAlign = 'center'
        text.style.textShadow = '0 0 15px rgba(255,255,255, 0.3)'
        text.style.pointerEvents = 'none'
        this.container.style.position = 'relative'
        this.container.appendChild(text)

        const moveHandler = (e: any) => {
            e.preventDefault()
            if (!this.canvas || !this.uniforms.u_mouse) return
            const boundingRect = this.container.getBoundingClientRect()
            const x = (e.pageX - boundingRect.left) / this.canvas?.clientWidth
            const y = 1 - (e.pageY - boundingRect.top) / this.canvas?.clientHeight
            this.uniforms.u_mouse.value.x = x
            this.uniforms.u_mouse.value.y = y
        }

        const startHandler = (e: any) => {
            e.preventDefault()
            moveHandler(e)
            if (!this.uniforms.u_mousedown) return
            this.uniforms.u_mousedown.value = true
            this.canvas?.addEventListener(input.move, moveHandler)
            this.canvas?.addEventListener(input.end, endHandler)
        }

        const endHandler = (e: Event) => {
            e.preventDefault()
            if (!this.uniforms.u_mousedown) return
            this.uniforms.u_mousedown.value = false
            this.canvas?.removeEventListener(input.move, moveHandler)
            this.canvas?.removeEventListener(input.end, endHandler)
        }

        const input: {
            start: 'touchstart' | 'pointerdown' | 'mousedown'
            move: 'touchmove' | 'pointermove' | 'mousemove'
            end: 'touchend' | 'pointerup' | 'mouseup'
        } = {
            start: 'pointerdown',
            move: 'pointermove',
            end: 'pointerup',
        }

        const inputDetection = (e: Event) => {
            e.preventDefault()
            if (e.type == 'touchstart') {
                input.start = 'touchstart'
                input.move = 'touchmove'
                input.end = 'touchend'
                // text.innerText = 'TOUCHING'
            } else if (e.type == 'pointerdown') {
                input.start = 'pointerdown'
                input.move = 'pointermove'
                input.end = 'pointerup'
                // text.innerText = 'POINTING'
            } else {
                input.start = 'mousedown'
                input.move = 'mousemove'
                input.end = 'mouseup'
                // text.innerText = 'MOUSEMOVING'
            }

            text.remove()
            this.canvas?.removeEventListener('touchstart', inputDetection)
            this.canvas?.removeEventListener('pointerdown', inputDetection)
            this.canvas?.removeEventListener('mousedown', inputDetection)

            moveHandler(e)
            if (this.uniforms.u_mousedown) {
                this.uniforms.u_mousedown.value = true
            }
            this.canvas?.addEventListener(input.move, moveHandler)
            this.canvas?.addEventListener(input.start, startHandler)
        }

        this.canvas.addEventListener('touchstart', inputDetection)
        this.canvas.addEventListener('pointerdown', inputDetection)
        this.canvas.addEventListener('mousedown', inputDetection)

        // Prevent mobile browser gesture
        this.canvas.addEventListener('touchstart', (e) => e.preventDefault())
        this.canvas.addEventListener('touchmove', (e) => e.preventDefault())
    }

    animation = () => {
        if (!this.playing) return
        const { scene, camera, renderer } = this
        for (let i = 0; i < 4; i++) {
            const textBuffer = this.switchTag ? 'textBuffer1' : 'textBuffer2'
            renderer.setRenderTarget(this[textBuffer])
            renderer.render(scene, camera)
            if (this.uniforms.u_texture) this.uniforms.u_texture.value = this[textBuffer].texture
            this.switchTag = !this.switchTag
            if (this.uniforms.u_time) this.uniforms.u_time.value += 1
        }
        renderer.setRenderTarget(null)
        renderer.render(scene, camera)
        if (!this.terminated) requestAnimationFrame(this.animation)
    }
}
