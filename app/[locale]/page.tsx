import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { getDictionary, locales } from 'app/lib/dictionaries'
import type { Locale } from 'app/lib/dictionaries'
import type { Metadata } from 'next'

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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <section className="flex flex-col flex-1">
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {dict.home.title}
      </h1>
      <ul className="mb-4">
        {dict.home.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <div className="my-8">
        <BlogPosts posts={getBlogPosts(locale)} locale={locale} />
      </div>
    </section>
  )
}
