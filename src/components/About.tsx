import * as React from 'react'
import './about.scss'
import { careerData, skillsData } from './aboutData'

const About: React.FC = () => {
    const skills = (
        <>
            <h1 className="first-title">Tools I use</h1>
            <div style={{ columnCount: 2, columnGap: '2rem' }}>
                {skillsData.map((skill, index) => (
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
                <h3>Front-end developer with design background and visualization techniques.</h3>
                <p className="print-remarks">
                    This document is printed from <a href={location.origin}>{location.origin}</a>, see more my works
                    here.
                </p>

                <h3 className="subtitle" style={{ marginTop: '1rem' }}>
                    Language:{' '}
                </h3>
                <ul>
                    <li>Chinese: Native speaker</li>
                    <li>English: Communication level</li>
                </ul>

                <h3 className="subtitle">Contacts</h3>
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
                <h1 className="first-title">Core skills</h1>
                <h3 className="subtitle">Front-end Development</h3>
                <ul>
                    <li>Build front-end projects from scratch.</li>
                    <li>Integration of web APIs and services including AWS, FB SDK and GCP ...etc.</li>
                    <li>Good communication with designer and product manager.</li>
                    <li>Advanced CSS styles implementation.</li>
                    <li>Progressive graphics coding.</li>
                    <li>3D Computer graphics fundamental.</li>
                    <li>Back-end development (Node.js).</li>
                </ul>
                <h3 className="subtitle">Computer Graphics</h3>
                <ul>
                    <li>3D progressive modeling, 3D sculpting.</li>
                </ul>
            </section>

            <section className="no-print">{skills}</section>

            <section className="primary">
                <h1>Career Summary</h1>
                {careerData.map((role, index) => (
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
                    Education
                </h1>
                <h3 className="subtitle">Self learning</h3>
                <p>
                    Learning front-end programming skills and 3D softwares from several online sources like Udemy,
                    Udacity, Codecademy, Hahow, Hiskio, Youtube ...ETC.
                </p>
                <h3 className="subtitle">Advanced Javascript front-end engineering course</h3>
                <p>Information System Training Program from National Taiwan University.</p>
                <h3 className="subtitle">Industrial Design Bachelor degree</h3>
                <p>National Taipei University of Technology.</p>
            </section>

            <section className="only-print">{skills}</section>
        </div>
    )
}

export default About
