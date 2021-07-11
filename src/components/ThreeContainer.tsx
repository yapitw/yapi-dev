import * as React from 'react'
import labs from '../labs'
import { ThreeLab } from '../labs/template'

const ThreeContainer: React.FC<{ id: string }> = (props) => {
    const { id } = props

    const containerElem = React.useRef<HTMLDivElement>(null)

    const lab = React.useRef<ThreeLab | undefined>()

    React.useEffect(() => {
        if (id === undefined || !containerElem.current) return () => undefined
        const newLab = new labs[id](containerElem.current)
        lab.current = newLab
        return () => {
            newLab.terminated = true
            newLab.destroy && newLab.destroy()
        }
    }, [id])

    const { title, description, tags } = labs[id] || {}

    if (!id) {
        return null
    }
    return (
        <React.Fragment>
            <div className="text">
                <h1>{title}</h1>
                {tags && (
                    <p>
                        {tags.split(' ').map((tag: string, index: number) => (
                            <span key={index}>#{tag} </span>
                        ))}
                    </p>
                )}
            </div>
            <div className="canvas-wrapper">
                <div key={id} ref={containerElem} />
            </div>
            {description && (
                <p
                    dangerouslySetInnerHTML={{
                        __html: description.replace(/\n/g, '</br>'),
                    }}
                ></p>
            )}
            <p>
                <span>Source code: </span>
                <a target="_blank" href="https://github.com/yapitw/yapi-graphics/tree/master/src/labs" rel="noreferrer">
                    GitHub
                </a>
            </p>
        </React.Fragment>
    )
}

export default ThreeContainer
