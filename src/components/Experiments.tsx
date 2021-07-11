import * as React from 'react'
import * as labs from '../labs'
import { NavLink, RouteChildrenProps, useParams } from 'react-router-dom'
import ThreeContainer from './ThreeContainer'
import './experiments.scss'

const Experiments: React.FC<RouteChildrenProps<{ id: string }>> = () => {
    const { id } = useParams<{ id: string }>()
    const list = Object.keys(labs)

    const currentIndex = list.findIndex((key) => key === id)

    if (id) {
        return (
            <>
                <ThreeContainer id={id} />

                <div className="inner-nav" style={{ maxWidth: 500 }}>
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
            </>
        )
    }

    return null
}

export default Experiments
