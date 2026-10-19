import type p5 from 'p5'
import { lecture0_3, lecture0_4, lecture0_5, lecture0_6, lecture0_7 } from './lecture0'
import { lecture1_1, lecture1_2, lecture1_3, lecture1_5, lecture1_6, lecture1_7 } from './lecture1'
import { lecture2_1, lecture2_2, lecture2_3, lecture2_4 } from './lecture2'

// Named imports rather than `import * as`: namespace imports make the bundler put a shared
// helper in this chunk, which then drags p5 into the server render.
const sketches: Record<string, (s: p5) => void> = {
    lecture0_3,
    lecture0_4,
    lecture0_5,
    lecture0_6,
    lecture0_7,
    lecture1_1,
    lecture1_2,
    lecture1_3,
    lecture1_5,
    lecture1_6,
    lecture1_7,
    lecture2_1,
    lecture2_2,
    lecture2_3,
    lecture2_4,
}

export default sketches
