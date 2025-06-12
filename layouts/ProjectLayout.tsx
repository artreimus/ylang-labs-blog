import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Project, Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Tags from '@/components/Tags'
import Author from '@/components/Author'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Project>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function ProjectLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
}: LayoutProps) {
  const { path, date, title, tags, description, image, github, demo } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-4 text-center">
              <dl className="space-y-6">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>

              {/* Project description for small screens - shown below title */}
              {description && (
                <div className="text-dark-500 dark:text-white-500 mx-auto mb-2 mt-4 max-w-2xl text-center text-sm leading-6 xl:hidden">
                  <p>{description}</p>
                </div>
              )}

              {/* Project links for small screens - centered */}
              {(github || demo) && (
                <div className="mb-4 mt-6 flex justify-center space-x-6 xl:hidden">
                  {github && (
                    <Link
                      href={github}
                      className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="h-4 w-4" />
                      <span>Code</span>
                    </Link>
                  )}
                  {demo && (
                    <Link
                      href={demo}
                      className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt className="h-3 w-3" />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:divide-y-0">
            <dl className="pb-8 pt-6 xl:border-b xl:border-gray-200 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <Author key={author.name} author={author} />
                  ))}
                </ul>
              </dd>

              {/* Project description for large screens */}
              <div className="mt-8 hidden xl:block">
                {description && (
                  <div>
                    <p className="dark:text-white-500 light:text-gray-700 text-sm leading-6">
                      {description}
                    </p>
                  </div>
                )}
              </div>

              {/* Project links for large screens */}
              {(github || demo) && (
                <div className="mt-6 hidden xl:block">
                  <div className="flex flex-col space-y-3">
                    {github && (
                      <Link
                        href={github}
                        className="grid grid-cols-[20px_1fr] items-center gap-2 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="h-4 w-4" />
                        <span>Code</span>
                      </Link>
                    )}
                    {demo && (
                      <Link
                        href={demo}
                        className="grid grid-cols-[20px_1fr] items-center gap-2 text-sm text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt className="h-3 w-3" />
                        <span>Live Demo</span>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 dark:prose-invert">
                {image && (
                  <div className="mb-8">
                    <Image
                      src={image}
                      alt={title}
                      className="rounded-lg"
                      width={1200}
                      height={630}
                    />
                  </div>
                )}
                {children}
              </div>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                <Tags tags={tags} className="py-4 xl:py-8" />
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Project
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Project
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to projects"
                >
                  &larr; Back to projects
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
