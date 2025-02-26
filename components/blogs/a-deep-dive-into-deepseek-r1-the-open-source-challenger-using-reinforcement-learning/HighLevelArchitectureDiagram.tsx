'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Background, Controls, useNodesState, useEdgesState } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

// Dynamically import ReactFlow to avoid SSR issues
const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), {
  ssr: false,
})

// Common styles for nodes
const primaryNodeStyle = {
  background: '#fefde8',
  border: '1px solid #efc003',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  width: 200,
}

const secondaryNodeStyle = {
  background: '#f3f8ed',
  border: '1px solid #75b34a',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  width: 200,
}

// Initial nodes configuration
const initialNodes = [
  // Traditional Approach (Left Side) - using secondary colors
  {
    id: '1',
    type: 'input',
    data: { label: 'Self-Supervised Pre-Training' },
    position: { x: 100, y: 0 },
    style: secondaryNodeStyle,
  },
  {
    id: '2',
    data: { label: 'Supervised Fine-Tuning (SFT)' },
    position: { x: 100, y: 100 },
    style: secondaryNodeStyle,
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'RLHF' },
    position: { x: 100, y: 200 },
    style: secondaryNodeStyle,
  },

  // DeepSeek R1 Approach (Right Side) - keeping primary colors
  {
    id: '4',
    type: 'input',
    data: { label: 'Self-Supervised Pre-Training' },
    position: { x: 400, y: 0 },
    style: primaryNodeStyle,
  },
  {
    id: '5',
    data: { label: 'Cold Start Data' },
    position: { x: 400, y: 100 },
    style: primaryNodeStyle,
  },
  {
    id: '6',
    data: { label: 'Pure RL Training' },
    position: { x: 400, y: 200 },
    style: primaryNodeStyle,
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Final RL Alignment' },
    position: { x: 400, y: 300 },
    style: primaryNodeStyle,
  },
]

// Edge configurations
const initialEdges = [
  // Traditional Approach Edges - using secondary color
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#75b34a' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#75b34a' },
  },

  // DeepSeek R1 Approach Edges
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    style: { stroke: '#efc003' },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    style: { stroke: '#efc003' },
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    animated: true,
    style: { stroke: '#efc003' },
  },
]

interface HighLevelArchitectureDiagramProps {
  figureNumber?: number
  subtitle?: string
}

export default function HighLevelArchitectureDiagram({
  figureNumber,
  subtitle,
}: HighLevelArchitectureDiagramProps) {
  // Use state hooks for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="flex flex-col items-center">
      <div className="h-[500px] w-full overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          className="bg-gray-50 dark:bg-gray-900"
        >
          <Background className="bg-gray-100 dark:bg-gray-800" />
          <Controls className="border-2 border-gray-200 bg-white fill-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:fill-gray-400" />
        </ReactFlow>
      </div>
      <DiagramSubtitle figureNumber={figureNumber}>{subtitle}</DiagramSubtitle>
    </div>
  )
}
