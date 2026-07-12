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

export function getPaginatedStaticParams(totalPages: number) {
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }))
}
