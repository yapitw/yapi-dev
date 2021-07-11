import * as React from 'react'
import { useIntl } from 'react-intl'
import './about.scss'
import { careerData, skillsData } from '../i18n/aboutData'

const About: React.FC = () => {
    const intl = useIntl()
    const formatMessage = intl.formatMessage

    const skillSet = JSON.parse(formatMessage({ id: 'skillSet' })) as typeof skillsData
    const careerSet = JSON.parse(formatMessage({ id: 'careerData' })) as typeof careerData

    const skills = (
        <>
            <h1 className="first-title">{formatMessage({ id: 'toolsIUse' })}</h1>
            <div style={{ columnCount: 2, columnGap: '2rem' }}>
                {skillSet.map((skill, index) => (
                    <section key={index}>
                        <h3 className="subtitle">{skill.title}</h3>
                        <p>{skill.content}</p>
                    </section>
                ))}
            </div>
        </>
    )

    return (
        <div className="about two-column">
            <section className="primary">
                <h1>Pattison Ho</h1>
                <h3>何俊憙 (Ho Chun Hsi)</h3>
                <h3>{formatMessage({ id: 'header.description' })}</h3>
                <p className="print-remarks">
                    This document is printed from <a href={location.origin}>{location.origin}</a>, see more my works
                    here.
                </p>

                <h3 className="subtitle" style={{ marginTop: '1rem' }}>
                    {formatMessage({ id: 'language' })}
                    {': '}
                </h3>
                <ul>
                    <li>{formatMessage({ id: 'language.zh' })}</li>
                    <li>{formatMessage({ id: 'language.en' })}</li>
                </ul>

                <h3 className="subtitle">{formatMessage({ id: 'contacts' })}</h3>
                <ul>
                    <li>
                        E-mail:{' '}
                        <a href="mailto:yapi.tw@gmail.com" target="_blank" rel="noreferrer">
                            yapi.tw@gmail.com
                        </a>
                    </li>
                    <li>
                        GitHub:{' '}
                        <a href="https://github.com/yapitw/" target="_blank" rel="noreferrer">
                            https://github.com/yapitw/
                        </a>
                    </li>
                    <li>
                        CodePen:{' '}
                        <a href="https://codepen.io/yapi/" target="_blank" rel="noreferrer">
                            https://codepen.io/yapi/
                        </a>
                    </li>
                </ul>
            </section>

            <section className="primary">
                <h1 className="first-title">{formatMessage({ id: 'coreSkills' })}</h1>
                <h3 className="subtitle">{formatMessage({ id: 'coreSkills.frontend' })}</h3>
                <ul>
                    {new Array(7).fill('').map((_, index) => {
                        return <li key={index}>{formatMessage({ id: `coreSkills.frontend.${index + 1}` })}</li>
                    })}
                </ul>
                <h3 className="subtitle">{formatMessage({ id: 'coreSkills.computerGraphics' })}</h3>
                <ul>
                    {new Array(1).fill('').map((_, index) => {
                        return <li key={index}>{formatMessage({ id: `coreSkills.computerGraphics.${index + 1}` })}</li>
                    })}
                </ul>
            </section>

            <section className="no-print">{skills}</section>

            <section className="primary">
                <h1>{formatMessage({ id: 'careerSummary' })}</h1>
                {careerSet.map((role, index) => (
                    <section key={index}>
                        <h3 className="subtitle">
                            {role.title} - {role.period}
                        </h3>
                        <ul>
                            {role.contents.map((content, index) => (
                                <li key={index}>{content}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </section>
            <section className="primary">
                <h1 className="first-title" id="education">
                    {formatMessage({ id: 'education' })}
                </h1>
                <h3 className="subtitle">{formatMessage({ id: 'selfLearning' })}</h3>
                <p>{formatMessage({ id: 'selfLearning.description' })}</p>
                <h3 className="subtitle">{formatMessage({ id: 'education.1' })}</h3>
                <p>{formatMessage({ id: 'education.1.description' })}</p>
                <h3 className="subtitle">{formatMessage({ id: 'education.2' })}</h3>
                <p>{formatMessage({ id: 'education.2.description' })}</p>
            </section>

            <section className="only-print">{skills}</section>
        </div>
    )
}

export default About
