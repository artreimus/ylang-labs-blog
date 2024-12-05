import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <span className="inline-block rounded-sm bg-primary-500 px-2 py-1 text-xs font-medium text-white">
      {text}
    </span>
  )
}

export default Tag
