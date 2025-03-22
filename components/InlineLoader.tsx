import React from 'react'

interface InlineLoaderProps {
  /**
   * Text to display next to the loader
   */
  text?: string
  /**
   * Size of the loader in pixels
   */
  size?: number
  /**
   * Color of the loader (supports tailwind text-* classes or direct color values)
   */
  color?: string
  /**
   * Additional classes for the container
   */
  className?: string
}

export const InlineLoader: React.FC<InlineLoaderProps> = ({
  text = 'Loading...',
  size = 20,
  color = 'text-white',
  className = '',
}) => {
  // Handle direct color values vs Tailwind classes
  const colorClass = color.startsWith('text-') ? color : ''
  const colorStyle = !color.startsWith('text-') ? { color } : {}

  return (
    <span className={`flex items-center justify-center ${className}`}>
      <svg
        className={`-ml-1 mr-3 animate-spin ${colorClass}`}
        style={{ height: size, width: size, ...colorStyle }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text && <span>{text}</span>}
    </span>
  )
}

export default InlineLoader
