import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import labs from '../labs'
import sketches from '../natureOfCode'
import { classNames } from '../utils/classNames'

const MenuList: React.FC = () => {
    const [isMenuShow, setIsMenuShow] = React.useState(false)
    const MenuWrapper: React.FC = ({ children }) => {
        return (
            <div className={classNames(['menu-list', isMenuShow && 'menu-list--active'])}>
                <div className="switch" onClick={() => setIsMenuShow(!isMenuShow)} />
                <div className="list-wrapper" onClick={() => setIsMenuShow(false)}>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <Routes>
            <Route
                path="/exp/*"
                element={
                    <MenuWrapper>
                        {Object.keys(labs)
                            .reverse()
                            .map((key) => (
                                <NavLink to={key} key={key}>
                                    <span>{key.replace('Lab', 'Exp. ')}</span>
                                    <br />
                                    <span>{labs[key].title}</span>
                                </NavLink>
                            ))}
                    </MenuWrapper>
                }
            />

            <Route
                path={'/noc/*'}
                element={
                    <MenuWrapper>
                        {Object.keys(sketches)
                            .reverse()
                            .map((sketch) => (
                                <NavLink to={'/noc/' + sketch} key={sketch}>
                                    {sketch.replace('lecture', 'EP ').replace('_', '.')}
                                    <br />
                                    {sketches[sketch].title}
                                </NavLink>
                            ))}
                    </MenuWrapper>
                }
            />
        </Routes>
    )
}

export default MenuList
