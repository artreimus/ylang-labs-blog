import type React from 'react'
import DiagramSubtitle from '../../DiagramSubtitle'

interface KnowledgeDistillationCirclesProps {
  figureNumber?: number
  subtitle?: string
}

const KnowledgeDistillationCircles: React.FC<KnowledgeDistillationCirclesProps> = ({
  figureNumber,
  subtitle,
}) => {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-xl bg-white/50 p-4 shadow-md backdrop-blur-sm dark:bg-gray-900/50 md:p-8">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-900 dark:text-gray-100 md:mb-10 md:text-2xl">
          Knowledge Distillation Process
        </h2>
        <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-x-12 md:space-y-0">
          {/* Teacher Model */}
          <div className="relative">
            <div className="flex h-32 w-32 transform items-center justify-center rounded-full bg-primary-500 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl md:h-64 md:w-64">
              <span className="text-center text-lg font-semibold text-white md:text-xl">
                Teacher
                <br />
                Model
              </span>
            </div>
          </div>

          {/* Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-4 h-12 w-12 rotate-90 text-black dark:text-white md:h-16 md:w-16 md:rotate-0"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>

          {/* Student Model */}
          <div className="relative">
            <div className="flex h-24 w-24 transform items-center justify-center rounded-full bg-secondary-500 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl md:h-48 md:w-48">
              <span className="text-center text-lg font-semibold text-white md:text-xl">
                Student
                <br />
                Model
              </span>
            </div>
          </div>
        </div>
      </div>
      <DiagramSubtitle figureNumber={figureNumber}>{subtitle}</DiagramSubtitle>
    </div>
  )
}

export default KnowledgeDistillationCircles
