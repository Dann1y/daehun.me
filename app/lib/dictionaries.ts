export type Locale = 'ko' | 'en'

export const locales: Locale[] = ['ko', 'en']
export const defaultLocale: Locale = 'ko'

const dictionaries = {
  ko: {
    nav: {
      home: 'home',
      blog: 'blog',
    },
    home: {
      title: 'Who I am',
      items: [
        '👨🏻‍💻 3.5 years of experience in Web Development & Product Management',
        '📊 Building a financial ecosystem',
        '🧠 Think, Act, Learn, Repeat',
      ],
    },
    blog: {
      title: 'My Blog',
      allFilter: '전체',
    },
    notFound: {
      title: '404 - 페이지를 찾을 수 없습니다',
    },
    meta: {
      siteTitle: 'Daehun Blog',
      siteDescription: 'Think, Write, Share',
      homeTitle: 'Daehun Lee — Developer & Product Manager',
      homeDescription:
        '웹 개발과 프로덕트 매니지먼트 경험을 바탕으로 생각하고, 쓰고, 공유하는 블로그.',
      blogDescription: '개발, AI, 프로덕트에 대한 생각을 기록하는 블로그.',
      keywords: ['블로그', '개발', '웹개발', 'AI', '프로덕트'],
    },
    labels: {
      '논문': '논문',
      '생각': '생각',
    } as Record<string, string>,
  },
  en: {
    nav: {
      home: 'home',
      blog: 'blog',
    },
    home: {
      title: 'Who I am',
      items: [
        '👨🏻‍💻 3.5 years of experience in Web Development & Product Management',
        '📊 Building a financial ecosystem',
        '🧠 Think, Act, Learn, Repeat',
      ],
    },
    blog: {
      title: 'My Blog',
      allFilter: 'All',
    },
    notFound: {
      title: '404 - Page Not Found',
    },
    meta: {
      siteTitle: 'Daehun Blog',
      siteDescription: 'Think, Write, Share',
      homeTitle: 'Daehun Lee — Developer & Product Manager',
      homeDescription:
        'A blog about thinking, writing, and sharing based on web development and product management experience.',
      blogDescription:
        'A blog documenting thoughts on development, AI, and products.',
      keywords: ['blog', 'development', 'web development', 'AI', 'product'],
    },
    labels: {
      '논문': 'Paper',
      '생각': 'Thoughts',
    } as Record<string, string>,
  },
} as const

export type Dictionary = (typeof dictionaries)[Locale]

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
