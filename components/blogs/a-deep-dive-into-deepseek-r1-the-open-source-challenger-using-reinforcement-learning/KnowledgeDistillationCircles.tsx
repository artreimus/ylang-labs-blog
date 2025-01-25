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
      <div className="rounded-xl bg-white/50 p-8 shadow-md backdrop-blur-sm dark:bg-gray-900/50">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          Knowledge Distillation Process
        </h2>
        <div className="flex items-center justify-center space-x-12">
          {/* Teacher Model */}
          <div className="relative">
            <div className="flex h-64 w-64 transform items-center justify-center rounded-full bg-primary-500 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="text-center text-xl font-semibold text-white">
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
            className="mx-4 h-16 w-16 text-black dark:text-white"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>

          {/* Student Model */}
          <div className="relative">
            <div className="flex h-48 w-48 transform items-center justify-center rounded-full bg-secondary-500 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="text-center text-xl font-semibold text-white">
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
