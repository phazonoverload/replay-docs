'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { useEffect } from 'react'

/** Keeps `data-theme` in sync with Tailwind `darkMode: ['class', '[data-theme="dark"]']`. */
function DataThemeSync({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  useEffect(() => {
    if (!resolvedTheme) return
    document.documentElement.setAttribute('data-theme', resolvedTheme)
  }, [resolvedTheme])
  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange enableSystem>
      <DataThemeSync>{children}</DataThemeSync>
    </ThemeProvider>
  )
}
