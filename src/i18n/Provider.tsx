import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'
import allMessages, { Languages } from './messages'
import queryString from 'query-string'

const defaultLocale: Languages = 'en'

const I18nProvider: React.FC = (props) => {
    const { children } = props

    const query = queryString.parse(location.search)
    const paramLang = query.lang as Languages

    const [locale, setLocale] = useState<Languages>(paramLang ?? 'en')

    const messages = {
        ...allMessages[defaultLocale],
        ...allMessages[locale],
    }
    return (
        <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
            {children}
        </IntlProvider>
    )
}

export default I18nProvider
