export type Lang = 'en' | 'zh'

/** Text with an optional Chinese translation; English is the fallback. */
type Text = { en: string; zh?: string }

export function t(text: Text, lang: Lang) {
  return (lang === 'zh' && text.zh) || text.en
}

export const labels = {
  profile: { en: 'Profile', zh: '關於' },
  languages: { en: 'Languages', zh: '語言' },
  contact: { en: 'Contact', zh: '聯繫' },
  coreSkills: { en: 'Core skills', zh: '核心能力' },
  career: { en: 'Career', zh: '職涯' },
  education: { en: 'Education', zh: '學歷' },
  stack: { en: 'Stack', zh: '技術' },
  responsibilities: { en: 'Responsibilities', zh: '負責項目' },
  print: { en: 'Print or save as PDF', zh: '列印或存成 PDF' },
  printedFrom: { en: 'Printed from', zh: '列印自' },
} satisfies Record<string, Text>

export const profile = {
  name: 'Ho Chun-Hsi',
  nameZh: '何俊憙',
  alias: 'Pattison Ho',
  summary: {
    en: 'A front-end developer with a design background and visualization techniques.',
    zh: '設計背景、專注視覺化與圖像工程的前端工程師。',
  },
  languages: [
    { en: 'Chinese: native speaker', zh: '中文：母語' },
    { en: 'English: working proficiency', zh: '英文：可溝通程度' },
  ],
  contacts: [
    { label: 'Email', value: 'yapi.tw@gmail.com', href: 'mailto:yapi.tw@gmail.com' },
    { label: 'GitHub', value: 'github.com/yapitw', href: 'https://github.com/yapitw/' },
    { label: 'CodePen', value: 'codepen.io/yapi', href: 'https://codepen.io/yapi/' },
  ],
} satisfies Record<string, unknown>

export const coreSkills: { title: Text; items: Text[] }[] = [
  {
    title: { en: 'Front-end development', zh: '前端工程' },
    items: [
      { en: 'Build front-end projects from scratch.', zh: '從無到有建立前端工程專案' },
      {
        en: 'Integrate web APIs and services, including AWS, the Facebook SDK and GCP.',
        zh: '接入網路服務及社群媒體 API，如 AWS、FB SDK、GCP',
      },
      {
        en: 'Communicate well with designers and product managers.',
        zh: '能與設計師、專案經理進行專案溝通',
      },
      { en: 'Advanced CSS implementation.', zh: '進階 CSS 樣式撰寫' },
      { en: 'Generative graphics programming.', zh: '生成式建構圖形程式撰寫' },
      { en: 'Back-end development (Node.js).', zh: '後端開發 (Node.js)' },
      { en: 'AI service integration (ChatGPT, Microsoft Text to Speech).' },
      { en: 'Chatbot service integration (Telegram, LINE).' },
    ],
  },
  {
    title: { en: 'Computer graphics', zh: '電腦繪圖' },
    items: [
      { en: '3D computer graphics fundamentals.', zh: '3D 圖學基礎' },
      { en: 'Procedural 3D modeling and 3D sculpting.', zh: '程序化 3D 建模、3D 雕刻' },
    ],
  },
]

export interface Role {
  company: string
  role: Text
  period: Text
  stack?: string[]
  duties?: Text[]
  projects?: { name: string; description: string; duties: string[] }[]
}

