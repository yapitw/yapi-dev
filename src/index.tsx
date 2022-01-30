import * as React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MenuList from './components/MenuList'
import Navigator from './components/Navigator'
import AppRoutes from './components/Routes'
import I18nProvider from './i18n/Provider'
import './style.scss'

const App: React.FC = () => {
    const [isMenuShow, setIsMenuShow] = React.useState(false)
    return (
        <BrowserRouter>
            <div className="app">
                <Navigator />
                <div className="app-body">
                    <div className="container">
                        <div id="top-anchor" />
                        <Routes>
                            <Route
                                path={'/exp/'}
                                element={
                                    <div
                                        className={['menu-list', isMenuShow && 'menu-list--active']
                                            .filter(Boolean)
                                            .join(' ')}
                                    >
                                        <div className="switch" onClick={() => setIsMenuShow(!isMenuShow)} />
                                        <div className="list-wrapper" onClick={() => setIsMenuShow(false)}>
                                            <MenuList />
                                        </div>
                                    </div>
                                }
                            ></Route>
                        </Routes>

                        <div className="content">
                            <AppRoutes />
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <I18nProvider>
        <App />
    </I18nProvider>,
    document.getElementById('root')
)
