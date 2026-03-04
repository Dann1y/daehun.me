import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { LocaleToggle } from './locale-toggle'
import type { Locale } from 'app/lib/dictionaries'
import { getDictionary } from 'app/lib/dictionaries'

export function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)

  const navItems = {
    [`/${locale}`]: { name: dict.nav.home },
    [`/${locale}/blog`]: { name: dict.nav.blog },
    [`/${locale}/portfolio`]: { name: dict.nav.portfolio },
  }

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
          </div>
          <div className="flex items-center gap-1">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </aside>
  )
}
