import arcteryxImage from '#/assets/images/work-arcteryx.jpg'
import eidImage from '#/assets/images/work-eid.png'
import innoluxImage from '#/assets/images/work-innolux.png'
import wordsringImage from '#/assets/images/work-wordsring.png'

export interface WebWork {
  title: string
  url: string
  sourceUrl?: string
  image: string
  responsibilities: string[]
}

export const webWorks: WebWork[] = [
  {
    title: 'Screening Eagle Inspect',
    url: 'http://web.screeningeagle.com',
    image: eidImage,
    responsibilities: [
      'Development with React in TypeScript.',
      'UI and API data integration for new features.',
      'Maintain the web 3D viewer.',
      'Refactor the existing code base.',
    ],
  },
  {
    title: 'Words-ring simulation',
    url: 'http://yapitw.github.io/wordsring/build',
    sourceUrl: 'https://github.com/yapitw/yapi-graphics',
    image: wordsringImage,
    responsibilities: [
      'The entire page.',
      'A three.js WebGL simulation of a 3D ring with customised content.',
    ],
  },
  {
    title: "Arc'teryx NODIN",
    url: 'http://www.starlike.com.tw/ARC/NODIN/',
    image: arcteryxImage,
    responsibilities: [
      'HTML and CSS layout built from the design.',
      'CSS animation.',
      'jQuery interaction.',
    ],
  },
  {
    title: 'InnoLux recruitment',
    url: 'https://www.104.com.tw/cfdocs/project/1707/170707_innolux_hr/',
    image: innoluxImage,
    responsibilities: ['Main visual interaction.', 'HTML and CSS layout built from the design.'],
  },
]
