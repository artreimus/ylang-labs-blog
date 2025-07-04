import Link from '@/components/Link'
import EmptyView from '@/components/EmptyView'
import BlogCard from '@/components/BlogCard'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Blogs
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Discover insightful blogs on AI engineering
          </p>
        </div>
        <div className="relative w-full">
          <div className="hide-scrollbar flex overflow-x-auto py-6">
            {!posts.length && (
              <EmptyView
                title="No Posts Yet"
                description="The world of AI Engineering is waiting to be explored. Check back soon for cutting-edge insights and practical guides!"
              />
            )}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug } = post
              return (
                <div key={slug} className="flex-none pr-3 first:pl-0">
                  <BlogCard post={post} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-1 flex justify-end text-base font-medium leading-6">
          <Link
            href="/blogs"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
