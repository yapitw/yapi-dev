import * as React from 'react'
import p5 from 'p5'
import { RouteComponentProps } from 'react-router'
import sketches from '../natureOfCode'
import { NavLink } from 'react-router-dom'
import { CANVAS_SIZE } from '../natureOfCode/configs'

const Lecture: React.FC<RouteComponentProps<{ lecture: string }>> = (props) => {
    const lecture = props.match.params.lecture
    const canvasElem = React.useRef<HTMLDivElement>(null)

    const [title, setTitle] = React.useState('')

    const list = Object.keys(sketches)
    const currentIndex = list.findIndex((key) => key === lecture)

    React.useEffect(() => {
        if (canvasElem.current) {
            const sketch = sketches[lecture]
            const processing = new p5(sketch, canvasElem.current)
            setTitle(sketch.title)
            return () => processing.remove()
        }
    }, [lecture, canvasElem])

    return (
        <div className="text">
            <h1>The Nature of Code</h1>
            <p>{title}</p>
            <div className="canvas-wrapper" style={{ width: CANVAS_SIZE }}>
                <div ref={canvasElem} key={lecture}></div>
            </div>
            <p>
                <span>Practice according to </span>
                <a
                    href="https://www.youtube.com/playlist?list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM"
                    target="_blank"
                    rel="noreferrer"
                >
                    The Nature of Code 2
                </a>
            </p>
            <p>
                <span>Source code: </span>
                <a
                    target="_blank"
                    href="https://github.com/yapitw/yapi-graphics/tree/master/src/natureOfCode"
                    rel="noreferrer"
                >
                    GitHub
                </a>
            </p>

            <div className="inner-nav">
                {currentIndex > 0 ? (
                    <NavLink to={list[currentIndex - 1]}>
                        <h4>PREV</h4>
                    </NavLink>
                ) : (
                    <div />
                )}
                {currentIndex < list.length - 1 && (
                    <NavLink to={list[currentIndex + 1]}>
                        <h4>NEXT</h4>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default Lecture
