import { skillsData, skillsDataZh, careerData, careerDataZh } from './aboutData'
import en from './en.json'
import zh from './zh.json'

export type Languages = 'en' | 'zh'

const allMessages: { [key in Languages]: { [key: string]: string } } = {
    en: {
        skillSet: JSON.stringify(skillsData),
        careerData: JSON.stringify(careerData),
        ...en,
    },
    zh: {
        skillSet: JSON.stringify(skillsDataZh),
        careerData: JSON.stringify(careerDataZh),
        ...zh,
    },
}

export default allMessages
