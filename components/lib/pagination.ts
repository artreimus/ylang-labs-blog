export const BLOGS_PER_PAGE = 10
export const PROJECTS_PER_PAGE = 6

export function getValidPageNumber(page: string, totalPages: number) {
  if (!/^[1-9]\d*$/.test(page)) return null

  const pageNumber = Number(page)
  if (!Number.isSafeInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return null
  }

  return pageNumber
}

export function getPaginatedStaticParams(
  totalPages: number,
  { includeFirstPage = false }: { includeFirstPage?: boolean } = {}
) {
  const firstPage = includeFirstPage ? 1 : 2
  return Array.from({ length: Math.max(totalPages - firstPage + 1, 0) }, (_, index) => ({
    page: String(index + firstPage),
  }))
}