export const career: Role[] = [
  {
    company: 'OKX',
    role: { en: 'Front-end engineer', zh: '前端工程師' },
    period: { en: 'Sep 2022 – present', zh: '2022 年 9 月 – 至今' },
    stack: ['TypeScript', 'Node.js', 'React'],
  },
  {
    company: 'ByteDance',
    role: { en: 'Software engineer (full-stack front-end)', zh: '軟體工程師（全端前端）' },
    period: { en: 'May 2021 – Sep 2022', zh: '2021 年 5 月 – 2022 年 9 月' },
    stack: [
      'TypeScript',
      'Node.js',
      'React',
      'Redux',
      'GraphQL',
      'D3.js',
      'SVG',
      'Canvas API',
      'Less',
      'styled-components',
    ],
    projects: [
      {
        name: 'G***y Node',
        description:
          'An internal deployment platform that builds Node.js projects and deploys them to internal cloud services.',
        duties: [
          'Develop front-end components.',
          'Maintain the existing service.',
          'Deliver incoming requirements.',
        ],
      },
      {
        name: 'A******st',
        description: 'A repository analytics platform for large-scale monorepos.',
        duties: [
          'Develop features with consumer departments.',
          'Build front-end pages and components.',
          'Integrate back-end services with GraphQL.',
          'Provide optimised visualization solutions.',
        ],
      },
    ],
  },
  {
    company: 'Screening Eagle Dreamlab',
    role: { en: 'Front-end developer', zh: '前端工程師' },
    period: { en: 'May 2020 – May 2021', zh: '2020 年 5 月起，任職 1 年' },
    stack: ['TypeScript', 'React', 'Redux', 'Three.js', 'SVG', 'Ant Design', 'Stylus'],
    duties: [
      {
        en: 'Maintain the back-office UI with TypeScript and React.',
        zh: '維護後台介面，主要技術為 TypeScript、React',
      },
      { en: 'Maintain the BIM 3D model viewer.', zh: '維護網頁 3D 視圖展示應用' },
      { en: 'Update and refactor the existing code base.', zh: '更新維護及重構現有的程式碼' },
      { en: 'Build new features for the product roadmap.', zh: '開發新的功能及需求' },
    ],
    projects: [
      {
        name: 'Screening Eagle Inspect back office',
        description:
          'A construction project management platform with a BIM model viewer, an inspection results viewer and an issue management dashboard.',
        duties: [],
      },
      {
        name: 'Workspace',
        description:
          'A platform to manage inspection devices and their data with Eagle ID accounts.',
        duties: ['Develop features and requirements on the front-end side.'],
      },
    ],
  },
  {
    company: 'United Overseas Bank (UOB), via Optimum Solutions',
    role: { en: 'Front-end developer', zh: '前端工程師（Optimum Solutions 派遣）' },
    period: { en: 'Sep 2019 – Apr 2020', zh: '2019 年 9 月起，任職 8 個月' },
    stack: ['React', 'Redux', 'styled-components'],
    duties: [
      {
        en: 'Maintain the credit card application UI with React.',
        zh: '維護信用卡申請介面的網頁應用程式（主要技術 React）',
      },
      { en: 'Build event application UIs with React.', zh: '開發中短期活動網頁應用程式' },
      {
        en: 'Provide front-end support to other teams.',
        zh: '提供專案經理和業務開發人員前端技術諮詢',
      },
      {
        en: 'Estimate effort for upcoming changes with the product owner and back-end developers.',
        zh: '評估執行專案所需要的前端資源',
      },
      { en: 'Scrum developer.', zh: 'Scrum Developer' },
    ],
  },
  {
    company: 'Orion Consultancy',
    role: { en: 'Web developer', zh: '前端工程師' },
    period: { en: 'May 2018 – Aug 2019', zh: '2018 年 5 月起，任職 1 年 4 個月' },
    stack: ['React', 'TypeScript', 'Redux', 'Pixi.js', 'Pug', 'Node.js', 'SCSS'],
    duties: [
      {
        en: 'Develop front-end project UIs with React.',
        zh: '開發網頁應用程式介面（主要技術 React）',
      },
      {
        en: 'Fix and maintain back-office UIs with React and TypeScript.',
        zh: '維護後台介面（主要技術 React、TypeScript）',
      },
      {
        en: 'Migrate old projects to newer technology for easier maintenance.',
        zh: '遷移更新現有專案',
      },
      {
        en: 'Implement requirements and build pages from designs.',
        zh: '執行各項網頁切版及更新需求',
      },
    ],
  },
  {
    company: '18Design Co., Ltd.',
    role: { en: 'Web front-end developer', zh: '前端工程師' },
    period: { en: '2017, 1 year', zh: '2017 年起，任職 1 年' },
    stack: ['jQuery', 'Sass', 'Canvas API', 'Pug'],
    duties: [
      {
        en: 'Explore and agree on solutions with PMs, designers and back-end developers so projects run well.',
        zh: '研究可行的前端解決方案，並與設計師、專案經理及後端工程師溝通執行方式',
      },
      {
        en: 'Explore social media APIs and use them in projects.',
        zh: '探索並在專案中應用社群媒體 API 串接',
      },
      {
        en: 'Make applications run well on desktop and mobile.',
        zh: '優化網頁執行效率及在行動裝置的可用性',
      },
      {
        en: 'Front-end development in HTML, CSS and JavaScript.',
        zh: '前端專案開發（HTML、CSS、JavaScript）',
      },
      { en: 'HTML/JS mini-games for promotional events.', zh: 'HTML/JS 活動頁小遊戲開發' },
      { en: 'Pug and Sass preprocessing.' },
      { en: 'CSS and SVG animation.', zh: '撰寫 CSS、SVG 動態腳本' },
      { en: 'Version control with TortoiseHg.', zh: '使用 TortoiseHg 控管程式版本' },
    ],
  },
  {
    company: 'trii collection',
    role: { en: 'Co-founder', zh: '共同創立工作室並參與設計研發' },
    period: { en: '2014, 3 years', zh: '2014 年創立，參與 3 年' },
    duties: [
      {
        en: 'Co-founder; planned the roadmap with the other founders.',
        zh: '共同創立，研究產品發展方向並參與設計',
      },
      { en: 'Researched 3D printing techniques.', zh: '調查研究 3D 列印技術' },
      { en: 'Designed accessories.', zh: '飾品設計' },
      { en: 'Procedural 3D model design.', zh: '3D 建模、可程序化 3D 設計' },
      { en: 'Ran and troubleshot the 3D printing process.', zh: '3D 列印流程的操作與排錯' },
      { en: 'Contract product development.', zh: '飾品開發' },
      {
        en: 'Built the studio website with HTML, CSS, JavaScript and jQuery.',
        zh: '製作工作室網頁，使用 HTML、CSS、JavaScript、jQuery',
      },
    ],
  },
  {
    company: 'Aye-star Co., Ltd.',
    role: { en: 'Special assistant', zh: '特別助理' },
    period: { en: '2010, 5 years', zh: '2010 年起，任職 5 年' },
    duties: [
      { en: 'Production development and solution discussions.', zh: '與產品開發人員討論解決方案' },
      {
        en: 'End-to-end order management, from component to final product.',
        zh: '訂單管理，並跟進新產品開模生產事項',
      },
      {
        en: 'Translated customer requirements into feasible production processes.',
        zh: '翻譯及溝通客戶需求（英中）',
      },
      { en: 'Quality control tours with customers.', zh: '陪同客戶執行出貨品質檢驗流程' },
    ],
  },
]

export const education: { title: Text; detail: Text }[] = [
  {
    title: { en: 'Self-taught', zh: '自學' },
    detail: {
      en: 'Front-end programming and 3D software from online courses including Udemy, Udacity, Codecademy, Hahow, Hiskio and YouTube.',
      zh: '利用各平台自學程式及 3D 軟體，如 Udemy、Udacity、Codecademy、Hahow、Hiskio、YouTube 等。',
    },
  },
  {
    title: {
      en: 'Advanced JavaScript front-end engineering course',
      zh: 'JavaScript 網頁前端工程進階',
    },
    detail: {
      en: 'Information System Training Program, National Taiwan University.',
      zh: '台大資訊系統訓練班',
    },
  },
  {
    title: { en: 'Bachelor of Industrial Design', zh: '工業設計學士' },
    detail: { en: 'National Taipei University of Technology.', zh: '國立台北科技大學' },
  },
]
