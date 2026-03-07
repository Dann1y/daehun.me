'use client'

import {
  Document,
  Page,
  View,
  Text,
  Link,
  Font,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import type {
  PortfolioData,
  ExperienceData,
} from 'app/portfolio/data'

// Register Noto Sans KR for Korean text support
Font.register({
  family: 'NotoSansKR',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLQ.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzjQ1eLQ.ttf',
      fontWeight: 600,
    },
    {
      src: 'https://fonts.gstatic.com/s/notosanskr/v39/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzg01eLQ.ttf',
      fontWeight: 700,
    },
  ],
})

Font.registerHyphenationCallback((word) => [word])

const colors = {
  black: '#171717',
  dark: '#404040',
  muted: '#737373',
  light: '#a3a3a3',
  border: '#e5e5e5',
  bg: '#fafafa',
}

const s = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansKR',
    fontSize: 9,
    color: colors.black,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 48,
    lineHeight: 1.5,
  },
  // Intro
  name: { fontSize: 22, fontWeight: 700, marginBottom: 6 },
  title: { fontSize: 11, color: colors.muted, marginBottom: 10 },
  descLine: { fontSize: 9, color: colors.dark, lineHeight: 1.6 },
  linksRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  linkPill: {
    fontSize: 8,
    color: colors.dark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },
  // Section
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 2,
    marginTop: 20,
  },
  sectionSub: { fontSize: 8, color: colors.muted, marginBottom: 10 },
  // Experience block
  companyRow: { marginBottom: 2 },
  companyName: { fontSize: 11, fontWeight: 600 },
  companyDesc: { fontSize: 8, color: colors.muted },
  roleBlock: {
    marginLeft: 8,
    paddingLeft: 10,
    borderLeftWidth: 1.5,
    borderLeftColor: colors.border,
    marginBottom: 8,
  },
  roleTitle: { fontSize: 9.5, fontWeight: 600, marginBottom: 1 },
  rolePeriod: { fontSize: 7.5, color: colors.muted, marginBottom: 6 },
  projectCard: {
    marginBottom: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  projectName: { fontSize: 9, fontWeight: 600 },
  projectPeriod: { fontSize: 7, color: colors.light },
  projectDesc: { fontSize: 8, color: colors.muted, marginBottom: 4 },
  achItem: {
    fontSize: 8,
    color: colors.dark,
    marginBottom: 1.5,
    paddingLeft: 8,
  },
  bullet: { position: 'absolute' as const, left: 0 },
  // Open Source
  osItem: { flexDirection: 'row', marginBottom: 3 },
  osName: { fontSize: 9, fontWeight: 600 },
  osDesc: { fontSize: 9, color: colors.muted },
  // Activities & Education
  twoCol: { flexDirection: 'row', gap: 24, marginTop: 20 },
  col: { flex: 1 },
  listItem: { fontSize: 8, color: colors.dark, marginBottom: 2 },
  listDate: { color: colors.muted },
})

