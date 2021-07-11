export class Lab13 {
    static title = 'Galaxy'
    static tags = 'three.js'
    static description = 'Practice of three.js particle'

    container: HTMLElement
    iframe: HTMLIFrameElement

    constructor(element: HTMLElement) {
        this.container = element
        this.iframe = document.createElement('iframe')
        this.iframe.src = 'https://yapi-learn-threejs.vercel.app/27AnimatedGalaxy/index.html'
        this.iframe.width ='100%'
        this.iframe.height ='100%'
        this.iframe.style.position = 'absolute'
        this.iframe.style.top = '0'
        this.iframe.style.left = '0'
        this.iframe.style.border = 'none'
        
        element.append(this.iframe)
    }

    destroy = (): void => {
        this.iframe.remove()
    }
}
