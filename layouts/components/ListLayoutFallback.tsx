export default function ListLayoutFallback({ label }: { label: string }) {
  return (
    <div
      role="status"
      className="mx-auto flex min-h-[40vh] w-full max-w-5xl items-center justify-center px-4 py-16 text-sm text-gray-600 dark:text-gray-300"
    >
      {label}
    </div>
  )
}
