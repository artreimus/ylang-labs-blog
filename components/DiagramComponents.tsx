import React from 'react'
import Image, { ImageProps } from 'next/image'

// DiagramImage component with default responsive width and height
export interface DiagramImageProps extends ImageProps {
  // Optional custom className, default is 'mx-auto'
  className?: string
}

export const DiagramImage: React.FC<DiagramImageProps> = ({
  src,
  alt,
  width = 100, // default width
  height = 300, // default height
  className = 'mx-auto',
  ...rest
}) => {
  return <Image src={src} alt={alt} width={width} height={height} className={className} {...rest} />
}

// DiagramSubtitle component for caption under diagrams
interface DiagramSubtitleProps {
  children: React.ReactNode
}

export const DiagramSubtitle: React.FC<DiagramSubtitleProps> = ({ children }) => {
  return (
    <figcaption style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '0.5rem' }}>
      {children}
    </figcaption>
  )
}
