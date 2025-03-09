import React from 'react'

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'note'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

const Callout: React.FC<CalloutProps> = ({ type = 'info', title, children }) => {
  const styles = {
    info: {
      containerClass: 'bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800',
      iconClass: 'text-blue-500 dark:text-blue-400',
      titleClass: 'text-blue-800 dark:text-blue-300',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      containerClass: 'bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800',
      iconClass: 'text-amber-500 dark:text-amber-400',
      titleClass: 'text-amber-800 dark:text-amber-300',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    success: {
      containerClass: 'bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800',
      iconClass: 'text-green-500 dark:text-green-400',
      titleClass: 'text-green-800 dark:text-green-300',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      containerClass: 'bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800',
      iconClass: 'text-red-500 dark:text-red-400',
      titleClass: 'text-red-800 dark:text-red-300',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    note: {
      containerClass: 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700',
      iconClass: 'text-gray-500 dark:text-gray-400',
      titleClass: 'text-gray-800 dark:text-gray-300',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  }

  const currentStyle = styles[type]

  return (
    <div className={`my-6 rounded-lg border p-4 shadow-sm ${currentStyle.containerClass}`}>
      <div className="mb-2 flex items-center">
        <div className={`mr-2 flex-shrink-0 ${currentStyle.iconClass}`}>{currentStyle.icon}</div>
        {title && <h4 className={`m-0 font-medium ${currentStyle.titleClass}`}>{title}</h4>}
      </div>
      <div className="prose-sm w-full text-gray-700 dark:prose-invert dark:text-gray-300">
        {children}
      </div>
    </div>
  )
}

export default Callout
