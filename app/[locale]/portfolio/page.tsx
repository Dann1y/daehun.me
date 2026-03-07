import type { Metadata } from 'next'
import type { Locale } from 'app/lib/dictionaries'
import { getDictionary, locales } from 'app/lib/dictionaries'
import { baseUrl } from 'app/sitemap'
import { list } from '@vercel/blob'
import {
  defaultPortfolioKo,
  defaultPortfolioEn,
  type PortfolioData,
  type ExperienceData,
} from 'app/portfolio/data'

export const dynamic = 'force-dynamic'

const BLOB_KEYS: Record<string, string> = {
  ko: 'portfolio-ko.json',
  en: 'portfolio-en.json',
}

const defaults: Record<string, PortfolioData> = {
  ko: defaultPortfolioKo,
  en: defaultPortfolioEn,
}

async function getPortfolioData(locale: string): Promise<PortfolioData> {
  try {
    const key = BLOB_KEYS[locale]
    if (key) {
      const { blobs } = await list({ prefix: key, limit: 1 })
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url, { cache: 'no-store' })
        if (res.ok) {
          const json = (await res.json()) as PortfolioData
          // Migrate old { name, description } projects to ExperienceData[]
          if (json.projects?.length && !('roles' in json.projects[0])) {
            json.projects = []
          }
          return json
        }
      }
    }
  } catch {
    // Blob not configured or not found — use default
  }
  return defaults[locale] ?? defaults.ko
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)
  return {
    title: dict.meta.portfolioDescription,
    description: dict.meta.portfolioDescription,
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/portfolio`])
      ),
    },
  }
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const data = await getPortfolioData(locale)

  return (
    <section className="pb-12">
      {/* Intro */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {data.intro.name}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
          {data.intro.title}
        </p>
        {data.intro.description.map((line, i) => (
          <p
            key={i}
            className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed"
          >
            {line}
          </p>
        ))}
        <div className="flex flex-wrap gap-3 mt-4">
          {data.intro.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-sm px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold tracking-tight mb-1">
            Projects
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            {getTotalDuration(data.projects, locale)}
          </p>
          {data.projects.map((exp) => (
            <div key={exp.company} className="mb-10">
              <div className="mb-3">
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {exp.description}
                  {exp.duration && (
                    <span> · {exp.duration}</span>
                  )}
                </p>
              </div>
              <div className="border-l-2 border-neutral-200 dark:border-neutral-700 ml-2 pl-6 space-y-6">
                {exp.roles.map((role) => (
                  <div key={role.title + role.period}>
                    <div className="relative">
                      <div className="absolute -left-[30px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                      <h4 className="font-medium">{role.title}</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                        {role.period}
                      </p>
                    </div>
                    <div className="space-y-3">
                      {role.projects.map((project) => (
                        <div
                          key={project.name}
                          className="group rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                        >
                          <div className="flex items-baseline justify-between mb-1">
                            <h5 className="font-medium text-sm">
                              {project.name}
                            </h5>
                            {project.period && (
                              <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-2 shrink-0">
                                {project.period}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                            {project.description}
                          </p>
                          <ul className="list-disc list-outside pl-4 space-y-1">
                            {project.achievements.map((ach, i) => (
                              <li
                                key={i}
                                className="text-sm text-neutral-700 dark:text-neutral-300"
                              >
                                {ach}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Open Source */}
      {data.opensource.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold tracking-tight mb-4">
            Open Source
          </h2>
          <div className="space-y-2">
            {data.opensource.map((os) => (
              <div key={os.name} className="text-sm">
                <span className="font-medium">{os.name}</span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {' '}
                  — {os.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold tracking-tight mb-1">
          Work Experience
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          {getTotalDuration(data.experience, locale)}
        </p>
        {data.experience.map((exp) => (
          <div key={exp.company} className="mb-10">
            <div className="mb-3">
              <h3 className="text-lg font-semibold">{exp.company}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {exp.description}
                {exp.duration && (
                  <span> · {exp.duration}</span>
                )}
              </p>
            </div>
            <div className="border-l-2 border-neutral-200 dark:border-neutral-700 ml-2 pl-6 space-y-6">
              {exp.roles.map((role) => (
                <div key={role.title + role.period}>
                  <div className="relative">
                    <div className="absolute -left-[30px] top-1.5 w-2.5 h-2.5 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    <h4 className="font-medium">{role.title}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                      {role.period}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {role.projects.map((project) => (
                      <div
                        key={project.name}
                        className="group rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className="flex items-baseline justify-between mb-1">
                          <h5 className="font-medium text-sm">
                            {project.name}
                          </h5>
                          {project.period && (
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-2 shrink-0">
                              {project.period}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                          {project.description}
                        </p>
                        <ul className="list-disc list-outside pl-4 space-y-1">
                          {project.achievements.map((ach, i) => (
                            <li
                              key={i}
                              className="text-sm text-neutral-700 dark:text-neutral-300"
                            >
                              {ach}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Activities & Education */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {data.activities.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">
              Activities
            </h2>
            <ul className="space-y-1">
              {data.activities.map((a) => (
                <li key={a.name} className="text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {a.date}
                  </span>{' '}
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">
              Education
            </h2>
            <ul className="space-y-1">
              {data.education.map((e) => (
                <li key={e.name} className="text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {e.period}
                  </span>{' '}
                  {e.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

function getTotalDuration(experience: ExperienceData[], locale: string): string {
  let minStart = Infinity
  let maxEnd = -Infinity
  for (const exp of experience) {
    for (const role of exp.roles) {
      const parts = role.period.split('—').map((s) => s.trim())
      if (parts.length === 2) {
        const [sy, sm] = parts[0].split('.').map(Number)
        const [ey, em] = parts[1].split('.').map(Number)
        const start = sy * 12 + sm
        const end = ey * 12 + em
        if (start < minStart) minStart = start
        if (end > maxEnd) maxEnd = end
      }
    }
  }
  const months = maxEnd - minStart
  const years = Math.floor(months / 12)
  const rem = months % 12
  if (locale === 'ko') {
    if (years === 0) return `${rem}개월`
    if (rem === 0) return `${years}년`
    return `${years}년 ${rem}개월`
  }
  if (years === 0) return `${rem} mos`
  if (rem === 0) return `${years} yrs`
  return `${years} yrs ${rem} mos`
}
