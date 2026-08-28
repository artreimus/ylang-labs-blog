'use client'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-400">
            Ylang Labs
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">The site could not be loaded.</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Try once more. No error details or submitted information have been displayed.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 dark:focus-visible:ring-primary-300 dark:focus-visible:ring-offset-gray-950"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
