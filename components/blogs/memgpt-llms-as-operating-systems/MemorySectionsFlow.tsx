'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Background, Controls, useNodesState, useEdgesState, Position } from 'reactflow'
import 'reactflow/dist/style.css'

const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), {
  ssr: false,
})

const nodeStyle = {
  background: '#fefde8',
  border: '1px solid #efc003',
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  width: 150,
}

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Memory Sections' },
    position: { x: 400, y: 0 },
    style: nodeStyle,
  },
  // Core Memory branch
  {
    id: '2',
    data: { label: 'Core Memory' },
    position: { x: 0, y: 100 },
    style: nodeStyle,
  },
  {
    id: '2a',
    data: { label: 'User Data' },
    position: { x: -100, y: 200 },
    style: nodeStyle,
  },
  {
    id: '2b',
    data: { label: 'Agent State' },
    position: { x: 100, y: 200 },
    style: nodeStyle,
  },
  // Recall Memory branch
  {
    id: '3',
    data: { label: 'Recall Memory' },
    position: { x: 400, y: 100 },
    style: nodeStyle,
  },
  {
    id: '3a',
    data: { label: 'Recent History' },
    position: { x: 275, y: 200 },
    style: nodeStyle,
  },
  {
    id: '3b',
    data: { label: 'Summaries' },
    position: { x: 525, y: 200 },
    style: nodeStyle,
  },
  // Archival Memory branch
  {
    id: '4',
    data: { label: 'Archival Memory' },
    position: { x: 800, y: 100 },
    style: nodeStyle,
  },
  {
    id: '4a',
    data: { label: 'Long-term Storage' },
    position: { x: 700, y: 200 },
    style: nodeStyle,
  },
  {
    id: '4b',
    data: { label: 'Vector Database' },
    position: { x: 900, y: 200 },
    style: nodeStyle,
  },
]

const initialEdges = [
  // Main branches
  { id: 'e1-2', source: '1', target: '2', style: { stroke: '#efc003' } },
  { id: 'e1-3', source: '1', target: '3', style: { stroke: '#efc003' } },
  { id: 'e1-4', source: '1', target: '4', style: { stroke: '#efc003' } },
  // Core Memory sub-branches
  { id: 'e2-2a', source: '2', target: '2a', style: { stroke: '#efc003' } },
  { id: 'e2-2b', source: '2', target: '2b', style: { stroke: '#efc003' } },
  // Recall Memory sub-branches
  { id: 'e3-3a', source: '3', target: '3a', style: { stroke: '#efc003' } },
  { id: 'e3-3b', source: '3', target: '3b', style: { stroke: '#efc003' } },
  // Archival Memory sub-branches
  { id: 'e4-4a', source: '4', target: '4a', style: { stroke: '#efc003' } },
  { id: 'e4-4b', source: '4', target: '4b', style: { stroke: '#efc003' } },
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
