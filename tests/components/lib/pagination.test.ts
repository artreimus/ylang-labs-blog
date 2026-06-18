import { getValidPageNumber } from '@/components/lib/pagination'

describe('getValidPageNumber', () => {
  it('accepts pages inside the available range', () => {
    expect(getValidPageNumber('1', 3)).toBe(1)
    expect(getValidPageNumber('3', 3)).toBe(3)
  })

  it('rejects malformed page params', () => {
    expect(getValidPageNumber('abc', 3)).toBeNull()
    expect(getValidPageNumber('1.5', 3)).toBeNull()
    expect(getValidPageNumber('02', 3)).toBeNull()
  })

  it('rejects pages outside the available range', () => {
    expect(getValidPageNumber('0', 3)).toBeNull()
    expect(getValidPageNumber('4', 3)).toBeNull()
  })
})
