export function getValidPageNumber(page: string, totalPages: number) {
  if (!/^[1-9]\d*$/.test(page)) return null

  const pageNumber = Number(page)
  if (!Number.isSafeInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    return null
  }

  return pageNumber
}
