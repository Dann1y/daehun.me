import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: '개발, AI, 프로덕트에 대한 생각을 기록하는 블로그.',
  openGraph: {
    title: 'Blog | Daehun Blog',
    description: '개발, AI, 프로덕트에 대한 생각을 기록하는 블로그.',
    url: `${baseUrl}/blog`,
  },
}

export default function Page() {
  return (
    <section className="flex flex-col flex-1">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts posts={getBlogPosts()} />
    </section>
  )
}
