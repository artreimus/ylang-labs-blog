import type { ImageProps } from 'next/image'

import Image from '@/components/Image'
import { resolveAssetUrl } from '@/lib/assets/resolve-build'

/** Resolve logical media IDs on the server before rendering the shared image wrapper. */
export default function AssetImage({ src, alt, ...props }: ImageProps) {
  return <Image src={resolveAssetUrl(src)} alt={alt} {...props} />
}
