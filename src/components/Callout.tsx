import clsx from 'clsx'

import { Icon } from '@/components/Icon'
import Link from 'next/link'

/** Body copy + inline links/code aligned with main Prose hierarchy (neutral + primary links). */
const neutralCalloutBody =
  'text-gray-700 [--tw-prose-background:theme(colors.gray.50)] prose-a:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:opacity-90 prose-code:font-medium prose-code:text-gray-900 dark:text-gray-300 dark:prose-code:text-gray-200'

const styles = {
  note: {
    container:
      'bg-gray-50 dark:bg-gray-800/60 dark:ring-1 dark:ring-gray-300/10',
    title: 'text-gray-900 dark:text-white',
    body: neutralCalloutBody,
  },
  link: {
    container:
      'bg-gray-50 dark:bg-gray-800/60 dark:ring-1 dark:ring-gray-300/10',
    title: 'text-gray-900 dark:text-white',
    body: neutralCalloutBody,
  },
  replay: {
    container:
      'bg-gray-50 dark:bg-gray-800/60 dark:ring-1 dark:ring-gray-300/10',
    title: 'text-gray-900 dark:text-white',
    body: neutralCalloutBody,
  },
  warning: {
    container:
      'bg-amber-50 dark:bg-gray-800/60 dark:ring-1 dark:ring-gray-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 [--tw-prose-underline:theme(colors.amber.400)] [--tw-prose-background:theme(colors.amber.50)] prose-a:font-bold prose-a:text-amber-900 prose-a:no-underline prose-code:font-medium prose-code:text-amber-900 dark:text-gray-300 dark:[--tw-prose-underline:theme(colors.amber-600)] dark:prose-code:text-gray-200',
  },
}

const icons = {
  note: (props: { className?: string }) => <Icon icon="lightbulb" {...props} />,
  link: (props: { className?: string }) => <Icon icon="link" {...props} />,
  warning: (props: { className?: string }) => (
    <Icon icon="warning" color="amber" {...props} />
  ),
  replay: (props: { className?: string }) => <Icon icon="replay" {...props} />,
  none: '',
}

export function Callout({
  title,
  children,
  type = 'note',
  showIcon = true,
  href,
}: {
  title: string
  children: React.ReactNode
  type?: keyof typeof styles
  showIcon?: boolean
  href?: string
}) {
  let IconComponent = icons[type]

  const getTitleComponent = () =>
    href ? (
      <Link
        href={href}
        className={clsx(
          'm-0 font-display text-base font-semibold tracking-tight',
          styles[type].title,
        )}
      >
        {title}
      </Link>
    ) : (
      title && (
        <p
          className={clsx(
            'm-0 font-display text-base font-semibold tracking-tight',
            styles[type].title,
          )}
        >
          {title}
        </p>
      )
    )

  return (
    <div
      className={clsx(
        'callout my-8 flex rounded-2xl p-5 sm:p-6',
        styles[type].container,
      )}
    >
      {showIcon && <IconComponent className="h-6 w-6 flex-none" />}
      <div className="ml-4 flex-auto">
        {title && getTitleComponent()}
        <div className={clsx('prose prose-sm max-w-none', styles[type].body)}>
          {children}
        </div>
      </div>
    </div>
  )
}
