'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import BackToTop from './BackToTop'
import { useParams } from 'next/navigation'

type Subsection = {
  id: string
  title: string
}

type Section = {
  id: string
  title: string
  children: Subsection[]
}

export function TableOfContents() {
  const params = useParams()
  let [tableOfContents, setTableOfContents] = useState<Section[]>([])
  let [currentSection, setCurrentSection] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const headings = article.querySelectorAll('h2[id], h3[id]')
    const sections: Section[] = []

    headings.forEach((heading) => {
      const id = heading.id
      const title = heading.textContent || ''
      const level = heading.tagName.toLowerCase()

      if (level === 'h2') {
        sections.push({ id, title, children: [] })
      } else if (level === 'h3' && sections.length > 0) {
        sections[sections.length - 1].children.push({ id, title })
      }
    })

    setTableOfContents(sections)
    if (sections.length > 0) {
      const hash = window.location.hash.replace('#', '')
      setCurrentSection(hash || sections[0].id)
    }
  }, [params])

  let getHeadings = useCallback((tableOfContents: Section[]) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return null

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
      .filter((x): x is { id: string; top: number } => x !== null)
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return

    const headings = getHeadings(tableOfContents)
    if (headings.length === 0) return
    let ignoreScrollUpdate = false

    function findRightSection() {
      if (ignoreScrollUpdate) {
        ignoreScrollUpdate = false
        return
      }
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top - 10) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }

    window.addEventListener('scroll', findRightSection, { passive: true })
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setCurrentSection(hash)
      ignoreScrollUpdate = true
    }

    return () => {
      window.removeEventListener('scroll', findRightSection)
    }
  }, [getHeadings, tableOfContents, params])

  function isActive(section: Section | Subsection) {
    if (section.id === currentSection) {
      return true
    }
    if (!('children' in section) || !section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <div
      data-testid="table-of-contents"
      className="hidden py-8 xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6"
    >
      <nav aria-labelledby="on-this-page-title" className="w-60">
        {tableOfContents.length > 0 && (
          <>
            <h2
              id="on-this-page-title"
              className="mb-3 pl-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-zinc-500"
            >
              On this page
            </h2>
            {/* Vertical rail behind every entry — active entries paint a
                primary-colored 2px segment over the rail, giving readers a
                clear sense of where they are on the page. */}
            <ol
              role="list"
              className="border-l border-gray-200 text-sm dark:border-zinc-800"
            >
              {tableOfContents.map((section) => (
                <li key={section.id}>
                  <h3 className="m-0">
                    <Link
                      href={`#${section.id}`}
                      className={clsx(
                        '-ml-px block border-l-2 py-1.5 pl-4 leading-snug transition-colors',
                        isActive(section)
                          ? 'border-primary font-semibold text-primary'
                          : 'border-transparent font-normal text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100',
                      )}
                    >
                      {section.title}
                    </Link>
                  </h3>
                  {section.children.length > 0 && (
                    <ol role="list" className="text-[0.8125rem]">
                      {section.children.map((subSection) => (
                        <li key={subSection.id}>
                          <Link
                            href={`#${subSection.id}`}
                            className={clsx(
                              '-ml-px block border-l-2 py-1 pl-7 leading-snug transition-colors',
                              isActive(subSection)
                                ? 'border-primary font-medium text-primary'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:text-zinc-100',
                            )}
                          >
                            {subSection.title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </>
        )}
      </nav>
      <BackToTop />
    </div>
  )
}
