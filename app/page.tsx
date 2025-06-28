import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import Link from 'next/link'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <div className="mb-24 flex h-[60vh] items-center justify-center sm:mb-32">
        <div className="flex flex-col items-center">
          <h1 className="mb-5 text-center font-serif text-4xl text-secondary-500 dark:text-white sm:text-8xl">
            Discover the Best of <span className="text-primary-500">AI Engineering</span>
          </h1>
          <div>
            <p className="mb-10 overflow-hidden whitespace-normal border-r-0 text-center text-sm text-secondary-500 dark:border-white dark:text-white sm:animate-typewriterWithCaret sm:whitespace-nowrap sm:border-r-4 sm:border-secondary-500 sm:text-lg md:text-2xl">
              A place to read and deepen your understanding of AI engineering.{' '}
            </p>
          </div>
          <div>
            <Link
              href="/blogs"
              className="w-full rounded-md bg-primary-500 px-4 py-3 text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:ring-offset-black dark:hover:bg-primary-400 sm:px-5 sm:py-4 sm:text-lg"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </div>

      <Main posts={posts} />
    </>
  )
}
