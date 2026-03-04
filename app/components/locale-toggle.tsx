'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LocaleToggle() {
  const pathname = usePathname()

  const currentLocale = pathname.startsWith('/en') ? 'en' : 'ko'
  const targetLocale = currentLocale === 'ko' ? 'en' : 'ko'
  const targetLabel = currentLocale === 'ko' ? 'EN' : 'KO'

  // Replace /ko or /en prefix with target locale
  const targetPath = pathname.replace(
    /^\/(ko|en)/,
    `/${targetLocale}`
  )

  return (
    <Link
      href={targetPath}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800"
      aria-label={`Switch to ${targetLocale === 'ko' ? 'Korean' : 'English'}`}
    >
      {targetLabel}
    </Link>
  )
}
