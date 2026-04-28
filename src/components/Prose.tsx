import clsx from 'clsx'

export function Prose<T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: React.ComponentPropsWithoutRef<T> & {
  as?: T
}) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'prose prose-gray dark:prose-invert dark:text-zinc-300',
        // headings — semibold + tight tracking (matches marketing site feel)
        'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight lg:prose-headings:scroll-mt-[8.5rem]',
        // lead
        'prose-lead:text-gray-600 dark:prose-lead:text-zinc-400',
        // links — bold primary token, no sky / underline accent
        'prose-a:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:opacity-90',
        // pre
        'prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:shadow-lg dark:prose-pre:bg-zinc-900 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-white/5',
        // hr
        'prose-hr:border-gray-200 dark:prose-hr:border-zinc-800',
        // max-width
        'max-w-90vw sm:max-w-none',
      )}
      {...props}
    />
  )
}
