import React from 'react'

interface DiagramSubtitleProps {
  children: React.ReactNode
}

export default function DiagramSubtitle({ children }: DiagramSubtitleProps) {
  return (
    <div className="mt-2 text-center text-sm italic text-gray-600 dark:text-gray-400">
      {children}
    </div>
  )
}
