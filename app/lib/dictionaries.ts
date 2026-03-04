export type Locale = "ko" | "en";

export const locales: Locale[] = ["ko", "en"];
export const defaultLocale: Locale = "ko";

const dictionaries = {
  ko: {
    nav: {
      home: "home",
      blog: "blog",
      portfolio: "portfolio",
    },
    home: {
      title: "Who I am",
      items: [
        "👨🏻‍💻 과거: 3.5년 동안 모빌리티 & 크리에이터 스타트업에서 FE & PM 경험",
        "📊 현재: AI 금융 플랫폼 개발 & 오픈소스 기여",
        "🧠 사고, 실행, 학습, 반복",
      ],
    },
    blog: {
      title: "My Blog",
      allFilter: "전체",
    },
    notFound: {
      title: "404 - 페이지를 찾을 수 없습니다",
    },
    meta: {
      siteTitle: "Daehun Blog",
      siteDescription: "Think, Write, Share",
      homeTitle: "Daehun Lee",
      homeDescription: "사고의 흐름을 기록합니다.",
      blogDescription: "사고, 쓰기, 공유하는 블로그",
      portfolioDescription: "이대훈 포트폴리오",
      keywords: ["블로그", "사고", "쓰기", "공유"],
    },
    labels: {
      논문: "논문",
      생각: "생각",
    } as Record<string, string>,
  },
  en: {
    nav: {
      home: "home",
      blog: "blog",
      portfolio: "portfolio",
    },
    home: {
      title: "Who I am",
      items: [
        "👨🏻‍💻 Previously: 3.5 years as a FE & PM in the mobility & creator industry",
        "📊 Currently: Building AI financial platform & Contributing to open-source",
        "🧠 Think, Act, Learn, Repeat",
      ],
    },
    blog: {
      title: "My Blog",
      allFilter: "All",
    },
    notFound: {
      title: "404 - Page Not Found",
    },
    meta: {
      siteTitle: "Daehun Blog",
      siteDescription: "Think, Write, Share",
      homeTitle: "Daehun Lee",
      homeDescription: "A blog about thinking, writing, and sharing.",
      blogDescription: "A blog about thinking, writing, and sharing.",
      portfolioDescription: "Daehun Lee Portfolio",
      keywords: ["blog", "thinking", "writing", "sharing"],
    },
    labels: {
      논문: "Paper",
      생각: "Thoughts",
    } as Record<string, string>,
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
