'use client'
import { Logomark } from './Logo'
import { useTheme } from 'next-themes'
import { featureFlags } from '@/lib/featureFlags'

export function Hero() {
  const { theme } = useTheme()
  return (
    <div className="mt-[-4.75rem] max-w-8xl overflow-hidden border-b border-gray-200 bg-transparent pt-[4.75rem] dark:border-zinc-800">
      <div className="pb-16 pt-8 sm:px-2 lg:relative lg:px-0">
        <div className="max-w-2xl">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              {featureFlags.showLogo && (
                <Logomark
                  fill={theme == 'dark' ? 'white' : 'dark'}
                  className="mb-4 w-10"
                />
              )}
              <p className="inline font-display text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Replay documentation
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-zinc-400">
                Learn to record your first replay, inspect your app with Replay
                DevTools, and drive your test flakes to zero.
              </p>
              <p className="mt-8">
                <a
                  href="/basics/getting-started/record-your-app"
                  className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  Get started with our Quickstart Guide
                </a>
              </p>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            {/* <HeroBackground className="absolute -left-[32%] -top-[45%] " /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
