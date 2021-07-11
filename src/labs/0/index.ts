import * as THREE from 'three'
import { ThreeLab } from '../template'
import vertexShader from './shaderVertex.glsl?raw'
import fragmentShader from './shaderFragment.glsl?raw'

export class Lab0 extends ThreeLab {
    static title = 'GLSL Texture'
    static tags = 'glsl three.js'
    static description = ''

    constructor(container: HTMLDivElement) {
        super(container)
        this.init()
        this.animation()
    }
    init = () => {
        this.pixelRatio = 1
        this.renderSize = 512
        const { scene, camera, renderer, pixelRatio, renderSize } = this
        renderer.setSize(renderSize, renderSize, false)
        renderer.setPixelRatio(pixelRatio)
        this.container.appendChild(renderer.domElement)

        camera.position.set(1, 1, 1)
        camera.lookAt(0, 0, 0)
        this.canvas = this.container.querySelector('canvas')

        const geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.uniforms = {
            u_time: { type: 'f', value: 1.0 },
            u_resolution: {
                type: 'v2',
                value: new THREE.Vector2(pixelRatio * renderSize, pixelRatio * renderSize),
            },
            u_mouse: { type: 'v2', value: new THREE.Vector2() },
        }

        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader,
            fragmentShader,
        })

        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
    }
    animation = () => {
        if (!this.playing) return
        const { scene, camera, renderer } = this
        if (this.uniforms.u_time) this.uniforms.u_time.value += 1
        renderer.render(scene, camera)
        if (!this.terminated) requestAnimationFrame(this.animation)
    }
}