function ExperienceBlock({ data }: { data: ExperienceData[] }) {
  return (
    <>
      {data.map((exp, ei) => (
        <View key={ei} style={{ marginBottom: 12 }} wrap={false}>
          <View style={s.companyRow}>
            {exp.url ? (
              <Link src={exp.url} style={s.companyName}>{exp.company}</Link>
            ) : (
              <Text style={s.companyName}>{exp.company}</Text>
            )}
            <Text style={s.companyDesc}>
              {exp.description}
              {exp.duration ? ` · ${exp.duration}` : ''}
            </Text>
          </View>
          {exp.roles.map((role, ri) => (
            <View key={ri} style={s.roleBlock}>
              <Text style={s.roleTitle}>{role.title}</Text>
              <Text style={s.rolePeriod}>{role.period}</Text>
              {role.projects.map((project, pi) => (
                <View key={pi} style={s.projectCard} wrap={false}>
                  <View style={s.projectHeader}>
                    {project.url ? (
                      <Link src={project.url} style={s.projectName}>{project.name}</Link>
                    ) : (
                      <Text style={s.projectName}>{project.name}</Text>
                    )}
                    {project.period && (
                      <Text style={s.projectPeriod}>{project.period}</Text>
                    )}
                  </View>
                  <Text style={s.projectDesc}>{project.description}</Text>
                  {project.achievements.map((ach, ai) => (
                    <View key={ai} style={s.achItem}>
                      <Text style={s.bullet}>•</Text>
                      <Text>{ach}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </>
  )
}

function getTotalDuration(
  experience: ExperienceData[],
  locale: string
): string {
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

function PortfolioPdfDocument({
  data,
  locale,
}: {
  data: PortfolioData
  locale: string
}) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Intro */}
        <Text style={s.name}>{data.intro.name}</Text>
        <Text style={s.title}>{data.intro.title}</Text>
        {(data.intro.pdfContact?.phone || data.intro.pdfContact?.email) && (
          <Text style={{ fontSize: 8, color: colors.muted, marginBottom: 4 }}>
            {[data.intro.pdfContact.phone, data.intro.pdfContact.email].filter(Boolean).join('  |  ')}
          </Text>
        )}
        {data.intro.description.map((line, i) => (
          <Text key={i} style={s.descLine}>
            {line}
          </Text>
        ))}
        {data.intro.links.length > 0 && (
          <View style={s.linksRow}>
            {data.intro.links.map((link, i) => (
              <Link key={i} src={link.url} style={s.linkPill}>
                {link.label}
              </Link>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Projects</Text>
            <View style={{ marginTop: 4 }}>
              {data.projects.map((p, i) => (
                <View key={i} style={{ flexDirection: 'row', marginBottom: 3 }}>
                  {p.url ? (
                    <Link src={p.url} style={{ fontSize: 9, fontWeight: 600, minWidth: 100, color: colors.black, textDecoration: 'underline' }}>
                      {p.name}
                    </Link>
                  ) : (
                    <Text style={{ fontSize: 9, fontWeight: 600, minWidth: 100 }}>
                      {p.name}
                    </Text>
                  )}
                  <Text style={{ fontSize: 9, color: colors.muted, flex: 1 }}>
                    {p.description}
                  </Text>
                  {p.period && (
                    <Text style={{ fontSize: 8, color: colors.light, marginLeft: 8 }}>
                      {p.period}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Open Source */}
        {data.opensource.length > 0 && (
          <>
            <Text style={s.sectionTitle}>Open Source</Text>
            <View style={{ marginTop: 4 }}>
              {data.opensource.map((os, i) => (
                <View key={i} style={s.osItem}>
                  {os.url ? (
                    <Link src={os.url} style={{ ...s.osName, textDecoration: 'underline', color: colors.black }}>{os.name}</Link>
                  ) : (
                    <Text style={s.osName}>{os.name}</Text>
                  )}
                  <Text style={s.osDesc}> — {os.description}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Work Experience */}
        <Text style={s.sectionTitle}>Work Experience</Text>
        <Text style={s.sectionSub}>
          {getTotalDuration(data.experience, locale)}
        </Text>
        <ExperienceBlock data={data.experience} />

        {/* Activities & Education */}
        <View style={s.twoCol}>
          {data.activities.length > 0 && (
            <View style={s.col}>
              <Text style={[s.sectionTitle, { marginTop: 0 }]}>
                Activities
              </Text>
              {data.activities.map((a, i) => (
                <Text key={i} style={s.listItem}>
                  <Text style={s.listDate}>{a.date}</Text> {a.name}
                </Text>
              ))}
            </View>
          )}
          {data.education.length > 0 && (
            <View style={s.col}>
              <Text style={[s.sectionTitle, { marginTop: 0 }]}>
                Education
              </Text>
              {data.education.map((e, i) => (
                <Text key={i} style={s.listItem}>
                  <Text style={s.listDate}>{e.period}</Text> {e.name}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

export async function generatePortfolioPdf(
  data: PortfolioData,
  locale: string
) {
  const blob = await pdf(
    <PortfolioPdfDocument data={data} locale={locale} />
  ).toBlob()

  const date = new Date().toISOString().slice(0, 10)
  const filename = `portfolio-${locale}-${date}.pdf`

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
