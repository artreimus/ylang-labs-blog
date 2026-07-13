'use client'

import dynamic from 'next/dynamic'

export const HtmlMarkdownArtifactExperience = dynamic(
  () => import('./HtmlMarkdownArtifactExperience')
)
