'use client'

import { Fragment, useState } from 'react'
import { Highlight } from 'prism-react-renderer'
import { sortHighlights } from '@/lib/highlights'
import clsx from 'clsx'
import { Icon } from './Icon'

const CopyButton = ({
  children,
  className,
}: {
  children: string
  className?: string
}) => {
  const [isCopied, setIsCopied] = useState(false)
  return !isCopied ? (
    <Icon
      className={clsx(
        className,
        'absolute right-4 top-4 h-4 w-4 cursor-pointer rounded bg-gray-900/80 text-white text-opacity-40 hover:text-opacity-100 dark:bg-zinc-900/80',
      )}
      icon="clipboard"
      onClick={() => {
        navigator.clipboard.writeText(children)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 4000)
      }}
    />
  ) : (
    <span className="absolute right-4 top-3">Copied!</span>
  )
}

export function Fence({
  children,
  language,
  lineNumbers,
  fileName,
  highlight,
}: {
  children: string
  language: string
  lineNumbers: boolean
  fileName: string
  highlight: string[]
}) {
  const highlightedLines = sortHighlights(highlight)
  language === 'sh' ? (fileName = 'Terminal') : null
  const isPlainText = language === 'text'
  return (
    <Highlight
      code={children.trimEnd()}
      language={language}
      theme={{ plain: {}, styles: [] }}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre
          className={clsx(
            className,
            'relative mt-0',
            isPlainText && 'overflow-x-hidden whitespace-pre-wrap break-words',
          )}
          style={style}
        >
          <CopyButton>{children}</CopyButton>
          {fileName && (
            <div className="mb-2 border-b border-white border-opacity-20 pb-3 pr-4 text-xs text-white text-opacity-80">
              <span className="inline">
                <Icon
                  icon={language === 'sh' ? 'terminal' : 'file'}
                  className="mr-1.5 inline h-4 w-4"
                />
                {fileName}
              </span>
            </div>
          )}
          <code>
            {tokens.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                <div
                  className={clsx(
                    highlightedLines.includes(lineIndex + 1) &&
                      'bg-gray-400 bg-opacity-15',
                    'px-3',
                    isPlainText && 'pr-10',
                  )}
                >
                  <>
                    {lineNumbers && (
                      <span className="select-none pr-4 text-white text-opacity-30">
                        {(lineIndex + 1).toString().padStart(2, ' ')}
                      </span>
                    )}
                    {line
                      .filter((token) => !token.empty)
                      .map((token, tokenIndex) => (
                        <span key={tokenIndex} {...getTokenProps({ token })} />
                      ))}
                    {'\n'}
                  </>
                </div>
              </Fragment>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
