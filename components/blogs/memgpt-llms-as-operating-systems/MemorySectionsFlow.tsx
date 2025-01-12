'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Background, Controls, useNodesState, useEdgesState } from 'reactflow'
import 'reactflow/dist/style.css'

const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), {
  ssr: false,
})

const nodeClassName =
  'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-md px-4 py-2'
const edgeClassName = 'stroke-gray-400 dark:stroke-gray-500'

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Memory Sections' },
    position: { x: 400, y: 0 },
    className: nodeClassName,
  },
  // Core Memory branch
  {
    id: '2',
    data: { label: 'Core Memory' },
    position: { x: 0, y: 100 },
    className: nodeClassName,
  },
  {
    id: '2a',
    data: { label: 'User Data' },
    position: { x: -100, y: 200 },
    className: nodeClassName,
  },
  {
    id: '2b',
    data: { label: 'Agent State' },
    position: { x: 100, y: 200 },
    className: nodeClassName,
  },
  // Recall Memory branch
  {
    id: '3',
    data: { label: 'Recall Memory' },
    position: { x: 400, y: 100 },
    className: nodeClassName,
  },
  {
    id: '3a',
    data: { label: 'Recent History' },
    position: { x: 275, y: 200 },
    className: nodeClassName,
  },
  {
    id: '3b',
    data: { label: 'Summaries' },
    position: { x: 525, y: 200 },
    className: nodeClassName,
  },
  // Archival Memory branch
  {
    id: '4',
    data: { label: 'Archival Memory' },
    position: { x: 800, y: 100 },
    className: nodeClassName,
  },
  {
    id: '4a',
    data: { label: 'Long-term Storage' },
    position: { x: 700, y: 200 },
    className: nodeClassName,
  },
  {
    id: '4b',
    data: { label: 'Vector Database' },
    position: { x: 900, y: 200 },
    className: nodeClassName,
  },
]

const initialEdges = [
  // Main branches
  { id: 'e1-2', source: '1', target: '2', className: edgeClassName },
  { id: 'e1-3', source: '1', target: '3', className: edgeClassName },
  { id: 'e1-4', source: '1', target: '4', className: edgeClassName },
  // Core Memory sub-branches
  { id: 'e2-2a', source: '2', target: '2a', className: edgeClassName },
  { id: 'e2-2b', source: '2', target: '2b', className: edgeClassName },
  // Recall Memory sub-branches
  { id: 'e3-3a', source: '3', target: '3a', className: edgeClassName },
  { id: 'e3-3b', source: '3', target: '3b', className: edgeClassName },
  // Archival Memory sub-branches
  { id: 'e4-4a', source: '4', target: '4a', className: edgeClassName },
  { id: 'e4-4b', source: '4', target: '4b', className: edgeClassName },
]

function MemorySectionsFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="h-[400px] overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
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
  )
}

export default MemorySectionsFlow
