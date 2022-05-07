import React from 'react'
import labs from '../labs'
import { NavLink, useParams } from 'react-router-dom'
import ThreeContainer from './ThreeContainer'
import './experiments.scss'
import { CANVAS_SIZE } from '../config'

const Experiments: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const list = Object.keys(labs)

    const currentIndex = list.findIndex((key) => key === id)

    if (id) {
        return (
            <>
                <ThreeContainer id={id} />

                <div className="inner-nav" style={{ maxWidth: CANVAS_SIZE }}>
                    {currentIndex > 0 ? (
                        <NavLink to={'/exp/' + list[currentIndex - 1]}>
                            <h4>PREV</h4>
                        </NavLink>
                    ) : (
                        <div />
                    )}
                    {currentIndex < list.length - 1 && (
                        <NavLink to={'/exp/' + list[currentIndex + 1]}>
                            <h4>NEXT</h4>
                        </NavLink>
                    )}
                </div>
            </>
        )
    }

    return null
}

export default Experiments
