import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from 'app/lib/dictionaries'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname already has a locale prefix
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (hasLocale) return

  // Redirect to default locale
  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher:
    '/((?!api|admin|_next/static|_next/image|favicon.ico|og|rss|sitemap|robots|icon|apple-icon|.*\\..*).*)',
}
