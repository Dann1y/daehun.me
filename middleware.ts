import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from 'app/lib/dictionaries'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (hasLocale) return

  // Detect locale from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferKo = acceptLang.split(',').some((lang) =>
    lang.trim().toLowerCase().startsWith('ko')
  )
  const detectedLocale = preferKo ? 'ko' : 'en'

  const url = request.nextUrl.clone()
  url.pathname = `/${detectedLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher:
    '/((?!api|admin|_next/static|_next/image|favicon.ico|og|rss|sitemap|robots|icon|apple-icon|.*\\..*).*)',
}
