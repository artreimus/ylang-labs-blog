import React from 'react'
import { DiagramImage, DiagramSubtitle } from './DiagramComponents'

interface DiagramDisplayProps {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
  className?: string
}

const DiagramDisplay: React.FC<DiagramDisplayProps> = ({
  src,
  alt,
  caption,
  width,
  height,
  className,
}) => {
  return (
    <figure>
      <DiagramImage src={src} alt={alt} width={width} height={height} className={className} />
      <DiagramSubtitle>{caption}</DiagramSubtitle>
    </figure>
  )
}

export default DiagramDisplay
