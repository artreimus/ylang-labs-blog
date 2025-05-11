import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allProjects } from 'contentlayer/generated'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import EmptyView from '@/components/EmptyView'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  const projects = allCoreContent(sortPosts(allProjects))

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {!projects.length && (
              <EmptyView
                title="No Projects Yet"
                description="The future of AI Engineering is waiting to be built. Check back soon for innovative projects and tools!"
              />
            )}
            {projects.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.image}
                href={`/projects/${d.slug}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
