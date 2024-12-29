import Image from '@/components/Image'
import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Authors } from 'contentlayer/generated'

interface AuthorProps {
  author: CoreContent<Authors>
  className?: string
}

export default function Author({ author, className }: AuthorProps) {
  return (
    <li className={`flex items-center space-x-2 ${className}`}>
      {author.avatar && (
        <Image
          src={author.avatar}
          width={38}
          height={38}
          alt="avatar"
          className="h-10 w-10 rounded-full"
        />
      )}
      <dl className="whitespace-nowrap text-sm font-medium leading-5">
        <dt className="sr-only">Name</dt>
        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
        <dt className="sr-only">Twitter</dt>
        <dd>
          {author.twitter && (
            <Link
              href={author.twitter}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {author.twitter.replace('https://twitter.com/', '@').replace('https://x.com/', '@')}
            </Link>
          )}
        </dd>
      </dl>
    </li>
  )
}
