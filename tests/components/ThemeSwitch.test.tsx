import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ThemeSwitch from '@/components/ThemeSwitch'

const setTheme = jest.fn()

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    resolvedTheme: 'light',
    setTheme,
  }),
}))

describe('ThemeSwitch', () => {
  it('uses one keyboard-operable menu item per theme', async () => {
    render(<ThemeSwitch />)

    fireEvent.click(screen.getByRole('button', { name: 'Theme switcher' }))

    const lightOption = await screen.findByRole('menuitem', { name: /light/i })
    expect(lightOption.querySelector('button')).toBeNull()

    fireEvent.click(screen.getByRole('menuitem', { name: /dark/i }))
    await waitFor(() => expect(setTheme).toHaveBeenCalledWith('dark'))
  })
})
