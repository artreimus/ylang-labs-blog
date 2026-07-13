'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Route rendering failed', { digest: error.digest })
  }, [error])

  return (
    <section className="mx-auto max-w-xl py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-400">
        Something went wrong
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
        This page could not be loaded.
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Try the request again. If the problem continues, return to the homepage.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 dark:hover:bg-primary-400 dark:focus-visible:ring-primary-300 dark:focus-visible:ring-offset-gray-950"
      >
        Try again
      </button>
    </section>
  )
}
