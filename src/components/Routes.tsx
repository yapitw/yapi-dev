import * as React from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

import About from './About'
import NatureOfCode from './NatureOfCode'
import WebWorks from './WebWorks'
import ArtWorks from './ArtWorks'
import Experiments from './Experiments'

const Routes = () => {
    const history = useHistory()
    const {
        location: { pathname },
    } = history

    React.useEffect(() => {
        document.getElementById('top-anchor')?.scrollIntoView()
    }, [pathname])
    return (
        <Switch>
            <Route path="/about" component={About} />
            <Route path="/web" component={WebWorks} />
            <Route path="/art" component={ArtWorks} />
            <Route path="/exp/:id" component={Experiments} />
            <Route path={'/noc/:lecture'} component={NatureOfCode} />

            <Route path={'/exp/'}>
                <Redirect to="/exp/Lab12" />
            </Route>

            <Route path={'/noc/'}>
                <Redirect to="/noc/lecture1_7" />
            </Route>

            <Route path={'/'}>
                <Redirect to="/about" />
            </Route>
        </Switch>
    )
}

export default Routes
