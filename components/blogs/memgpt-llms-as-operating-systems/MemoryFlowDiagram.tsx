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
    data: { label: 'User Input' },
    position: { x: 250, y: 0 },
    className: nodeClassName,
  },
  {
    id: '2',
    data: { label: 'Core Memory' },
    position: { x: 80, y: 100 },
    className: nodeClassName,
  },
  {
    id: '3',
    data: { label: 'Recall Memory' },
    position: { x: 250, y: 100 },
    className: nodeClassName,
  },
  {
    id: '4',
    data: { label: 'Archival Memory' },
    position: { x: 420, y: 100 },
    className: nodeClassName,
  },
  {
    id: '5',
    data: { label: 'Context Window' },
    position: { x: 250, y: 200 },
    className: nodeClassName,
  },
  {
    id: '6',
    data: { label: 'LLM Processing' },
    position: { x: 250, y: 300 },
    className: nodeClassName,
  },
  {
    id: '7',
    type: 'output',
    data: { label: 'Response' },
    position: { x: 250, y: 400 },
    className: nodeClassName,
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', className: edgeClassName },
  { id: 'e1-3', source: '1', target: '3', className: edgeClassName },
  { id: 'e1-4', source: '1', target: '4', className: edgeClassName },
  { id: 'e2-5', source: '2', target: '5', className: edgeClassName },
  { id: 'e3-5', source: '3', target: '5', className: edgeClassName },
  { id: 'e4-5', source: '4', target: '5', className: edgeClassName },
  { id: 'e5-6', source: '5', target: '6', animated: true, className: edgeClassName },
  { id: 'e6-7', source: '6', target: '7', animated: true, className: edgeClassName },
]

function MemoryFlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="h-[600px] overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
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

export default MemoryFlowDiagram
