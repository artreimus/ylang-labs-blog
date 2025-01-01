import { ReactNode } from 'react'
import type { Company } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Company, '_id' | '_raw' | 'body'>
}

export default function CompanyLayout({ children, content }: Props) {
  const { name, logo, tag, email, twitter, linkedin, github, facebook } = content

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container relative mx-auto px-6 py-24 sm:px-8 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-secondary-700 dark:text-secondary-300">
                About Us
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Welcome to{' '}
                <span className="relative whitespace-nowrap text-primary-400">
                  <span className="relative">{name}</span>
                </span>
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">{tag}</p>
              <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center lg:justify-start">
                <div className="flex items-center gap-4">
                  {email && (
                    <SocialIcon
                      kind="mail"
                      href={`mailto:${email}`}
                      size={6}
                      className="transition-transform hover:scale-110"
                    />
                  )}
                  {github && (
                    <SocialIcon
                      kind="github"
                      href={github}
                      size={6}
                      className="transition-transform hover:scale-110"
                    />
                  )}
                  {linkedin && (
                    <SocialIcon
                      kind="linkedin"
                      href={linkedin}
                      size={6}
                      className="transition-transform hover:scale-110"
                    />
                  )}
                  {twitter && (
                    <SocialIcon
                      kind="x"
                      href={twitter}
                      size={6}
                      className="transition-transform hover:scale-110"
                    />
                  )}
                  {facebook && (
                    <SocialIcon
                      kind="facebook"
                      href={facebook}
                      size={6}
                      className="transition-transform hover:scale-110"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              {logo && (
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl" />
                  <div className="relative h-64 w-64 overflow-hidden rounded-xl bg-primary-50 shadow-2xl dark:bg-gray-800/50">
                    <Image
                      src={logo}
                      alt="company logo"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800/50 lg:p-12">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary-500/20 to-transparent dark:via-secondary-500/10" />
          <div className="prose prose-lg mx-auto max-w-none dark:prose-invert prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-secondary-600 prose-headings:dark:text-white prose-p:dark:text-gray-300 prose-a:dark:text-secondary-400">
            {children}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent dark:via-primary-500/10" />
        </div>
      </div>
    </div>
  )
}
