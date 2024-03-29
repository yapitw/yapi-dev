import * as React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import About from './About'
import NatureOfCode from './NatureOfCode'
import WebWorks from './WebWorks'
import ArtWorks from './ArtWorks'
import Experiments from './Experiments'
import Home from './Home'

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/web" element={<WebWorks />} />
            <Route path="/art" element={<ArtWorks />} />
            <Route path="/exp/:id" element={<Experiments />} />
            <Route path={'/noc/:lecture'} element={<NatureOfCode />} />

            <Route path={'/'} element={<Navigate to="/exp/Lab15" />} />
            <Route path={'/exp/'} element={<Navigate to="/exp/Lab15" />} />
            <Route path={'/noc/'} element={<Navigate to="/noc/lecture1_7" />} />
        </Routes>
    )
}

export default AppRoutes
