import React, { useState } from 'react'
import './home.scss'
import hexRunnerSrc from './screenshots/hex-runner.png'
import littleCreatureSrc from './screenshots/little-creature.png'
import { classNames } from '../../utils/classNames'

interface WorkProps {
    key: string
    ifps: string
    thumbnail: string
}

const workList: WorkProps[] = [
    {
        key: 'hex-runner',
        thumbnail: hexRunnerSrc,
        ifps: 'QmWiipEnib2qaDrmASmkTbRxocaZE58A65dvfZc3iPuN5D',
    },
    {
        key: 'little-creature',
        thumbnail: littleCreatureSrc,
        ifps: 'QmcnAcNYL7ShXzwkym3nRVbFAvnjJjDBRCUmdxzGmWQ4yT',
    },
]

const Home: React.FC = () => {
    return (
        <div>
            <div className="iframe-list">
                {workList.map((work) => {
                    return <IFrameWrapper key={work.key} work={work} />
                })}
            </div>
        </div>
    )
}

const IFrameWrapper: React.FC<{ work: WorkProps }> = ({ work }) => {
    const src = 'https://cloudflare-ipfs.com/ipfs/' + work.ifps
    const [hover, setHover] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <div
            className="home-iframe"
            onPointerEnter={() => {
                setLoading(true)
                setHover(true)
            }}
            onPointerLeave={() => {
                setLoading(false)
                setHover(false)
            }}
        >
            <div className={classNames(['mask', loading && 'mask-loading'])}>LOADING</div>
            {hover && <iframe className={loading ? 'iframe-loading' : ''} src={src} onLoad={() => setLoading(false)} />}
            <img src={work.thumbnail} alt={work.key} />
        </div>
    )
}

export default Home
