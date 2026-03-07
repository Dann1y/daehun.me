export interface ProjectData {
  name: string
  period?: string
  description: string
  achievements: string[]
  url?: string
}

export interface RoleData {
  title: string
  period: string
  projects: ProjectData[]
}

export interface ExperienceData {
  company: string
  description: string
  duration?: string
  url?: string
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
    pdfContact?: { phone?: string; email?: string }
  }
  experience: ExperienceData[]
  projects: { name: string; description: string; period?: string; url?: string }[]
  opensource: { name: string; description: string; url?: string }[]
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
  projects: [],
  experience: [
    {
      company: 'THE SWING',
      description: '모빌리티 플랫폼 스타트업',
      duration: '7개월',
      roles: [
        {
          title: 'Product Manager',
          period: '2024.12 — 2025.02',
          projects: [
            {
              name: 'SWING 교통카드',
              period: '2025.01 — 2025.02',
              description: '업계 최초 교통비 무제한 환급 모델 기획',
              achievements: [
                '무제한 환급 비즈니스 모델 기획 및 프로덕트 설계',
                '사용자 리서치 기반 핵심 기능 정의',
              ],
            },
            {
              name: 'SWING BIKE',
              period: '2024.12 — 2025.02',
              description: '이륜차 리스 사업 ERP 설계',
              achievements: [
                'B2C 고객 대상 17종의 오토바이 리스 서비스를 제공하는 웹 사이트 제작',
                'B2B 고객 대상의 주문, 정산, 재고를 관리하는 어드민 페이지 개편',
                '재고 상태와 정산 금액이 맞지 않던 문제를 데이터 정규화를 통해 해결',
                '200억 매출 사업의 데이터 정합성을 검증하고 영업지원팀의 리소스 절감',
                '렌탈 사업의 자금 조달을 위해 투자사에 서비스 피칭',
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
              period: '2024.08 — 2024.12',
              description: '구독형 모빌리티 서비스',
              achievements: [
                'Next.js + Tailwind 기반 서비스 프론트엔드 개발',
                '프로모션 페이지 제작으로 신규 유저 유입 수 증가',
                'SEO를 통해 SWAP, 전기자전거 구독 관련 키워드 상위 노출 달성',
                'Clarity 도입으로 유저 행동을 수집해 프로모션 기획 시 특정 유저를 타겟할 경우 활용',
                '월 매출 150% 증가 | 구독자 225% 성장',
                '주문, 재고, 배송을 관리하는 어드민 페이지 유지보수',
                '결제 내역 및 미납관리 개발로 현재 미납 유저 현황 파악',
              ],
            },
          ],
        },
      ],
    },
    {
      company: 'EJN (TWIP)',
      description: '크리에이터 이코노미 스타트업',
      duration: '2년 9개월',
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
                'Next.js + TypeScript 기반 SSR 아키텍처 설계',
                'i18n 적용으로 14%의 해외 사용자분들께 영어로 후원페이지를 사용할 수 있도록 제공',
                '서비스 배포 파이프라인 최적화로 배포 시간 60% 감소',
              ],
            },
            {
              name: '뽑기 후원',
              period: '2023.09 — 2023.11',
              description: '인터랙티브 뽑기 후원 기능',
              achievements: [
                '뽑기 후원 1만 3천 건, 뽑기 후원받은 크리에이터 300명',
                '타 후원 기능 대비 ARPPU 지표가 높았고, 가설 검증 성공',
              ],
            },
            {
              name: 'VOD & CLIP',
              period: '2022.01 — 2022.06',
              description: 'VOD·클립 서비스',
              achievements: [
                '초기 MAU 50,000 달성',
                '유료 구독 MoM +257% 성장',
                '월 평균 1만 ~ 2만개의 클립 달성',
              ],
            },
            {
              name: 'Design System',
              period: '2021.12 — 2024.05',
              description: '사내 디자인 시스템',
              achievements: [
                'Storybook 기반 컴포넌트 라이브러리 구축',
              ],
            },
            {
              name: 'Events',
              period: '2022.12',
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
    { name: 'FEConf TWIP 부스 운영', date: '2023.10' },
    { name: '광주소프트웨어마이스터고등학교 재학생 대상 모의 면접 및 멘토링', date: '2023' },
    { name: 'JA Korea Entrepreneur\'s Playground 창업놀이터 (ONDO) - 우수상', date: '2020.12' },
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
    title: 'Founder of Lindy Operation | ex- FE & PM',
    description: [
      '3.5 years of experience in frontend development and product management at mobility and creator economy startups.',
      'Founded Lindy Operation, building an AI-powered wealth management platform.',
    ],
    links: [
      { label: 'Blog', url: 'https://daehunlee.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danny-lee17' },
      { label: 'Github', url: 'https://github.com/Dann1y' },
    ],
    pdfContact: { phone: '010-2613-2274', email: 'leedanny0102@gmail.com' },
  },
  projects: [
    { name: 'T1 Home Ground 2025', description: 'Landing page & VIP invitation | 70K+ cumulative users', period: '2025', url: 'https://t1-homeground.gg' },
    { name: 'Gelato Pique', description: 'Inventory dashboard enhancement | LE SSERAFIM collab event page', period: '2025', url: 'https://www.gelatopique.co.kr/main' },
  ],
  experience: [
    {
      company: 'THE SWING',
      description: 'Mobility platform startup',
      duration: '2024.08 - 2025.02',
      url: 'https://swingmobility.co/',
      roles: [
        {
          title: 'Product Manager',
          period: '2024.12 — 2025.02',
          projects: [
            {
              name: 'SWING Transit Card',
              period: '2025.01 — 2025.02',
              description: 'Industry-first unlimited transit fare cashback model',
              url: 'https://apps.apple.com/us/app/%EC%8A%A4%EC%9C%99-%ED%83%9D%EC%8B%9C-%EC%9E%90%EC%A0%84%EA%B1%B0-%ED%82%A5%EB%B3%B4%EB%93%9C/id1459344011?l=ko',
              achievements: [
                'Designed unlimited cashback business model and product strategy',
                'Defined core features through user research',
              ],
            },
            {
              name: 'SWING BIKE',
              period: '2024.12 — 2025.02',
              description: 'Motorcycle lease business ERP',
              url: 'https://swapswap.kr/motorcycle',
              achievements: [
                'Built B2C website offering 17 motorcycle lease models',
                'Revamped B2B admin for order, settlement, and inventory management',
                'Resolved inventory-settlement data mismatch through data normalization',
                'Validated data integrity for KRW 20B revenue business; reduced sales support workload',
                'Pitched service to investors for rental business funding',
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
              period: '2024.08 — 2024.12',
              description: 'Subscription-based mobility service',
              url: 'https://swapswap.kr',
              achievements: [
                'Built service frontend with Next.js + Tailwind CSS',
                'Drove new user acquisition through promotion landing pages',
                'Achieved top search rankings for e-bike subscription keywords via SEO',
                'Integrated Clarity for user behavior analytics to inform targeted promotions',
                'Monthly revenue +150% | Subscribers +225%',
                'Maintained admin dashboard for order, inventory, and delivery management',
                'Built payment history and delinquency management system',
              ],
            },
          ],
        },
      ],
    },
    {
      company: 'EJN (TWIP)',
      description: 'Creator economy startup',
      duration: '2021.09 - 2024.06',
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
                'Improved paid conversion rate from 50% to 75%',
                'Reduced bundle size by 11%',
                'Architected SSR application with Next.js + TypeScript',
                'Served English donation pages for 14% international users via i18n',
                'Cut deployment time by 60% through CI/CD pipeline optimization',
              ],
            },
            {
              name: 'Gacha Donation',
              period: '2023.09 — 2023.11',
              description: 'Interactive gacha-style donation feature',
              achievements: [
                '13,000 gacha donations across 300 creators',
                'Achieved highest ARPPU among donation features; validated product hypothesis',
              ],
            },
            {
              name: 'VOD & CLIP',
              period: '2022.01 — 2022.06',
              description: 'VOD and clip service',
              achievements: [
                'Reached 50,000 initial MAU',
                'Paid subscriptions MoM +257%',
                'Averaged 10,000-20,000 monthly clips',
              ],
            },
            {
              name: 'Design System',
              period: '2021.12 — 2024.05',
              description: 'Internal design system',
              achievements: [
                'Built Storybook-based component library',
              ],
            },
            {
              name: 'Events',
              period: '2022.12',
              description: 'Event landing pages',
              achievements: [
                'Developed promotion and event landing pages',
                'Optimized conversion rates through A/B testing',
              ],
            },
          ],
        },
      ],
    },
  ],
  opensource: [
    { name: 'vercel/turbo', description: 'Contributed to Turborepo build system', url: 'https://github.com/vercel/turborepo' },
    { name: 'gpt-tuning-node', description: 'GPT fine-tuning Node.js library', url: 'https://github.com/Dann1y/gpt-tuning-node' },
    { name: 'claude-usage-monitor', description: 'Real-time Claude usage tracker for macOS menu bar', url: 'https://github.com/Dann1y/claude-usage-monitor' },
    { name: 'squisher', description: 'Rust TUI-based file compression library (PDF, PNG, JPG)', url: 'https://github.com/Dann1y/squisher' },
    { name: 'flash-pump-engine', description: 'Auto-launches memecoins on pump.fun from x.com trends', url: 'https://github.com/Dann1y/flash-pump-engine' },
  ],
  activities: [
    { name: 'FEConf TWIP Booth Operation', date: '2023.10' },
    { name: 'Mock Interview & Mentoring for GSM Students', date: '2023' },
    { name: 'JA Korea Entrepreneur\'s Playground (ONDO) — Excellence Award', date: '2020.12' },
  ],
  education: [
    {
      name: 'Gwangju Software Meister High School',
      period: '2019.03 — 2022.01',
    },
  ],
}
