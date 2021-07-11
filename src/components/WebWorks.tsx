import * as React from 'react'
import './webWorks.scss'

import img_eid from '../images/work-eid.png'
import img_wordsring from '../images/work-wordsring.png'
import img_arcteryx from '../images/work-arcteryx.jpg'
import img_innolux from '../images/work-innolux.png'

const webWorkData: {
    title: string
    link: string
    sourceCode?: string
    image: string
    contents: string[]
}[] = [
    {
        title: 'Screening Eagle Inspect',
        link: 'http://web.screeningeagle.com',
        image: img_eid,
        contents: [
            'Development with react in TypeScript',
            'UI and API data integration for new features.',
            'Maintain web 3D Viewer.',
            'Refactor existing code base.',
        ],
    },
    {
        title: 'Words-ring simulation',
        link: 'http://yapitw.github.io/wordsring/build',
        sourceCode: 'https://github.com/yapitw/yapi-graphics',
        image: img_wordsring,
        contents: ['Entire page.', 'Use three.js webgl library simulating 3D ring with customized content.'],
    },
    {
        title: 'Arc\'teryx NODIN',
        link: 'http://www.starlike.com.tw/ARC/NODIN/',
        image: img_arcteryx,
        contents: ['HTML CSS Layout slicing according to design.', 'CSS Animation.', 'JQuery interaction.'],
    },
    {
        title: 'InnoLux recruitment',
        link: 'https://www.104.com.tw/cfdocs/project/1707/170707_innolux_hr/',
        image: img_innolux,
        contents: ['Main vision interaction.', 'HTML CSS Layout slicing according to design.'],
    },
]

const WebWorks = () => {
    return (
        <>
            <h1 className="first-title">Web Works</h1>
            <div className="web-works two-column">
                {webWorkData.map((work, index) => {
                    return (
                        <section className="primary" key={index}>
                            <a href={work.link} target="_blank" rel="noreferrer">
                                <img src={work.image} />
                            </a>
                            <div className="description">
                                <h3 className="subtitle">{work.title}</h3>
                                <a href={work.link} target="_blank" rel="noreferrer">
                                    {work.link}
                                </a>
                                {work.sourceCode && (
                                    <a style={{ marginLeft: '1em' }} href={work.sourceCode} target="_blank" rel="noreferrer">
                                        source code
                                    </a>
                                )}
                                <p>
                                    <b>Responsibilities:</b>
                                    <br />
                                    {work.contents.map((content, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <span key={index}>{content}</span>
                                                <br />
                                            </React.Fragment>
                                        )
                                    })}
                                </p>
                            </div>
                        </section>
                    )
                })}
            </div>
        </>
    )
}

export default WebWorks
