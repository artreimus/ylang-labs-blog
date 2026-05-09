import { cn } from '@/components/lib/utils'

describe('cn', () => {
  it('combines conditional classes and removes falsy values', () => {
    expect(cn('flex', false && 'hidden', null, undefined, 'items-center')).toBe('flex items-center')
  })

  it('keeps the later Tailwind class when utility groups conflict', () => {
    expect(cn('px-2 py-1', 'px-4', 'text-sm text-lg')).toBe('py-1 px-4 text-lg')
  })
})
