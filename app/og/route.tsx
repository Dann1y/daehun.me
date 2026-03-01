import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  let url = new URL(request.url)
  let title = url.searchParams.get('title') || 'Daehun Blog'
  let summary = url.searchParams.get('summary') || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000',
          padding: '60px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent gradient orb */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0) 70%)',
          }}
        />

        {/* Top: Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              background: '#fff',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: 800,
              color: '#000',
            }}
          >
            D
          </div>
          <span
            style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.5)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            daehunlee.com
          </span>
        </div>

        {/* Center: Title + Summary */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 40 ? '48px' : '56px',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {title}
          </h1>
          {summary && (
            <p
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {summary.length > 120
                ? summary.slice(0, 120) + '...'
                : summary}
            </p>
          )}
        </div>

        {/* Bottom: Divider line */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background:
              'linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
