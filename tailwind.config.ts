import typographyPlugin from '@tailwindcss/typography'
import formsPlugin from '@tailwindcss/forms'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import { type Config } from 'tailwindcss'

// Shared with replay dashboard — keep in sync with /dashboard/tailwind.config.js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const dashboard = require('./tailwind.dashboard.config.cjs') as Config

const dashboardExtend = dashboard.theme?.extend ?? {}

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],
  theme: {
    container: dashboard.theme?.container,
    extend: {
      ...dashboardExtend,
      fontFamily: {
        sans: 'var(--font-inter)',
        display: ['var(--font-lexend)', { fontFeatureSettings: '"ss01"' }],
        handdrawn: 'var(--font-virgil)',
      },
      maxWidth: {
        ...('maxWidth' in dashboardExtend
          ? (dashboardExtend as { maxWidth: Record<string, string> }).maxWidth
          : {}),
        '8xl': '88rem',
        '90vw': '90vw',
      },
      boxShadow: {
        ...('boxShadow' in dashboardExtend
          ? (dashboardExtend as { boxShadow: Record<string, string> }).boxShadow
          : {}),
        'nav-active': '0px 0px 5px 1px rgba(17,147,230,1)',
        ripple: `0px 0px 0px 10px rgba(255,255,255,0.1), 0px 0px 0px 20px rgba(255,255,255,0.1), 0px 0px 0px 30px rgba(255,255,255,0.1)`,
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin, containerQueriesPlugin],
} satisfies Config
