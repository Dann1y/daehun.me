import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { cx } from 'class-variance-authority'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Daehun Blog',
    template: '%s | Daehun Blog',
  },
  description: 'Think, Write, Share',
  openGraph: {
    title: 'Daehun Blog',
    description: 'Think, Write, Share',
    url: baseUrl,
    siteName: 'Daehun Blog',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'w-full h-full',
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl h-full pt-8 mx-4 lg:mx-auto">
        <main className="flex-auto min-w-0 h-full flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
