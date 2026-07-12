import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import DynamicLogo from '@/components/DynamicLogo'

type FooterLink = {
  label: string
  href: string
}

type SocialKind = Parameters<typeof SocialIcon>[0]['kind']

const createFooterLink = (label: string, href?: string | null) => {
  if (!href) return null
  return { label, href }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const exploreLinks: FooterLink[] = headerNavLinks
    .filter((link) => link.href !== '/contact-us')
    .map((link) => ({ label: link.title, href: link.href }))

  const contactNavItem = headerNavLinks.find((link) => link.href === '/contact-us')

  const collaborateLinks: FooterLink[] = [
    contactNavItem && {
      label: contactNavItem.title,
      href: contactNavItem.href,
    },
    createFooterLink('Email', siteMetadata.email && `mailto:${siteMetadata.email}`),
  ].filter((link): link is FooterLink => Boolean(link))

  const followLinks: FooterLink[] = [
    createFooterLink('LinkedIn', siteMetadata.linkedin),
    createFooterLink('GitHub', siteMetadata.github),
    createFooterLink('X (Twitter)', siteMetadata.x || siteMetadata.twitter),
    createFooterLink('Facebook', siteMetadata.facebook),
  ].filter((link): link is FooterLink => Boolean(link))

  const navigationGroups = [
    { title: 'Explore', links: exploreLinks },
    { title: 'Collaborate', links: collaborateLinks },
    { title: 'Follow', links: followLinks },
  ].filter((group) => group.links.length > 0)

  const socialIconLinks: { kind: SocialKind; href: string | undefined }[] = [
    { kind: 'mail', href: siteMetadata.email ? `mailto:${siteMetadata.email}` : undefined },
    { kind: 'github', href: siteMetadata.github },
    { kind: 'facebook', href: siteMetadata.facebook },
    { kind: 'youtube', href: siteMetadata.youtube },
    { kind: 'linkedin', href: siteMetadata.linkedin },
    { kind: 'twitter', href: siteMetadata.twitter },
    { kind: 'x', href: siteMetadata.x },
    { kind: 'instagram', href: siteMetadata.instagram },
    { kind: 'threads', href: siteMetadata.threads },
    { kind: 'medium', href: siteMetadata.medium },
  ]

  return (
    <footer className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] mt-24 w-screen max-w-none">
      <div className="w-full bg-white py-14 text-gray-700 shadow-lg shadow-gray-900/5 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:shadow-black/20 dark:ring-white/10 sm:py-16 md:py-20">
        <div className="flex w-full max-w-none flex-col gap-12 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="space-y-6">
            <h2 className="font-serif text-3xl italic leading-tight text-gray-900 dark:text-white sm:text-4xl">
              Applied AI,
              <br className="hidden sm:block" /> engineered for impact.
            </h2>
            <p className="max-w-2xl text-base text-gray-600 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {navigationGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {group.title}
                </p>
                <ul className="space-y-2 text-base text-gray-700 dark:text-gray-300">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('mailto:') ? (
                        <a
                          href={link.href}
                          className="transition duration-200 hover:text-gray-900 hover:underline dark:hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="transition duration-200 hover:text-gray-900 hover:underline dark:hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <section
            aria-labelledby="site-disclaimer-title"
            className="grid gap-3 border-y border-gray-200 py-6 text-sm leading-relaxed text-gray-600 dark:border-white/10 dark:text-gray-400 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-8"
          >
            <h2
              id="site-disclaimer-title"
              className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-200"
            >
              Personal publishing note
            </h2>
            <p className="max-w-4xl">
              Articles express their authors’ personal views and do not represent or imply
              endorsement by any employer, client, or partner. We publish from public sources and
              personal experience and do not knowingly include confidential, proprietary, or
              employer-owned material. Original articles and site code are open source under the{' '}
              <Link
                href={`${siteMetadata.siteRepo}/blob/main/LICENSE`}
                className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-primary-500 dark:text-gray-200 dark:decoration-gray-600 dark:hover:decoration-primary-400"
              >
                MIT License
              </Link>{' '}
              unless otherwise noted. Content is for educational purposes, not professional advice.
            </p>
          </section>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-gray-500 lg:justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-500">
              <DynamicLogo />
            </div>
            <div className="text-gray-600 dark:text-gray-500">{`© ${currentYear} ${siteMetadata.title}.`}</div>
            <div className="flex flex-wrap items-center gap-3 text-gray-600 dark:text-gray-500">
              {socialIconLinks.map(({ kind, href }) => (
                <SocialIcon
                  key={kind}
                  kind={kind}
                  href={href}
                  size={5}
                  className="!text-gray-500 hover:!text-gray-900 dark:!text-gray-400 dark:hover:!text-white"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
