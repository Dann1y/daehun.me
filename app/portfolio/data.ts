export interface ProjectData {
  name: string
  period?: string
  description: string
  achievements: string[]
}

export interface RoleData {
  title: string
  period: string
  projects: ProjectData[]
}

export interface ExperienceData {
  company: string
  description: string
  roles: RoleData[]
}

export interface LinkData {
  label: string
  url: string
}

export interface PortfolioData {
  intro: {
    name: string
    title: string
    description: string[]
    links: LinkData[]
  }
  experience: ExperienceData[]
  opensource: { name: string; description: string }[]
  activities: { name: string; date: string }[]
  education: { name: string; period: string }[]
}

export const defaultPortfolioKo: PortfolioData = {
  intro: {
    name: '이대훈',
    title: 'Frontend Developer & PM',
    description: [
      '3.5년간 모빌리티·크리에이터 스타트업에서 프론트엔드 개발과 프로덕트 매니징을 경험했습니다.',
      '사용자 중심의 제품을 만들고, 데이터로 성과를 증명하는 것을 좋아합니다.',
    ],
    links: [],
  },
  experience: [
    {
      company: 'THE SWING',
      description: '모빌리티 플랫폼 스타트업',
      roles: [
        {
          title: 'Product Manager',
          period: '2025.01 — 2025.02',
          projects: [
            {
              name: 'SWING 교통카드',
              period: '2025.01 — 2025.02',
              description: '업계 최초 무제한 환급 모델 기획',
              achievements: [
                '무제한 환급 비즈니스 모델 기획 및 프로덕트 설계',
                '사용자 리서치 기반 핵심 기능 정의',
              ],
            },
            {
              name: 'SWING TAXI',
              period: '2025.01 — 2025.02',
              description: '택시 호출 서비스 PM',
              achievements: [
                '택시 서비스 런칭 전략 수립',
                '드라이버·라이더 양면 플랫폼 설계',
              ],
            },
          ],
        },
        {
          title: 'Frontend Developer',
          period: '2024.08 — 2025.01',
          projects: [
            {
              name: 'SWAP',
              period: '2024.09 — 2024.12',
              description: '구독형 모빌리티 서비스',
              achievements: [
                '구독자 800 → 2,700명 (225% 성장)',
                '월 매출 150% 증가',
                'Next.js + Tailwind 기반 서비스 프론트엔드 개발',
              ],
            },
            {
              name: 'SWING BIKE',
              period: '2024.08 — 2024.12',
              description: '공유 자전거 서비스',
              achievements: [
                '연 매출 200억 서비스 프론트엔드 유지보수',
                '레거시 코드 리팩토링 및 성능 최적화',
              ],
            },
          ],
        },
      ],
    },
    {
      company: 'EJN (TWIP)',
      description: '크리에이터 이코노미 스타트업',
      roles: [
        {
          title: 'Frontend Developer',
          period: '2021.09 — 2024.06',
          projects: [
            {
              name: 'TWIP 2.0',
              period: '2023.01 — 2024.06',
              description: '후원 플랫폼 리뉴얼',
              achievements: [
                'NPS 조사: 크리에이터 94%, 시청자 92%',
                '유료 전환율 50% → 75% 개선',
                '번들 사이즈 11% 감소',
                'React + TypeScript 기반 SPA 아키텍처 설계',
              ],
            },
            {
              name: '뽑기 후원',
              period: '2022.06 — 2023.01',
              description: '인터랙티브 후원 기능',
              achievements: [
                '누적 13,000건 후원 처리',
                '300명+ 크리에이터 사용',
                'Canvas API 기반 인터랙티브 UI 개발',
              ],
            },
            {
              name: 'VOD & CLIP',
              period: '2022.01 — 2022.06',
              description: 'VOD·클립 서비스',
              achievements: [
                'MAU 50,000 달성',
                '유료 구독 MoM +257% 성장',
                'HLS 스트리밍 플레이어 개발',
              ],
            },
            {
              name: 'Design System',
              period: '2022.03 — 2022.12',
              description: '사내 디자인 시스템',
              achievements: [
                'Storybook 기반 컴포넌트 라이브러리 구축',
                'Monorepo(Turborepo) 아키텍처 설계',
              ],
            },
            {
              name: 'Events',
              period: '2021.09 — 2022.03',
              description: '이벤트 페이지 개발',
              achievements: [
                '프로모션·이벤트 랜딩 페이지 개발',
                'A/B 테스트 기반 전환율 최적화',
              ],
            },
          ],
        },
      ],
    },
  ],
  opensource: [
    {
      name: 'vercel/turbo',
      description: 'Turborepo 빌드 시스템 기여',
    },
    {
      name: 'gpt-tuning-node',
      description: 'GPT 파인튜닝 Node.js 라이브러리',
    },
  ],
  activities: [
    { name: 'FEConf 2023', date: '2023' },
  ],
  education: [
    {
      name: '광주소프트웨어마이스터고등학교 (GSM)',
      period: '2019.03 — 2022.01',
    },
  ],
}

