import * as React from 'react'
import { Routes, NavLink, Route } from 'react-router-dom'
import labs from '../labs'
import sketches from '../natureOfCode'

const MenuList: React.FC = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path={'/exp/:id?'}>
                    {Object.keys(labs)
                        .reverse()
                        .map((key) => (
                            <NavLink to={'/exp/' + key} key={key}>
                                <span>{key.replace('Lab', 'Exp. ')}</span>
                                <br />
                                <span>{labs[key].title}</span>
                            </NavLink>
                        ))}
                </Route>
                <Route path={'/noc/:id?'}>
                    {Object.keys(sketches)
                        .reverse()
                        .map((sketch) => (
                            <NavLink to={'/noc/' + sketch} key={sketch}>
                                {sketch.replace('lecture', 'EP ').replace('_', '.')}
                                <br />
                                {sketches[sketch].title}
                            </NavLink>
                        ))}
                </Route>
            </Routes>
        </React.Fragment>
    )
}

export default MenuList
