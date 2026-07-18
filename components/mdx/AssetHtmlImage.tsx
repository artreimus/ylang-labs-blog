import type { ComponentPropsWithoutRef } from 'react'

import { resolveAssetUrl } from '@/lib/assets/resolve-build'

type AssetHtmlImageProps = ComponentPropsWithoutRef<'img'>

/** Resolve lowercase Markdown and raw MDX img sources without requiring image dimensions. */
export default function AssetHtmlImage({ src, alt = '', ...props }: AssetHtmlImageProps) {
  if (src !== undefined && typeof src !== 'string') {
    throw new TypeError('HTML image sources must be URL strings.')
  }

  const resolvedSrc = src === undefined ? undefined : resolveAssetUrl(src)
  if (resolvedSrc !== undefined && typeof resolvedSrc !== 'string') {
    throw new TypeError('HTML image sources must resolve to a URL string.')
  }

  // MDX image syntax does not guarantee the dimensions required by next/image.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={resolvedSrc} alt={alt} />
}
