import Tag from '@/components/Tag'

interface TagsProps {
  tags: string[]
  className?: string
}

export default function Tags({ tags, className = '' }: TagsProps) {
  if (!tags?.length) return null

  return (
    <div className={className}>
      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Tags</h2>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </div>
  )
}
