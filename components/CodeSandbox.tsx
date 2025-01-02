import React from 'react'

interface CodeSandboxProps {
  id: string
  title: string
}

const CodeSandbox: React.FC<CodeSandboxProps> = ({ id, title }) => {
  return (
    <iframe
      style={{
        width: '100%',
        height: 900,
        outline: '1px solid #252525',
        border: 0,
        borderRadius: 8,
        marginBottom: 16,
        zIndex: 100,
      }}
      title="CodeSandbox"
      src={`https://codesandbox.io/embed/${id}`}
    ></iframe>
  )
}

export default CodeSandbox
