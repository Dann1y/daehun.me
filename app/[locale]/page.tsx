import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { getDictionary, locales } from 'app/lib/dictionaries'
import type { Locale } from 'app/lib/dictionaries'
import type { Metadata } from 'next'
import { list } from '@vercel/blob'
import {
  defaultPortfolioKo,
  defaultPortfolioEn,
  type PortfolioData,
} from 'app/portfolio/data'

export const dynamic = 'force-dynamic'

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
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: `${baseUrl}/${locale}`,
    },
    alternates: {
      languages: {
        ko: `${baseUrl}/ko`,
        en: `${baseUrl}/en`,
      },
    },
  }
}

const BLOB_KEYS: Record<string, string> = {
  ko: 'portfolio-ko.json',
  en: 'portfolio-en.json',
}

const defaults: Record<string, PortfolioData> = {
  ko: defaultPortfolioKo,
  en: defaultPortfolioEn,
}

async function getIntro(locale: string) {
  try {
    const key = BLOB_KEYS[locale]
    if (key) {
      const { blobs } = await list({ prefix: key, limit: 1 })
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url, { cache: 'no-store' })
        if (res.ok) {
          const json = (await res.json()) as PortfolioData
          return json.intro
        }
      }
    }
  } catch {
    // fall through
  }
  return (defaults[locale] ?? defaults.ko).intro
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const intro = await getIntro(locale)

  return (
    <section className="flex flex-col flex-1">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {intro.name}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
          {intro.title}
        </p>
        {intro.description.map((line, i) => (
          <p
            key={i}
            className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed"
          >
            {line}
          </p>
        ))}
      </div>
      <div className="my-8">
        <BlogPosts posts={getBlogPosts(locale)} locale={locale} />
      </div>
    </section>
  )
}
