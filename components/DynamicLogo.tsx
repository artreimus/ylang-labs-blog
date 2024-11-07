'use client' // This directive makes the component a client component

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import LogoLight from '@/data/logo-light.svg'
import LogoDark from '@/data/logo-dark.svg'

const DynamicLogo = () => {
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    // Determine the current theme, accounting for system preferences
    if (theme === 'system') {
      setCurrentTheme(resolvedTheme || 'light')
    } else {
      setCurrentTheme(theme || 'light')
    }
  }, [theme, resolvedTheme])

  return currentTheme === 'dark' ? <LogoDark /> : <LogoLight />
}

export default DynamicLogo
