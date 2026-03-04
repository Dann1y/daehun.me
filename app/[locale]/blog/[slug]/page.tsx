import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import { locales, getDictionary } from 'app/lib/dictionaries'
import type { Locale } from 'app/lib/dictionaries'

export async function generateStaticParams() {
  let params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    let posts = getBlogPosts(locale)
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  let { locale, slug } = await params
  let post = getBlogPosts(locale).find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}${description ? `&summary=${encodeURIComponent(description)}` : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      languages: {
        ko: `${baseUrl}/ko/blog/${post.slug}`,
        en: `${baseUrl}/en/blog/${post.slug}`,
      },
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  let { locale, slug } = await params
  let post = getBlogPosts(locale).find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const dict = getDictionary(locale)

  return (
    <section className="flex flex-col flex-1">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}${post.metadata.summary ? `&summary=${encodeURIComponent(post.metadata.summary)}` : ''}`,
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Daehun Blog',
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt, false, locale)}
          </p>
          {post.metadata.label && (
            <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500 dark:text-neutral-400">
              {dict.labels[post.metadata.label] || post.metadata.label}
            </span>
          )}
        </div>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
