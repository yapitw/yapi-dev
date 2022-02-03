import * as React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import MenuList from './components/MenuList'
import Navigator from './components/Navigator'
import AppRoutes from './components/Routes'
import I18nProvider from './i18n/Provider'
import './style.scss'

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="app">
                <Navigator />
                <div className="app-body">
                    <div className="container">
                        <div id="top-anchor" />
                        <MenuList />

                        <div className="content">
                            <AppRoutes />
                        </div>
                    </div>
                </div>
            </div>
        </HashRouter>
    )
}

ReactDOM.render(
    <I18nProvider>
        <App />
    </I18nProvider>,
    document.getElementById('root')
)
