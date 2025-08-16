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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/10">
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" />
        <div className="container relative mx-auto px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center rounded-full bg-primary-100/80 px-4 py-2 text-sm font-medium text-primary-700 shadow-sm backdrop-blur-sm dark:bg-primary-900/20 dark:text-primary-300">
                  <span className="mr-2">✨</span>
                  About Us
                </div>
                <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Welcome to{' '}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                      {name}
                    </span>
                    <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-primary-600 to-primary-500 opacity-20" />
                  </span>
                </h1>
                <p className="mt-8 text-xl leading-relaxed text-gray-600 dark:text-gray-300 sm:text-2xl">
                  {tag}
                </p>
                <div className="mt-12 flex flex-col items-center gap-8 sm:flex-row sm:justify-center lg:justify-start">
                  <div className="flex items-center gap-4 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
                    {email && (
                      <SocialIcon
                        kind="mail"
                        href={`mailto:${email}`}
                        size={6}
                        className="transition-all duration-300 hover:scale-110 hover:text-primary-600 dark:hover:text-primary-400"
                      />
                    )}
                    {github && (
                      <SocialIcon
                        kind="github"
                        href={github}
                        size={6}
                        className="transition-all duration-300 hover:scale-110 hover:text-primary-600 dark:hover:text-primary-400"
                      />
                    )}
                    {linkedin && (
                      <SocialIcon
                        kind="linkedin"
                        href={linkedin}
                        size={6}
                        className="transition-all duration-300 hover:scale-110 hover:text-primary-600 dark:hover:text-primary-400"
                      />
                    )}
                    {twitter && (
                      <SocialIcon
                        kind="x"
                        href={twitter}
                        size={6}
                        className="transition-all duration-300 hover:scale-110 hover:text-primary-600 dark:hover:text-primary-400"
                      />
                    )}
                    {facebook && (
                      <SocialIcon
                        kind="facebook"
                        href={facebook}
                        size={6}
                        className="transition-all duration-300 hover:scale-110 hover:text-primary-600 dark:hover:text-primary-400"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                {logo && (
                  <div className="group relative">
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 opacity-25 blur transition duration-500 group-hover:opacity-40" />
                    <div className="relative h-80 w-80 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                      <Image
                        src={logo}
                        alt="company logo"
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-600/10 to-secondary-600/10 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl bg-white/80 shadow-2xl ring-1 ring-gray-200 backdrop-blur-sm dark:bg-gray-800/80 dark:ring-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 dark:from-primary-900/20 dark:to-secondary-900/20" />
                <div className="relative p-8 sm:p-12 lg:p-16">
                  <div className="prose prose-lg mx-auto max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-p:text-gray-700 prose-a:text-primary-600 prose-headings:dark:text-white prose-p:dark:text-gray-300 prose-a:dark:text-primary-400">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                What Makes Us Different
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                We're building the future of AI engineering education and collaboration
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 opacity-25 blur transition duration-500 group-hover:opacity-40" />
                <div className="relative h-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Open Source First
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    Everything we build is open source and free to use, fostering transparency and
                    community collaboration.
                  </p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-secondary-600 to-primary-600 opacity-25 blur transition duration-500 group-hover:opacity-40" />
                <div className="relative h-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary-100 dark:bg-secondary-900/20">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Practical Learning
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    We focus on real-world projects and hands-on tutorials that you can apply
                    immediately.
                  </p>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 opacity-25 blur transition duration-500 group-hover:opacity-40" />
                <div className="relative h-full rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/20">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Global Community
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    Join a vibrant global community of AI engineers, from beginners to experts, all
                    learning together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Your AI Journey?
            </h2>
            <p className="mt-6 text-xl text-white/90">
              Join thousands of developers who are already building the future of AI
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/blogs"
                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-primary-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-xl"
              >
                Explore Our Blogs
              </a>
              <a
                href="/projects"
                className="inline-flex items-center rounded-full border-2 border-white px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary-600"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
