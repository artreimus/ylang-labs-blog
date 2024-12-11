import { Company, allCompanies } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import CompanyLayout from '@/layouts/CompanyLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const company = allCompanies.find((p) => p.slug === 'default') as Company
  const mainContent = coreContent(company)

  return (
    <>
      <CompanyLayout content={mainContent}>
        <MDXLayoutRenderer code={company.body.code} />
      </CompanyLayout>
    </>
  )
}
