import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

import '@/styles/tailwind.css'
import Analytics from '@/components/Analytics'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

const virgil = localFont({
  src: '../fonts/Virgil.woff2',
  display: 'swap',
  variable: '--font-virgil',
})

const ogImage = '/images/og-image.png'
export const metadata: Metadata = {
  title: {
    template: '%s - Docs',
    default: 'Replay docs',
  },
  description:
    'Replay is the first deterministic browser. Once a bug or flaky test is captured, anyone can inspect it with Browser DevTools without having to replicate it locally.',
  openGraph: {
    title: 'Replay - Browser DevTools from the future.',
    description:
      'Investigate bugs and flaky tests with perfect reproducibility.',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    site: '@replayio',
    title: 'Replay - Browser DevTools from the future.',
    description:
      'Investigate bugs and flaky tests with perfect reproducibility.',
    creator: '@replayio',
    images: [{ url: ogImage, width: 1200, height: 630 }],
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
      className={clsx(
        'h-full antialiased',
        inter.variable,
        lexend.variable,
        virgil.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <Analytics />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-244NMJ9B93');
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-244NMJ9B93"
          strategy="afterInteractive"
        />
        <Script
          id="apollo-website-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){
                var n = Math.random().toString(36).substring(7);
                var o = document.createElement("script");
                o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
                o.async = true;
                o.defer = true;
                o.onload = function(){
                  window.trackingFunctions.onLoad({appId: "69987d99eda3b200117689e4"});
                };
                document.head.appendChild(o);
              }
              initApollo();
            `.trim(),
          }}
        />
      </head>
      <body className="flex min-h-full bg-white dark:bg-gray-900">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <VercelAnalytics />
      </body>
    </html>
  )
}
