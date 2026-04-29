import Card, { CardAttributes } from '@/components/Card'
import MiniCard from '@/components/MiniCard'
import { Hero } from '@/components/Hero'
import Link from 'next/link'

/** Primary paths: CI/CD (Playwright, Cypress, GitHub, dashboards), then MCP, then Chrome. */
const cards: CardAttributes[] = [
  {
    icon: 'playwrightsimple',
    title: 'Playwright in CI',
    content:
      'Run tests in Replay Browser and upload recordings from GitHub Actions—or wire up other CI providers.',
    href: '/basics/getting-started/record-your-playwright-tests/github-actions',
  },
  {
    icon: 'cypresssimple',
    title: 'Cypress in CI',
    content:
      'Same story for Cypress: record failures in CI, debug flakiness without endless re-runs.',
    href: '/basics/getting-started/record-your-cypress-tests/github-actions',
  },
  {
    icon: 'analytics',
    title: 'Test suite dashboard',
    content:
      'Recent runs, top failing and flaky tests, and PR comments—visibility across your pipeline.',
    href: '/basics/test-suites/overview',
  },
  {
    icon: 'link',
    title: 'Replay MCP',
    content:
      'Connect recordings to Cursor, Claude Code, and other MCP clients so agents can inspect real runtime.',
    href: '/basics/replay-mcp/overview',
  },
  {
    icon: 'replay',
    title: 'Replay Chrome extension',
    content:
      'One-click recording from the browser when you are not driving everything from CI.',
    href: '/basics/replay-chrome-extension/getting-started',
  },
  {
    icon: 'uploadicon',
    title: 'Other CI providers',
    content:
      'Not on GitHub Actions? Adapt the same install, env, and upload flow to your stack.',
    href: '/basics/getting-started/record-your-playwright-tests/other-ci-providers',
  },
]

const miniCards: CardAttributes[] = [
  {
    icon: 'playwrightsimple',
    title: 'Playwright guide',
    content: 'Full setup: Replay browser, reporter, debugging, and FAQs.',
    href: '/basics/getting-started/record-your-playwright-tests',
  },
  {
    icon: 'cypresssimple',
    title: 'Cypress guide',
    content: 'Install the plugin, record runs, and troubleshoot common issues.',
    href: '/basics/getting-started/record-your-cypress-tests',
  },
  {
    icon: 'pullrequest',
    title: 'PR comments',
    content: 'Root cause and context on the pull request when tests fail.',
    href: '/basics/test-suites/pr-comments',
  },
  {
    icon: 'analytics',
    title: 'Top failing & flaky tests',
    content:
      'Prioritize what breaks most often so agents and humans fix the right things.',
    href: '/basics/test-suites/top-failing-and-flaky-tests',
  },
  {
    icon: 'link',
    title: 'MCP quickstart',
    content: 'Wire the server into your editor and start querying recordings.',
    href: '/basics/replay-mcp/quickstart',
  },
  {
    icon: 'inspect',
    title: 'Replay DevTools overview',
    content:
      'Time-travel panels for console, network, sources—still the foundation under CI and MCP.',
    href: '/basics/replay-devtools/overview',
  },
]

export default function Page() {
  return (
    <div
      data-test-id="page"
      className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 lg:px-8"
    >
      <Hero />
      <h2 className="py-8 text-2xl font-semibold text-gray-900 dark:text-white">
        Tool setup guides
      </h2>
      <div className="grid grid-cols-1 gap-4 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, content, icon, title }) => (
          <Card
            key={href}
            title={title}
            content={content}
            icon={icon}
            href={href}
          />
        ))}
      </div>
      <h2 className="pb-8 text-2xl font-semibold">Learn the basics</h2>
      <div className="grid place-items-stretch gap-4 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {miniCards.map(({ href, content, icon, title }) => (
          <MiniCard
            key={href}
            title={title}
            content={content}
            icon={icon}
            href={href}
          />
        ))}
      </div>

      <p className="pb-12 text-center text-sm text-gray-500 dark:text-zinc-500">
        Curious how time travel fits in?{' '}
        <Link
          href="/basics/time-travel/why-time-travel"
          className="font-medium text-gray-900 underline decoration-gray-400 underline-offset-2 hover:decoration-gray-600 dark:text-zinc-200 dark:decoration-zinc-600 dark:hover:decoration-zinc-400"
        >
          Why time travel?
        </Link>
      </p>
    </div>
  )
}
