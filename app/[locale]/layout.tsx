import type { Metadata } from 'next'
import { Navbar } from 'app/components/nav'
import Footer from 'app/components/footer'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from 'app/components/theme-provider'
import { LocaleHtmlUpdater } from 'app/components/locale-html-updater'
import { baseUrl } from 'app/sitemap'
import { locales, getDictionary } from 'app/lib/dictionaries'
import type { Locale } from 'app/lib/dictionaries'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.siteTitle,
      template: `%s | ${dict.meta.siteTitle}`,
    },
    description: dict.meta.siteDescription,
    keywords: [...dict.meta.keywords],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ko: `${baseUrl}/ko`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      url: `${baseUrl}/${locale}`,
      siteName: dict.meta.siteTitle,
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <ThemeProvider>
      <main className="flex-auto min-w-0 h-full flex flex-col px-2 md:px-0">
        <LocaleHtmlUpdater locale={locale} />
        <Navbar locale={locale} />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </main>
    </ThemeProvider>
  )
}
