import Link from 'next/link'
import Image from 'next/image'

interface TeamMemberProps {
  name: string
  title: string
  bio?: string
  imagePath?: string
  profileLink: string
  twitter?: string
  linkedin?: string
  github?: string
}

const TeamMemberCard = ({
  name,
  title,
  bio,
  imagePath,
  profileLink,
  twitter,
  linkedin,
  github,
}: TeamMemberProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      <div className="flex flex-col items-center">
        {imagePath && (
          <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full">
            <Image
              src={imagePath}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="mb-4 text-sm font-medium text-primary-600 dark:text-primary-400">{title}</p>
        {bio && <p className="mb-4 text-center text-gray-600 dark:text-gray-300">{bio}</p>}

        {/* Social Links */}
        <div className="mb-6 flex space-x-4">
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary-500 dark:hover:text-primary-400"
              aria-label="Twitter"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary-500 dark:hover:text-primary-400"
              aria-label="LinkedIn"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary-500 dark:hover:text-primary-400"
              aria-label="GitHub"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>

        <Link
          href={profileLink}
          className="inline-flex items-center rounded-full bg-primary-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          View Profile
        </Link>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-primary-900/20 dark:to-secondary-900/20"></div>
    </div>
  )
}

export default TeamMemberCard