export const defaultPortfolioEn: PortfolioData = {
  intro: {
    name: 'Daehun Lee',
    title: 'Frontend Developer & PM',
    description: [
      '3.5 years of experience in frontend development and product management at mobility and creator economy startups.',
      'Passionate about building user-centric products and proving impact through data.',
    ],
    links: [],
  },
  experience: [
    {
      company: 'THE SWING',
      description: 'Mobility platform startup',
      roles: [
        {
          title: 'Product Manager',
          period: '2025.01 — 2025.02',
          projects: [
            {
              name: 'SWING Transit Card',
              period: '2025.01 — 2025.02',
              description: 'Industry-first unlimited cashback model',
              achievements: [
                'Designed unlimited cashback business model and product strategy',
                'Defined core features based on user research',
              ],
            },
            {
              name: 'SWING TAXI',
              period: '2025.01 — 2025.02',
              description: 'Ride-hailing service PM',
              achievements: [
                'Established taxi service launch strategy',
                'Designed two-sided platform for drivers and riders',
              ],
            },
          ],
        },
        {
          title: 'Frontend Developer',
          period: '2024.08 — 2025.01',
          projects: [
            {
              name: 'SWAP',
              period: '2024.09 — 2024.12',
              description: 'Subscription-based mobility service',
              achievements: [
                'Subscribers 800 → 2,700 (225% growth)',
                'Monthly revenue +150%',
                'Built service frontend with Next.js + Tailwind',
              ],
            },
            {
              name: 'SWING BIKE',
              period: '2024.08 — 2024.12',
              description: 'Shared bicycle service',
              achievements: [
                'Maintained frontend for ₩20B annual revenue service',
                'Legacy code refactoring and performance optimization',
              ],
            },
          ],
        },
      ],
    },
    {
      company: 'EJN (TWIP)',
      description: 'Creator economy startup',
      roles: [
        {
          title: 'Frontend Developer',
          period: '2021.09 — 2024.06',
          projects: [
            {
              name: 'TWIP 2.0',
              period: '2023.01 — 2024.06',
              description: 'Donation platform renewal',
              achievements: [
                'NPS: Creators 94%, Viewers 92%',
                'Paid conversion rate 50% → 75%',
                'Bundle size reduced by 11%',
                'Architected React + TypeScript SPA',
              ],
            },
            {
              name: 'Gacha Donation',
              period: '2022.06 — 2023.01',
              description: 'Interactive donation feature',
              achievements: [
                '13,000+ cumulative donations processed',
                '300+ creators adopted',
                'Built interactive UI with Canvas API',
              ],
            },
            {
              name: 'VOD & CLIP',
              period: '2022.01 — 2022.06',
              description: 'VOD and clip service',
              achievements: [
                'Reached 50,000 MAU',
                'Paid subscriptions MoM +257%',
                'Developed HLS streaming player',
              ],
            },
            {
              name: 'Design System',
              period: '2022.03 — 2022.12',
              description: 'Internal design system',
              achievements: [
                'Built Storybook-based component library',
                'Designed Monorepo (Turborepo) architecture',
              ],
            },
            {
              name: 'Events',
              period: '2021.09 — 2022.03',
              description: 'Event page development',
              achievements: [
                'Built promotion and event landing pages',
                'Optimized conversion with A/B testing',
              ],
            },
          ],
        },
      ],
    },
  ],
  opensource: [
    {
      name: 'vercel/turbo',
      description: 'Contributed to Turborepo build system',
    },
    {
      name: 'gpt-tuning-node',
      description: 'GPT fine-tuning Node.js library',
    },
  ],
  activities: [
    { name: 'FEConf 2023', date: '2023' },
  ],
  education: [
    {
      name: 'Gwangju Software Meister High School (GSM)',
      period: '2019.03 — 2022.01',
    },
  ],
}
