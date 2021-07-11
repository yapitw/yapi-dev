export type ILab = { constructors: (HTMLElement: HTMLElement) => void } & {
    title?: string
    description?: string
    tags?: string
}

// export { Lab0 } from './0'
// export { Lab1 } from './1'
// export { Lab2 } from './2'
import { Lab3 } from './3'
import { Lab4 } from './4'
import { Lab5 } from './5'
import { Lab6 } from './6'
import { Lab7 } from './7'
import { Lab8 } from './8'
import { Lab9 } from './9'
import { Lab10 } from './10'
import { Lab11 } from './11'
import { Lab12 } from './12'

const libs: { [key: string]: any } = {
    Lab3,
    Lab4,
    Lab5,
    Lab6,
    Lab7,
    Lab8,
    Lab9,
    Lab10,
    Lab11,
    Lab12,
}

export default libs
