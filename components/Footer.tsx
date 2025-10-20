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
    <footer className="relative mt-24">
      <div className="-mx-4 bg-gray-100 px-10 py-14 text-gray-700 shadow-lg shadow-gray-900/5 ring-1 ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:shadow-black/20 dark:ring-white/10 sm:-mx-6 sm:px-8 sm:py-16 md:px-12 md:py-20 xl:mx-0">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
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

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-gray-200 pt-8 text-sm text-gray-500 dark:border-white/10 lg:justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-500">
              <DynamicLogo />
            </div>
            <div className="text-gray-600 dark:text-gray-500">{`© ${currentYear} ${siteMetadata.title}. All rights reserved.`}</div>
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
