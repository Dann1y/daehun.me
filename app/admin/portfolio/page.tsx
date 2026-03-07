'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { PortfolioData, ExperienceData, RoleData, ProjectData } from 'app/portfolio/data'

type Tab = 'ko' | 'en'

export default function AdminPortfolioPage() {
  const [tab, setTab] = useState<Tab>('ko')
  const [data, setData] = useState<PortfolioData | null>(null)
  const [saving, setSaving] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const fetchData = useCallback(async (locale: Tab) => {
    try {
      const res = await fetch(`/api/admin/portfolio?locale=${locale}`)
      if (res.ok) {
        const json = await res.json()
        // Migrate old ExperienceData[] projects to simple format
        if (json.projects?.length && 'roles' in json.projects[0]) {
          json.projects = []
        }
        setData(json)
      }
    } catch {
      // keep existing data
    }
  }, [])

  useEffect(() => {
    fetchData(tab)
  }, [tab, fetchData])

  async function handleSave() {
    if (!data) return
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch(`/api/admin/portfolio?locale=${tab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      if (res.ok) {
        setMessage('Saved!')
      } else {
        const body = await res.json().catch(() => null)
        setMessage(`Save failed: ${body?.error ?? res.status}`)
      }
    } catch {
      setMessage('Network error')
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(''), 2000)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  async function handleExportPdf() {
    if (!data) return
    setGenerating(true)
    try {
      const { generatePortfolioPdf } = await import('./portfolio-pdf')
      await generatePortfolioPdf(data, tab)
    } catch (err) {
      console.error('PDF generation error:', err)
      setMessage('PDF generation failed')
      setTimeout(() => setMessage(''), 2000)
    } finally {
      setGenerating(false)
    }
  }

  if (!data) return <div className="p-8 text-sm">Loading...</div>

  return (
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">
          Portfolio Editor
        </h1>
        <button
          onClick={handleLogout}
          className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(['ko', 'en'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              tab === t
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                : 'bg-neutral-100 dark:bg-neutral-800'
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Intro */}
      <Section title="Intro">
        <Field
          label="Name"
          value={data.intro.name}
          onChange={(v) =>
            setData({ ...data, intro: { ...data.intro, name: v } })
          }
        />
        <Field
          label="Title"
          value={data.intro.title}
          onChange={(v) =>
            setData({ ...data, intro: { ...data.intro, title: v } })
          }
        />
        <label className="block text-xs font-medium text-neutral-500 mb-1">
          Description
        </label>
        {data.intro.description.map((line, i) => (
          <TextArea
            key={i}
            value={line}
            onChange={(v) => {
              const desc = [...data.intro.description]
              desc[i] = v
              setData({ ...data, intro: { ...data.intro, description: desc } })
            }}
            onRemove={() => {
              const desc = data.intro.description.filter((_, j) => j !== i)
              setData({ ...data, intro: { ...data.intro, description: desc } })
            }}
          />
        ))}
        <AddButton
          onClick={() =>
            setData({
              ...data,
              intro: {
                ...data.intro,
                description: [...data.intro.description, ''],
              },
            })
          }
        />
        <label className="block text-xs font-medium text-neutral-500 mt-3 mb-1">
          Links
        </label>
        {data.intro.links.map((link, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              className={inputClass}
              placeholder="Label"
              value={link.label}
              onChange={(e) => {
                const links = [...data.intro.links]
                links[i] = { ...links[i], label: e.target.value }
                setData({ ...data, intro: { ...data.intro, links } })
              }}
            />
            <input
              className={inputClass}
              placeholder="URL"
              value={link.url}
              onChange={(e) => {
                const links = [...data.intro.links]
                links[i] = { ...links[i], url: e.target.value }
                setData({ ...data, intro: { ...data.intro, links } })
              }}
            />
            <RemoveButton
              onClick={() => {
                const links = data.intro.links.filter((_, j) => j !== i)
                setData({ ...data, intro: { ...data.intro, links } })
              }}
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            setData({
              ...data,
              intro: {
                ...data.intro,
                links: [...data.intro.links, { label: '', url: '' }],
              },
            })
          }
        />
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {(data.projects ?? []).map((p, i) => (
          <div key={i} className="flex gap-2 mb-2 items-start">
            <div className="flex-1 space-y-2">
              <Field
                label="Name"
                value={p.name}
                onChange={(v) => {
                  const projects = [...(data.projects ?? [])]
                  projects[i] = { ...p, name: v }
                  setData({ ...data, projects })
                }}
              />
              <Field
                label="Description"
                value={p.description}
                onChange={(v) => {
                  const projects = [...(data.projects ?? [])]
                  projects[i] = { ...p, description: v }
                  setData({ ...data, projects })
                }}
              />
              <Field
                label="Period"
                value={p.period ?? ''}
                onChange={(v) => {
                  const projects = [...(data.projects ?? [])]
                  projects[i] = { ...p, period: v }
                  setData({ ...data, projects })
                }}
              />
              <Field
                label="URL"
                value={p.url ?? ''}
                onChange={(v) => {
                  const projects = [...(data.projects ?? [])]
                  projects[i] = { ...p, url: v }
                  setData({ ...data, projects })
                }}
              />
            </div>
            <RemoveButton
              onClick={() =>
                setData({
                  ...data,
                  projects: (data.projects ?? []).filter((_, j) => j !== i),
                })
              }
            />
          </div>
        ))}
        <AddButton
          label="Add Project"
          onClick={() =>
            setData({
              ...data,
              projects: [
                ...(data.projects ?? []),
                { name: '', description: '', period: '' },
              ],
            })
          }
        />
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {data.experience.map((exp, ei) => (
          <div
            key={ei}
            className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 space-y-2">
                <Field
                  label="Company"
                  value={exp.company}
                  onChange={(v) => updateExperience(ei, { ...exp, company: v })}
                />
                <Field
                  label="Description"
                  value={exp.description}
                  onChange={(v) =>
                    updateExperience(ei, { ...exp, description: v })
                  }
                />
                <Field
                  label="Duration"
                  value={exp.duration ?? ''}
                  onChange={(v) =>
                    updateExperience(ei, { ...exp, duration: v })
                  }
                />
                <Field
                  label="URL"
                  value={exp.url ?? ''}
                  onChange={(v) =>
                    updateExperience(ei, { ...exp, url: v })
                  }
                />
              </div>
              <RemoveButton
                onClick={() =>
                  setData({
                    ...data,
                    experience: data.experience.filter((_, j) => j !== ei),
                  })
                }
              />
            </div>

            {exp.roles.map((role, ri) => (
              <div key={ri} className="ml-4 mb-4 border-l-2 border-neutral-200 dark:border-neutral-700 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 space-y-2">
                    <Field
                      label="Role Title"
                      value={role.title}
                      onChange={(v) =>
                        updateRole(ei, ri, { ...role, title: v })
                      }
                    />
                    <Field
                      label="Period"
                      value={role.period}
                      onChange={(v) =>
                        updateRole(ei, ri, { ...role, period: v })
                      }
                    />
                  </div>
                  <RemoveButton
                    onClick={() => {
                      const roles = exp.roles.filter((_, j) => j !== ri)
                      updateExperience(ei, { ...exp, roles })
                    }}
                  />
                </div>

                {role.projects.map((project, pi) => (
                  <div
                    key={pi}
                    className="ml-4 mb-2 p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 space-y-2">
                        <Field
                          label="Project Name"
                          value={project.name}
                          onChange={(v) =>
                            updateProject(ei, ri, pi, { ...project, name: v })
                          }
                        />
                        <Field
                          label="Period"
                          value={project.period ?? ''}
                          onChange={(v) =>
                            updateProject(ei, ri, pi, {
                              ...project,
                              period: v,
                            })
                          }
                        />
                        <Field
                          label="Description"
                          value={project.description}
                          onChange={(v) =>
                            updateProject(ei, ri, pi, {
                              ...project,
                              description: v,
                            })
                          }
                        />
                        <Field
                          label="URL"
                          value={project.url ?? ''}
                          onChange={(v) =>
                            updateProject(ei, ri, pi, {
                              ...project,
                              url: v,
                            })
                          }
                        />
                      </div>
                      <RemoveButton
                        onClick={() => {
                          const projects = role.projects.filter(
                            (_, j) => j !== pi
                          )
                          updateRole(ei, ri, { ...role, projects })
                        }}
                      />
                    </div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1">
                      Achievements
                    </label>
                    {project.achievements.map((ach, ai) => (
                      <div key={ai} className="flex gap-2 mb-1">
                        <input
                          className={inputClass}
                          value={ach}
                          onChange={(e) => {
                            const achievements = [...project.achievements]
                            achievements[ai] = e.target.value
                            updateProject(ei, ri, pi, {
                              ...project,
                              achievements,
                            })
                          }}
                        />
                        <RemoveButton
                          onClick={() => {
                            const achievements = project.achievements.filter(
                              (_, j) => j !== ai
                            )
                            updateProject(ei, ri, pi, {
                              ...project,
                              achievements,
                            })
                          }}
                        />
                      </div>
                    ))}
                    <AddButton
                      onClick={() =>
                        updateProject(ei, ri, pi, {
                          ...project,
                          achievements: [...project.achievements, ''],
                        })
                      }
                    />
                  </div>
                ))}
                <AddButton
                  label="Add Project"
                  onClick={() => {
                    const projects = [
                      ...role.projects,
                      { name: '', period: '', description: '', achievements: [] },
                    ]
                    updateRole(ei, ri, { ...role, projects })
                  }}
                />
              </div>
            ))}
            <AddButton
              label="Add Role"
              onClick={() => {
                const roles = [
                  ...exp.roles,
                  { title: '', period: '', projects: [] },
                ]
                updateExperience(ei, { ...exp, roles })
              }}
            />
          </div>
        ))}
        <AddButton
          label="Add Company"
          onClick={() =>
            setData({
              ...data,
              experience: [
                ...data.experience,
                { company: '', description: '', roles: [] },
              ],
            })
          }
        />
      </Section>

      {/* Open Source */}
      <Section title="Open Source">
        {data.opensource.map((os, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className={inputClass}
              placeholder="Name"
              value={os.name}
              onChange={(e) => {
                const opensource = [...data.opensource]
                opensource[i] = { ...os, name: e.target.value }
                setData({ ...data, opensource })
              }}
            />
            <input
              className={inputClass}
              placeholder="Description"
              value={os.description}
              onChange={(e) => {
                const opensource = [...data.opensource]
                opensource[i] = { ...os, description: e.target.value }
                setData({ ...data, opensource })
              }}
            />
            <RemoveButton
              onClick={() =>
                setData({
                  ...data,
                  opensource: data.opensource.filter((_, j) => j !== i),
                })
              }
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            setData({
              ...data,
              opensource: [...data.opensource, { name: '', description: '' }],
            })
          }
        />
      </Section>

      {/* Activities */}
      <Section title="Activities">
        {data.activities.map((a, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className={inputClass}
              placeholder="Name"
              value={a.name}
              onChange={(e) => {
                const activities = [...data.activities]
                activities[i] = { ...a, name: e.target.value }
                setData({ ...data, activities })
              }}
            />
            <input
              className={`${inputClass} w-24 shrink-0`}
              placeholder="Date"
              value={a.date}
              onChange={(e) => {
                const activities = [...data.activities]
                activities[i] = { ...a, date: e.target.value }
                setData({ ...data, activities })
              }}
            />
            <RemoveButton
              onClick={() =>
                setData({
                  ...data,
                  activities: data.activities.filter((_, j) => j !== i),
                })
              }
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            setData({
              ...data,
              activities: [...data.activities, { name: '', date: '' }],
            })
          }
        />
      </Section>

      {/* Education */}
      <Section title="Education">
        {data.education.map((e, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className={inputClass}
              placeholder="Name"
              value={e.name}
              onChange={(ev) => {
                const education = [...data.education]
                education[i] = { ...e, name: ev.target.value }
                setData({ ...data, education })
              }}
            />
            <input
              className={`${inputClass} w-40 shrink-0`}
              placeholder="Period"
              value={e.period}
              onChange={(ev) => {
                const education = [...data.education]
                education[i] = { ...e, period: ev.target.value }
                setData({ ...data, education })
              }}
            />
            <RemoveButton
              onClick={() =>
                setData({
                  ...data,
                  education: data.education.filter((_, j) => j !== i),
                })
              }
            />
          </div>
        ))}
        <AddButton
          onClick={() =>
            setData({
              ...data,
              education: [...data.education, { name: '', period: '' }],
            })
          }
        />
      </Section>

      {/* Save */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={handleExportPdf}
          disabled={generating}
          className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Export PDF'}
        </button>
        {message && (
          <span className="text-sm text-neutral-500">{message}</span>
        )}
      </div>
    </div>
  )

  function updateExperience(idx: number, exp: ExperienceData) {
    const experience = [...data!.experience]
    experience[idx] = exp
    setData({ ...data!, experience })
  }

  function updateRole(ei: number, ri: number, role: RoleData) {
    const experience = [...data!.experience]
    const roles = [...experience[ei].roles]
    roles[ri] = role
    experience[ei] = { ...experience[ei], roles }
    setData({ ...data!, experience })
  }

  function updateProject(ei: number, ri: number, pi: number, project: ProjectData) {
    const experience = [...data!.experience]
    const roles = [...experience[ei].roles]
    const projects = [...roles[ri].projects]
    projects[pi] = project
    roles[ri] = { ...roles[ri], projects }
    experience[ei] = { ...experience[ei], roles }
    setData({ ...data!, experience })
  }

}

const inputClass =
  'flex-1 px-2 py-1.5 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-400'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-500 mb-1">
        {label}
      </label>
      <input
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function TextArea({
  value,
  onChange,
  onRemove,
}: {
  value: string
  onChange: (v: string) => void
  onRemove: () => void
}) {
  return (
    <div className="flex gap-2 mb-1">
      <textarea
        className={`${inputClass} min-h-[60px]`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <RemoveButton onClick={onRemove} />
    </div>
  )
}

function AddButton({
  onClick,
  label = 'Add',
}: {
  onClick: () => void
  label?: string
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 mt-1"
    >
      + {label}
    </button>
  )
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-neutral-400 hover:text-red-500 text-sm shrink-0 px-1"
    >
      ×
    </button>
  )
}
