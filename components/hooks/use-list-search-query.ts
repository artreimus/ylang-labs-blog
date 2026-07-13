'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SEARCH_QUERY_KEY = 'q'
const DEFAULT_DEBOUNCE_MS = 250

interface UseListSearchQueryOptions {
  rootPath: '/blogs' | '/projects'
  debounceMs?: number
}

function normalizeSearchQuery(value: string) {
  return value.trim()
}

export function useListSearchQuery({
  rootPath,
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: UseListSearchQueryOptions) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlSearchValue = searchParams.get(SEARCH_QUERY_KEY) ?? ''
  const [searchValue, setSearchValue] = useState(urlSearchValue)

  // The URL is the source of truth for navigation. This keeps the controlled
  // field in sync when the user reloads or moves through browser history.
  useEffect(() => {
    setSearchValue(urlSearchValue)
  }, [urlSearchValue])

  useEffect(() => {
    const normalizedValue = normalizeSearchQuery(searchValue)
    const normalizedUrlValue = normalizeSearchQuery(urlSearchValue)

    const isCanonicalUrlValue = urlSearchValue === normalizedUrlValue

    if (normalizedValue === normalizedUrlValue && pathname === rootPath && isCanonicalUrlValue) {
      return
    }

    // Do not rewrite a direct paginated URL until the user actually searches.
    if (!normalizedValue && !normalizedUrlValue && !urlSearchValue) {
      return
    }

    const timeout = window.setTimeout(() => {
      const nextSearchParams = new URLSearchParams(searchParams.toString())

      if (normalizedValue) {
        nextSearchParams.set(SEARCH_QUERY_KEY, normalizedValue)
      } else {
        nextSearchParams.delete(SEARCH_QUERY_KEY)
      }

      const queryString = nextSearchParams.toString()
      router.replace(queryString ? `${rootPath}?${queryString}` : rootPath, { scroll: false })
    }, debounceMs)

    return () => window.clearTimeout(timeout)
  }, [debounceMs, pathname, rootPath, router, searchParams, searchValue, urlSearchValue])

  return {
    searchValue,
    normalizedSearchValue: normalizeSearchQuery(searchValue),
    setSearchValue,
  }
}
