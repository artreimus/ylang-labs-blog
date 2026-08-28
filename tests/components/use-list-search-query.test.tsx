import { act, renderHook } from '@testing-library/react'
import { useListSearchQuery } from '@/components/hooks/use-list-search-query'

const mockReplace = jest.fn()
let mockPathname = '/blogs'
let mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
}))

describe('useListSearchQuery', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockReplace.mockReset()
    mockPathname = '/blogs'
    mockSearchParams = new URLSearchParams()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('hydrates the controlled value from the URL', () => {
    mockSearchParams = new URLSearchParams('q=agents')

    const { result } = renderHook(() => useListSearchQuery({ rootPath: '/blogs', debounceMs: 200 }))

    expect(result.current.searchValue).toBe('agents')
    expect(result.current.normalizedSearchValue).toBe('agents')
  })

  it('debounces writes, preserves unrelated parameters, and resets pagination', () => {
    mockPathname = '/blogs/page/2'
    mockSearchParams = new URLSearchParams('ref=homepage')

    const { result } = renderHook(() => useListSearchQuery({ rootPath: '/blogs', debounceMs: 200 }))

    act(() => result.current.setSearchValue('  vector databases  '))
    act(() => jest.advanceTimersByTime(199))
    expect(mockReplace).not.toHaveBeenCalled()

    act(() => jest.advanceTimersByTime(1))
    expect(mockReplace).toHaveBeenCalledWith('/blogs?ref=homepage&q=vector+databases', {
      scroll: false,
    })
  })

  it('removes an empty query and returns to the root listing', () => {
    mockPathname = '/blogs'
    mockSearchParams = new URLSearchParams('q=agents&ref=homepage')

    const { result } = renderHook(() => useListSearchQuery({ rootPath: '/blogs', debounceMs: 200 }))

    act(() => result.current.setSearchValue('   '))
    act(() => jest.advanceTimersByTime(200))

    expect(mockReplace).toHaveBeenCalledWith('/blogs?ref=homepage', { scroll: false })
  })

  it('canonicalizes a direct whitespace-only query out of the URL', () => {
    mockSearchParams = new URLSearchParams('q=+++&ref=homepage')

    renderHook(() => useListSearchQuery({ rootPath: '/blogs', debounceMs: 200 }))

    act(() => jest.advanceTimersByTime(200))

    expect(mockReplace).toHaveBeenCalledWith('/blogs?ref=homepage', { scroll: false })
  })

  it('responds to back and forward navigation', () => {
    mockSearchParams = new URLSearchParams('q=agents')

    const { result, rerender } = renderHook(() =>
      useListSearchQuery({ rootPath: '/blogs', debounceMs: 200 })
    )

    mockSearchParams = new URLSearchParams('q=evaluations')
    rerender()

    expect(result.current.searchValue).toBe('evaluations')
  })
})
