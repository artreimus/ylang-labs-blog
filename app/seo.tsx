import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  alternates?: Metadata['alternates']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const buildAbsoluteUrl = (url?: string) => {
  if (!url) return siteMetadata.siteUrl
  return new URL(url, siteMetadata.siteUrl).toString()
}

export function genPageMetadata({
  title,
  description,
  image,
  url,
  alternates,
  ...rest
}: PageSEOProps): Metadata {
  const resolvedUrl = buildAbsoluteUrl(url)
  const images = image ? [image] : [siteMetadata.socialBanner]

  return {
    title,
    description: description || siteMetadata.description,
    alternates: {
      canonical: resolvedUrl,
      ...alternates,
    },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: resolvedUrl,
      siteName: siteMetadata.title,
      images,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images,
    },
    ...rest,
  }
}
