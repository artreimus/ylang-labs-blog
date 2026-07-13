import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Legal Notice',
  description:
    'How Ylang Labs approaches editorial independence, source material, educational content, copyright, and reuse.',
  url: '/legal',
})

const sectionLinks = [
  { number: '01', label: 'Independent publishing', href: '#independent-publishing' },
  { number: '02', label: 'Sources and confidentiality', href: '#sources-and-confidentiality' },
  { number: '03', label: 'Educational content', href: '#educational-content' },
  { number: '04', label: 'Accuracy and changes', href: '#accuracy-and-changes' },
  { number: '05', label: 'Copyright and reuse', href: '#copyright-and-reuse' },
  { number: '06', label: 'External links', href: '#external-links' },
] as const

const sectionClassName =
  'scroll-mt-36 border-b border-gray-200 py-10 first:pt-0 last:border-b-0 dark:border-white/10 sm:py-12'

const headingClassName =
  'text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl'

const bodyClassName = 'mt-4 text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg'

function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-1 font-mono text-xs font-semibold tracking-widest text-primary-700 dark:text-primary-400">
      {children}
    </span>
  )
}

export default function LegalPage() {
  return (
    <article className="pb-8">
      <header className="relative overflow-hidden border-b border-gray-200 pb-14 pt-10 dark:border-white/10 sm:pb-20 sm:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 dark:text-gray-400">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-primary-500 ring-4 ring-primary-500/10 dark:bg-primary-400"
            />
            Ylang Labs / Legal
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated 13 July 2026</p>
        </div>

        <div className="mt-12 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:gap-16">
          <div>
            <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-gray-950 dark:text-white sm:text-6xl lg:text-7xl">
              Legal notice
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-gray-600 dark:text-gray-300 sm:text-2xl sm:leading-9">
              Clear terms for an independent AI engineering publication.
            </p>
          </div>

          <div className="border-l-2 border-primary-500 pl-5 dark:border-primary-400">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              In brief
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              We publish independent educational work, respect confidential material, and separate
              the site’s open-source code from the rights attached to editorial content.
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-12 py-14 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside>
          <nav aria-label="Legal notice sections" className="lg:sticky lg:top-36">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              On this page
            </p>
            <ol className="mt-5 space-y-3">
              {sectionLinks.map((section) => (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    className="group flex items-baseline gap-3 rounded-sm text-sm leading-5 text-gray-600 transition hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 dark:text-gray-400 dark:hover:text-white dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950"
                  >
                    <span className="font-mono text-[10px] font-semibold tracking-wider text-gray-400 transition group-hover:text-primary-700 dark:text-gray-600 dark:group-hover:text-primary-400">
                      {section.number}
                    </span>
                    <span>{section.label}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div>
          <section id="independent-publishing" className={sectionClassName}>
            <div className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
              <SectionNumber>01</SectionNumber>
              <div>
                <h2 className={headingClassName}>Independent publishing</h2>
                <p className={bodyClassName}>
                  Ylang Labs is an independent publication. Opinions and analysis belong to their
                  named authors. They do not represent any employer, client, partner, or other
                  organization unless an article explicitly says otherwise.
                </p>
              </div>
            </div>
          </section>

          <section id="sources-and-confidentiality" className={sectionClassName}>
            <div className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
              <SectionNumber>02</SectionNumber>
              <div>
                <h2 className={headingClassName}>Sources and confidentiality</h2>
                <p className={bodyClassName}>
                  We build articles from public sources, original analysis, and personal experience.
                  We do not knowingly publish confidential, proprietary, or unlawfully obtained
                  material.
                </p>
                <p className={bodyClassName}>
                  Product names, trademarks, logos, screenshots, quotations, and other third-party
                  materials remain the property of their respective owners. Their appearance does
                  not imply affiliation with or endorsement by Ylang Labs.
                </p>
              </div>
            </div>
          </section>

          <section id="educational-content" className={sectionClassName}>
            <div className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
              <SectionNumber>03</SectionNumber>
              <div>
                <h2 className={headingClassName}>Educational content</h2>
                <p className={bodyClassName}>
                  Content on this site is provided for general educational and informational
                  purposes. It is not legal, financial, medical, security, or other professional
                  advice, and it should not replace guidance tailored to your circumstances.
                  Technical examples may be incomplete, become outdated, or behave differently in
                  your environment.
                </p>
              </div>
            </div>
          </section>

          <section id="accuracy-and-changes" className={sectionClassName}>
            <div className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
              <SectionNumber>04</SectionNumber>
              <div>
                <h2 className={headingClassName}>Accuracy and changes</h2>
                <p className={bodyClassName}>
                  We aim to publish accurate, well-sourced work, but fast-moving tools, services,
                  and research can change after publication. We do not guarantee that every piece of
                  content will remain complete or current. We may correct, update, or remove
                  material when new information becomes available.
                </p>
              </div>
            </div>
          </section>

          <section id="copyright-and-reuse" className={sectionClassName}>
            <div className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
              <SectionNumber>05</SectionNumber>
              <div>
                <h2 className={headingClassName}>Copyright and reuse</h2>
                <p className={bodyClassName}>
                  Unless a page or asset states otherwise, original editorial content and visual
                  materials may not be republished in full without permission. You are welcome to
                  link to our work and quote reasonable excerpts with clear attribution.
                </p>
                <p className={bodyClassName}>
                  The source code for this website is available under the{' '}
                  <Link
                    href={`${siteMetadata.siteRepo}/blob/main/LICENSE`}
                    className="font-medium text-gray-950 underline decoration-primary-500 decoration-2 underline-offset-4 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-white dark:hover:text-primary-400 dark:focus-visible:ring-primary-400"
                  >
                    MIT License
                  </Link>
                  . Third-party code, libraries, fonts, images, and other assets retain their own
                  licenses and terms.
                </p>
              </div>
            </div>
          </section>

          <section id="external-links" className={sectionClassName}>
            <div className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
              <SectionNumber>06</SectionNumber>
              <div>
                <h2 className={headingClassName}>External links</h2>
                <p className={bodyClassName}>
                  Links to third-party websites are provided for context and convenience. Ylang Labs
                  does not control those sites and is not responsible for their availability,
                  content, security, or privacy practices.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="mb-8 border-y border-gray-200 py-10 dark:border-white/10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              <span aria-hidden="true" className="h-px w-8 bg-primary-500 dark:bg-primary-400" />
              Corrections and permissions
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              Questions about this notice?
            </h2>
          </div>
          <div>
            <p className="leading-7 text-gray-600 dark:text-gray-300">
              If something needs correction, attribution, removal, or a clearer explanation, let us
              know. We will review the details and respond as soon as practical.
            </p>
            <Link
              href="/contact-us"
              className="group mt-6 inline-flex items-center gap-3 rounded-sm text-sm font-semibold text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 dark:text-white dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950"
            >
              Contact Ylang Labs
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-base text-gray-950 transition duration-200 group-hover:translate-x-1 group-hover:bg-primary-400 dark:bg-primary-400 dark:group-hover:bg-primary-300"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
