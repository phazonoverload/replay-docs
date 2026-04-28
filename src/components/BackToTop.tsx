import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M8 12.5V3.5" />
    <path d="M3.5 8L8 3.5L12.5 8" />
  </svg>
)

const BackToTop = () => {
  const [showGoTop, setShowGoTop] = useState(false)

  useEffect(() => {
    const handleVisibleButton = () => {
      setShowGoTop(window.scrollY > 50)
    }
    handleVisibleButton()
    window.addEventListener('scroll', handleVisibleButton, { passive: true })
    return () => window.removeEventListener('scroll', handleVisibleButton)
  }, [])

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={clsx(
        'mt-6 transition-opacity duration-200',
        showGoTop ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <button
        type="button"
        onClick={handleScrollUp}
        className="group inline-flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-3 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-zinc-200 dark:hover:text-white"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-gray-700 transition-colors group-hover:bg-gray-200 group-hover:text-gray-900 dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:bg-zinc-700 dark:group-hover:text-white">
          <ArrowUpIcon className="h-3.5 w-3.5" />
        </span>
        Back to top
      </button>
    </div>
  )
}

export default BackToTop
