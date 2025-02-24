'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Background, Controls, useNodesState, useEdgesState, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

// Dynamically import ReactFlow to avoid SSR issues
const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), {
  ssr: false,
})

// Common styles for nodes
const nodeStyle = {
  background: '#fefde8',
  border: '1px solid #efc003',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  width: 220,
}

// Style for stage header nodes
const headerStyle = {
  background: 'transparent',
  border: 'none',
  padding: '4px',
  fontSize: '16px',
  fontWeight: 'bold',
  width: 220,
  color: 'var(--tw-prose-headings)',
  textAlign: 'center' as const,
}

// Initial nodes configuration
const initialNodes = [
  // Stage Headers
  {
    id: 'header1',
    type: 'default',
    data: { label: 'Stage 1: Cold Start' },
    position: { x: 50, y: -60 },
    style: headerStyle,
  },
  {
    id: 'header2',
    type: 'default',
    data: { label: 'Stage 2: Reasoning RL' },
    position: { x: 350, y: -60 },
    style: headerStyle,
  },
  {
    id: 'header3',
    type: 'default',
    data: { label: 'Stage 3: Rejection & SFT' },
    position: { x: 650, y: -60 },
    style: headerStyle,
  },
  {
    id: 'header4',
    type: 'default',
    data: { label: 'Stage 4: Final RL' },
    position: { x: 950, y: -60 },
    style: headerStyle,
  },

  // Stage 1: Cold Start
  {
    id: '1',
    type: 'input',
    data: {
      label: 'Cold Start Data Collection\n(High-Quality Examples)',
    },
    position: { x: 50, y: 0 },
    style: { ...nodeStyle, height: 80 },
    sourcePosition: Position.Bottom, // Connect from bottom
  },
  {
    id: '2',
    data: {
      label: 'Initial Fine-Tuning on Base Model',
    },
    position: { x: 50, y: 130 },
    style: nodeStyle,
    targetPosition: Position.Top, // Receive at top
    sourcePosition: Position.Right, // Connect to next stage from right
  },

  // Stage 2: Reasoning RL
  {
    id: '3',
    data: {
      label: 'Reasoning-Oriented RL Training\n(Math, Code, Logic)',
    },
    position: { x: 350, y: 60 },
    style: { ...nodeStyle, height: 80 },
    targetPosition: Position.Left, // Receive from left
    sourcePosition: Position.Right, // Connect to next stage from right
  },

  // Stage 3: Rejection Sampling & SFT
  {
    id: '4',
    data: {
      label: 'Rejection Sampling\n(Filter Best Outputs)',
    },
    position: { x: 650, y: 0 },
    style: { ...nodeStyle, height: 80 },
    targetPosition: Position.Left, // Receive from left
    sourcePosition: Position.Bottom, // Connect down to SFT
  },
  {
    id: '5',
    data: {
      label: 'Supervised Fine-Tuning\n(800k Samples)',
    },
    position: { x: 650, y: 130 },
    style: { ...nodeStyle, height: 80 },
    targetPosition: Position.Top, // Receive from above
    sourcePosition: Position.Right, // Connect to final stage from right
  },

  // Stage 4: Final RL
  {
    id: '6',
    type: 'output',
    data: {
      label: 'Final RL Alignment\n(Reasoning + General Tasks)',
    },
    position: { x: 950, y: 60 },
    style: { ...nodeStyle, height: 80 },
    targetPosition: Position.Left, // Receive from left
  },
]

// Edge configurations with labels (remove the stage labels from edges since we now have headers)
const initialEdges = [
  // Stage 1 connections
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#efc003' },
  },

  // To Stage 2
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#efc003' },
  },

  // To Stage 3
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    style: { stroke: '#efc003' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    style: { stroke: '#efc003' },
  },

  // To Stage 4
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    style: { stroke: '#efc003' },
  },
]

interface TrainingPipelineDiagramProps {
  figureNumber?: number
  subtitle?: string
}

export default function TrainingPipelineDiagram({
  figureNumber,
  subtitle,
}: TrainingPipelineDiagramProps) {
  // Use state hooks for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="flex flex-col items-center">
      <div className="h-[400px] w-full overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
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
