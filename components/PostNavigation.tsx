import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

interface PostNavigationProps {
  path: string
  filePath: string
  className?: string
}

export default function PostNavigation({ path, filePath, className = '' }: PostNavigationProps) {
  return (
    <div className={`text-sm text-gray-700 dark:text-gray-300 ${className}`}>
      <Link href={discussUrl(path)} rel="nofollow">
        Discuss on Twitter
      </Link>
      {` • `}
      <Link href={editUrl(filePath)}>View on GitHub</Link>
    </div>
  )
}
