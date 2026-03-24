import Link from 'next/link'
import { CardAttributes } from './Card'
import { Icon } from './Icon'

/** Compact list-style card aligned with dashboard resource rows. */
export default function MiniCard({
  title,
  content,
  icon,
  href,
}: CardAttributes) {
  return (
    <Link href={href} className="block w-full min-w-0">
      <div className="flex h-full items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-800">
          <Icon
            icon={icon}
            className="h-5 w-5 text-gray-600 dark:text-zinc-400"
          />
        </div>
        <div className="min-w-0 flex-1 py-0.5">
          <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-zinc-400">
            {content}
          </p>
        </div>
      </div>
    </Link>
  )
}
