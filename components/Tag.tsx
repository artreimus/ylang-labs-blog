import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 rounded-sm text-sm font-medium uppercase text-primary-700 transition-colors duration-200 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:text-primary-300 dark:hover:text-primary-200 dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
