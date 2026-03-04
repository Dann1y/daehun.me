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
    title: 'Blog',
    description: dict.meta.blogDescription,
    openGraph: {
      title: `Blog | ${dict.meta.siteTitle}`,
      description: dict.meta.blogDescription,
      url: `${baseUrl}/${locale}/blog`,
    },
    alternates: {
      languages: {
        ko: `${baseUrl}/ko/blog`,
        en: `${baseUrl}/en/blog`,
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
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {dict.blog.title}
      </h1>
      <BlogPosts posts={getBlogPosts(locale)} locale={locale} />
    </section>
  )
}
