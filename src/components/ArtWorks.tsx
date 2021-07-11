import * as React from 'react'
import './artWorks.scss'

import image2d01 from '../images/2d01.jpg'
import image2d02 from '../images/2d02.jpg'
import image2d03 from '../images/2d03.jpg'
import image2d04 from '../images/2d04.jpg'

import image3d01 from '../images/3d01.jpg'
import image3d02 from '../images/3d02.jpg'
import image3d03 from '../images/3d03.jpg'
import image3d04 from '../images/3d04.jpg'
import image3d05 from '../images/3d05.jpg'
import image3d06 from '../images/3d06.jpg'
import image3d07 from '../images/3d07.png'
import image3d08 from '../images/3d08.png'
import image3d09 from '../images/3d09.png'
import image3d10 from '../images/3d10.png'

const images2D = [image2d01, image2d02, image2d03, image2d04]

const images3D = [
    image3d01,
    image3d02,
    image3d03,
    image3d04,
    image3d05,
    image3d06,
    image3d07,
    image3d08,
    image3d09,
    image3d10,
]

const ArtWorks = () => {
    const [viewerSrc, setViewerSrc] = React.useState('')
    const [isViewerVisible, setViewerVisible] = React.useState(false)

    const setViewer = (src: string) => {
        setViewerSrc(src)
        setViewerVisible(true)
    }

    return (
        <div className="art-works">
            <h1 className="first-title">Art Works</h1>
            <p>For hobby. 2D paints are done with Photoshop. 3D models are done with Blender and ZBrush.</p>
            <section>
                <h2>2D Painting</h2>
                <div className="three-column">
                    {images2D.map((image, index) => {
                        return <img key={index} src={image} onClick={() => setViewer(image)} alt="" />
                    })}
                </div>
            </section>
            <section>
                <h2>3D Modeling</h2>
                <div className="three-column">
                    {images3D.map((image, index) => {
                        return <img key={index} src={image} onClick={() => setViewer(image)} alt="" />
                    })}
                </div>
            </section>
            <div
                className={`image-viewer ${isViewerVisible ? 'show' : 'hide'}`}
                onClick={() => setViewerVisible(false)}
            >
                <img src={viewerSrc} alt="" />
            </div>
        </div>
    )
}

export default ArtWorks
