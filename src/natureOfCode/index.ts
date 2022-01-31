import p5 from 'p5'
import * as lecture0 from './lecture0'
import * as lecture1 from './lecture1'
import * as lecture2 from './lecture2'

const sketches: {
    [key: string]: ((_s: p5) => void) & { title: string }
} = {
    ...lecture0,
    ...lecture1,
    ...lecture2,
}

export default sketches
