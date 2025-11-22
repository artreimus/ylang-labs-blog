import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import TEAM_MEMBERS from '@/data/teamMembers'

interface Props {
  params: Promise<{
    member: string
  }>
}

// Helper function to filter team members
const getTeamAuthors = () => {
  return allAuthors.filter((author) => TEAM_MEMBERS.includes(author.slug))
}

export async function generateStaticParams() {
  return getTeamAuthors().map((author) => ({
    member: author.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const author = getTeamAuthors().find((p) => p.slug === resolvedParams.member)
  if (!author) {
    return genPageMetadata({
      title: 'Not Found',
      description: 'Team member not found',
    })
  }

  return genPageMetadata({
    title: author.name,
    description: `About ${author.name}`,
    url: `/team/${author.slug}`,
  })
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params
  const author = getTeamAuthors().find((p) => p.slug === resolvedParams.member) as Authors

  if (!author) {
    notFound()
  }

  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}
