'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

type EmptyViewProps = {
  title: string
  description: string
}
const EmptyView: React.FC<EmptyViewProps> = ({ title, description }) => {
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

  return (
    <div className="flex h-[30vh] w-full flex-col items-center justify-center gap-2 p-4 text-center">
      <svg
        viewBox="0 0 1024 1024"
        fill={currentTheme === 'light' ? 'black' : 'white'}
        height="5rem"
        width="5rem"
      >
        <path d="M300 328a60 60 0 10120 0 60 60 0 10-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 10120 0 60 60 0 10-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
      </svg>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="max-w-[300px] text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  )
}

export default EmptyView
