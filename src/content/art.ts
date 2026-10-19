import painting01 from '#/assets/images/2d01.jpg'
import painting02 from '#/assets/images/2d02.jpg'
import painting03 from '#/assets/images/2d03.jpg'
import painting04 from '#/assets/images/2d04.jpg'
import model01 from '#/assets/images/3d01.jpg'
import model02 from '#/assets/images/3d02.jpg'
import model03 from '#/assets/images/3d03.jpg'
import model04 from '#/assets/images/3d04.jpg'
import model05 from '#/assets/images/3d05.jpg'
import model06 from '#/assets/images/3d06.jpg'
import model07 from '#/assets/images/3d07.png'
import model08 from '#/assets/images/3d08.png'
import model09 from '#/assets/images/3d09.png'
import model10 from '#/assets/images/3d10.png'

export interface Artwork {
  src: string
  width: number
  height: number
}

export interface ArtSeries {
  id: string
  title: string
  medium: string
  works: Artwork[]
}

export const artSeries: ArtSeries[] = [
  {
    id: 'painting',
    title: '2D painting',
    medium: 'Painted in Photoshop.',
    works: [
      { src: painting01, width: 2000, height: 2000 },
      { src: painting02, width: 1000, height: 1500 },
      { src: painting03, width: 1792, height: 3340 },
      { src: painting04, width: 1517, height: 2023 },
    ],
  },
  {
    id: 'modeling',
    title: '3D modeling',
    medium: 'Modeled and sculpted in Blender and ZBrush.',
    works: [
      { src: model01, width: 1000, height: 1000 },
      { src: model02, width: 840, height: 908 },
      { src: model03, width: 738, height: 510 },
      { src: model04, width: 500, height: 890 },
      { src: model05, width: 600, height: 900 },
      { src: model06, width: 1000, height: 1000 },
      { src: model07, width: 1920, height: 1080 },
      { src: model08, width: 900, height: 600 },
      { src: model09, width: 1200, height: 600 },
      { src: model10, width: 960, height: 540 },
    ],
  },
]
