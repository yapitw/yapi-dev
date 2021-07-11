import p5 from 'p5'
import SimplexNoise from 'simplex-noise'
import { CANVAS_SIZE } from './configs'

export const lecture0_3 = (s: p5) => {
    let offset1 = 200
    let offset2 = 10000

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    }

    s.draw = () => {
        s.background(51)
        offset1 += 0.02
        offset2 += 0.02
        const x = s.map(s.noise(offset1), 0, 1, 0, CANVAS_SIZE)
        const y = s.map(s.noise(offset2), 0, 1, 0, CANVAS_SIZE)
        s.ellipse(x, y, 20, 20)
    }

    // sketch.noLoop()
}
lecture0_3.title = 'Perlin Noise'

export const lecture0_4 = (s: p5) => {
    let start = 0
    const increment = 0.01

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
    }

    s.draw = () => {
        s.background(51)
        s.noFill()
        s.stroke(255)
        s.beginShape()
        let xOff = start
        for (let x = 0; x < s.width; x++) {
            const sinResults = s.map(s.sin(xOff), -1, 1, 30, s.height - 30)
            const noiseResults = s.map(s.noise(xOff * 4), 0, 1, -30, 30)

            const y = sinResults + noiseResults
            xOff += increment
            s.vertex(x, y)
        }

        start += increment
        s.endShape()
    }

    // sketch.noLoop()
}
lecture0_4.title = 'Perlin Noise'

export const lecture0_5 = (s: p5) => {
    const inc = 0.01

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.pixelDensity(1)
        s.noiseDetail(8, 0.5)
    }

    s.draw = () => {
        let xoff = 0
        s.loadPixels()
        for (let x = 0; x < s.width; x++) {
            let yoff = 0
            for (let y = 0; y < s.height; y++) {
                const index = (x + y * s.width) * 4
                const r = s.noise(xoff, yoff) * 255
                s.pixels[index + 0] = r
                s.pixels[index + 1] = r
                s.pixels[index + 2] = r
                s.pixels[index + 3] = 255
                yoff += 0.01
            }
            xoff += 0.01
        }
        s.updatePixels()
    }
}
lecture0_5.title = '2D Perlin Noise'

export const lecture0_6 = (s: p5) => {
    // extend note:
    // worley noise
    // Étienne Jacob

    const simplex = new SimplexNoise()
    const increment = 0.01

    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.pixelDensity(1)
    }

    let time = 0
    s.draw = () => {
        s.loadPixels()
        let xoff = 0
        for (let x = 0; x < s.width; x++) {
            let yoff = 0
            for (let y = 0; y < s.height; y++) {
                const index = (x + y * s.width) * 4
                const r = simplex.noise3D(xoff, yoff, time)
                const bright = s.map(r, -1.5, 1, 0, 255)
                s.pixels[index + 0] = bright
                s.pixels[index + 1] = bright
                s.pixels[index + 2] = bright
                s.pixels[index + 3] = 255
                yoff += increment
            }
            xoff += increment
        }
        time += increment
        s.updatePixels()
    }
}
lecture0_6.title = 'Simplex Noise'

export const lecture0_7 = (s: p5) => {
    let x = 0
    let y = 0
    s.setup = () => {
        s.createCanvas(CANVAS_SIZE, CANVAS_SIZE)
        s.background(51)
        x = CANVAS_SIZE / 2
        y = CANVAS_SIZE / 2
    }

    s.draw = () => {
        s.stroke(255)
        s.strokeWeight(2)

        const r = Math.floor(s.random(4))

        switch (r) {
        case 0:
            x++
            break
        case 1:
            x--
            break
        case 2:
            y++
            break
        case 3:
            y--
            break
        }
        s.point(x, y)
    }
}
lecture0_7.title = 'Random Walker'
