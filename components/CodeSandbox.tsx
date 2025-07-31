import React from 'react'

interface CodeSandboxProps {
  id: string
  title: string
}

const CodeSandbox: React.FC<CodeSandboxProps> = ({ id, title }) => {
  return (
    <div className="relative h-0 w-full pb-[56.25%]">
      <iframe
        className="absolute left-0 top-0 mb-4 h-full w-full rounded-lg border-[1px] border-gray-800 dark:border-gray-200"
        title={title}
        src={`https://codesandbox.io/embed/${id}`}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  )
}

export default CodeSandbox
