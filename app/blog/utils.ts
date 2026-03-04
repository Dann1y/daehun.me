import fs from 'fs'
import path from 'path'
import type { Locale } from 'app/lib/dictionaries'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  label?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim() as keyof Metadata] = value
  })

  return { metadata: metadata as Metadata, content }
}

function getPostDirs(dir: string) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

export function getBlogPosts(locale: Locale = 'ko') {
  let postsDir = path.join(process.cwd(), 'app', 'blog', 'posts')
  let slugs = getPostDirs(postsDir)

  return slugs
    .map((slug) => {
      let localePath = path.join(postsDir, slug, `${locale}.mdx`)
      // Fallback to other locale if current doesn't exist
      if (!fs.existsSync(localePath)) {
        let fallback = locale === 'ko' ? 'en' : 'ko'
        localePath = path.join(postsDir, slug, `${fallback}.mdx`)
        if (!fs.existsSync(localePath)) return null
      }
      let { metadata, content } = readMDXFile(localePath)
      return { metadata, slug, content }
    })
    .filter(Boolean) as { metadata: Metadata; slug: string; content: string }[]
}

export { formatDate } from './format'
