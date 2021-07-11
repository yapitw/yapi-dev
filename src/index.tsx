import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import MenuList from './components/MenuList'
import Navigator from './components/Navigator'
import Routes from './components/Routes'
import './style.scss'

const App: React.FC = () => {
    const [isMenuShow, setIsMenuShow] = React.useState(false)

    return (
        <HashRouter hashType="noslash">
            <div className="app">
                <Navigator />
                <div className="app-body">
                    <div className="container">
                        <div id="top-anchor" />
                        <Route path={['/exp/', '/noc/']}>
                            <div className={['menu-list', isMenuShow && 'menu-list--active'].filter(Boolean).join(' ')}>
                                <div className="switch" onClick={() => setIsMenuShow(!isMenuShow)} />

                                <div className="list-wrapper" onClick={() => setIsMenuShow(false)}>
                                    <MenuList />
                                </div>
                            </div>
                        </Route>

                        <div className="content">
                            <Routes />
                        </div>
                    </div>
                </div>
            </div>
        </HashRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
