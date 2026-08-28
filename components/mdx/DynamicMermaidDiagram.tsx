'use client'

import dynamic from 'next/dynamic'

const DynamicMermaidDiagram = dynamic(() => import('../MermaidDiagram'))

export default DynamicMermaidDiagram
