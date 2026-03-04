import { ThemeProvider } from 'app/components/theme-provider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <main className="flex-auto min-w-0 h-full flex flex-col px-2 md:px-0">
        {children}
      </main>
    </ThemeProvider>
  )
}
