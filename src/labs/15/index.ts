export class Lab15 {
    static title = 'Vortex'
    static tags = 'p5.js generativeDesign'
    static description = 'Generative Vortex Flow Graphics'
    url = 'https://yapi-generative-vortex.vercel.app'
    time = 0

    container: HTMLElement
    iframe: HTMLIFrameElement

    nextFrame = () => {
        this.time++
        console.log(this.time)
        this.iframe.src = `${this.url}?time=${this.time}`
    }

    constructor(element: HTMLElement) {
        this.container = element
        this.iframe = document.createElement('iframe')
        this.iframe.src = `${this.url}?time=${this.time}`
        this.iframe.width = '100%'
        this.iframe.height = '100%'
        this.iframe.style.position = 'absolute'
        this.iframe.style.top = '0'
        this.iframe.style.left = '0'
        this.iframe.style.border = 'none'
        this.iframe.style.pointerEvents = 'none'
        this.container.style.cursor = 'pointer'
        this.container.addEventListener('click', this.nextFrame)

        element.append(this.iframe)
    }

    destroy = (): void => {
        this.container.removeEventListener('click', this.nextFrame)
        this.iframe.remove()
    }
}
