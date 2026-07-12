import { act, fireEvent, render, screen } from '@testing-library/react'

import ProcessFlow from '@/components/blogs/context-engineering-for-ai-agents/ProcessFlow'

jest.mock('lucide-react', () => ({
  Activity: () => null,
  ArrowRight: () => null,
  Clock: () => null,
  Play: () => null,
  RotateCcw: () => null,
  ShieldCheck: () => null,
}))

describe('ProcessFlow', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('stops scheduling work when the simulation completes', () => {
    render(<ProcessFlow />)

    const runButton = screen.getByRole('button', { name: /run simulation/i })
    fireEvent.click(runButton)

    for (let step = 0; step < 7; step += 1) {
      act(() => {
        jest.advanceTimersByTime(800)
      })
    }

    expect(runButton).toBeEnabled()
    expect(jest.getTimerCount()).toBe(0)
  })
})
