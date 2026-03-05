import { NextRequest, NextResponse } from 'next/server'
import { put, list } from '@vercel/blob'
import { verifyAuth } from 'app/lib/admin-auth'
import {
  defaultPortfolioKo,
  defaultPortfolioEn,
  type PortfolioData,
} from 'app/portfolio/data'

const BLOB_KEYS: Record<string, string> = {
  ko: 'portfolio-ko.json',
  en: 'portfolio-en.json',
}

const defaults: Record<string, PortfolioData> = {
  ko: defaultPortfolioKo,
  en: defaultPortfolioEn,
}

async function readFromBlob(locale: string): Promise<PortfolioData | null> {
  try {
    const key = BLOB_KEYS[locale]
    if (!key) return null
    const { blobs } = await list({ prefix: key, limit: 1 })
    if (blobs.length === 0) return null
    const res = await fetch(blobs[0].url)
    return (await res.json()) as PortfolioData
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale') ?? 'ko'
  const data = (await readFromBlob(locale)) ?? defaults[locale] ?? defaults.ko
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  const isAuthed = await verifyAuth()
  if (!isAuthed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const locale = request.nextUrl.searchParams.get('locale') ?? 'ko'
  const key = BLOB_KEYS[locale]
  if (!key) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  try {
    const data = await request.json()
    await put(key, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
