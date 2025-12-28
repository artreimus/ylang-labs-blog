'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const DynamicLogo = () => {
  const { theme, resolvedTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    if (theme === 'system') {
      setCurrentTheme(resolvedTheme || 'light')
    } else {
      setCurrentTheme(theme || 'light')
    }
  }, [theme, resolvedTheme])

  return (
    <div className="relative flex h-10 items-center">
      {currentTheme === 'dark' ? (
        <Image
          src="/static/images/logo-dark.svg"
          alt="Ylang Labs Logo"
          width={180}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      ) : (
        <Image
          src="/static/images/logo-light.svg"
          alt="Ylang Labs Logo"
          width={180}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
      )}
    </div>
  )
}

export default DynamicLogo
