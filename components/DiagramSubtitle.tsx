import React from 'react'

interface DiagramSubtitleProps {
  figureNumber?: number
  children: React.ReactNode
}

const DiagramSubtitle: React.FC<DiagramSubtitleProps> = ({ figureNumber, children }) => {
  return (
    <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
      {figureNumber ? `Figure ${figureNumber}: ` : ''}
      {children}
    </div>
  )
}

export default DiagramSubtitle
