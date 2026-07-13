import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, unoptimized, ...rest }: ImageProps) => {
  const resolvedSource =
    typeof src === 'string' && src.startsWith('/') ? `${basePath || ''}${src}` : src
  const isAnimatedGif = typeof src === 'string' && /\.gif(?:$|[?#])/i.test(src)

  return <NextImage src={resolvedSource} unoptimized={unoptimized ?? isAnimatedGif} {...rest} />
}

export default Image
