import TeamMemberCard from '@/components/TeamMemberCard'

const teamMembers = [
  {
    name: 'Arthur Reimus',
    title: 'AI Engineer at IBM',
    bio: 'Specializing in Generative AI and Full-Stack Development, focusing on productionizing AI solutions and delivering user-friendly, impactful products.',
    imagePath: '/static/images/avatars/arthur-reimus.jpeg',
    profileLink: '/team/arthur-reimus',
    twitter: 'https://twitter.com/artreimus',
    linkedin: 'https://www.linkedin.com/in/arthur-lechoncito/',
    github: 'https://github.com/artreimus',
  },
  {
    name: 'Christopher Caysido',
    title: 'Software Engineer',
    bio: 'Expert in software development and system architecture',
    imagePath: '/static/images/avatars/christopher-caysido.jpg',
    profileLink: '/team/christopher-caysido',
    github: 'https://github.com/christophercaysido',
  },
  {
    name: 'Ezekiel Mariano',
    title: 'Software Engineer',
    bio: 'Specialized in building scalable applications and systems',
    imagePath: '/static/images/avatars/ezekiel-mariano.jpg',
    profileLink: '/team/ezekiel-mariano',
    github: 'https://github.com/ezekielmariano',
  },
  {
    name: 'Van Panugan',
    title: 'Software Engineer',
    bio: 'Focused on creating efficient and innovative software solutions',
    imagePath: '/static/images/avatars/van-panugan.jpg',
    profileLink: '/team/van-panugan',
    github: 'https://github.com/vanpanugan',
  },
]

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Meet the Team of Ylang Labs
        </h1>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Our team of experts is dedicated to learning and building projects in AI, Generative AI,
          and LLMs.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  )
}
