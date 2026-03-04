'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatDate } from 'app/blog/format'
import type { Locale } from 'app/lib/dictionaries'
import { getDictionary } from 'app/lib/dictionaries'

type Post = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
    label?: string
  }
}

export function BlogPosts({
  posts,
  locale = 'ko',
}: {
  posts: Post[]
  locale?: Locale
}) {
  let [activeLabel, setActiveLabel] = useState<string | null>(null)
  const dict = getDictionary(locale)

  let labels = Array.from(
    new Set(posts.map((p) => p.metadata.label).filter(Boolean))
  ) as string[]

  let sorted = posts
    .filter((p) => !activeLabel || p.metadata.label === activeLabel)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )

  return (
    <div>
      {labels.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setActiveLabel(null)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              activeLabel === null
                ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-800'
                : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {dict.blog.allFilter}
          </button>
          {labels.map((label) => (
            <button
              key={label}
              onClick={() =>
                setActiveLabel(activeLabel === label ? null : label)
              }
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                activeLabel === label
                  ? 'bg-neutral-800 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-800'
                  : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {dict.labels[label] || label}
            </button>
          ))}
        </div>
      )}
      {sorted.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/${locale}/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[120px] shrink-0 tabular-nums">
              {formatDate(post.metadata.publishedAt, false, locale)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex items-center gap-2">
              {post.metadata.title}
              {post.metadata.label && (
                <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  {dict.labels[post.metadata.label] || post.metadata.label}
                </span>
              )}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
