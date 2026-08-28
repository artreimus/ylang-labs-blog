import { Company, allCompanies } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components.js'
import CompanyLayout from '@/layouts/CompanyLayout'
import { coreContent } from 'pliny/utils/contentlayer.js'
import { genPageMetadata } from 'app/seo'
import { resolveCompanyContentAssets } from '@/lib/assets/content.server'

export const metadata = genPageMetadata({ title: 'About', url: '/about' })

export default function Page() {
  const company = allCompanies.find((p) => p.slug === 'default') as Company
  const mainContent = coreContent(resolveCompanyContentAssets(company))

  return (
    <>
      <CompanyLayout content={mainContent}>
        <MDXLayoutRenderer code={company.body.code} />
      </CompanyLayout>
    </>
  )
}
