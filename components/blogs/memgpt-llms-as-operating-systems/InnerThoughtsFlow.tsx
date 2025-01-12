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
    data: { label: 'Input Processing' },
    position: { x: 0, y: 100 },
    className: nodeClassName,
    sourcePosition: 'right',
  },
  {
    id: '2',
    data: { label: 'Inner Monologue' },
    position: { x: 200, y: 100 },
    className: nodeClassName,
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '3',
    data: { label: 'Memory Check' },
    position: { x: 400, y: 50 },
    className: nodeClassName,
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '4',
    data: { label: 'Tool Usage' },
    position: { x: 400, y: 100 },
    className: nodeClassName,
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '5',
    data: { label: 'Response Planning' },
    position: { x: 400, y: 150 },
    className: nodeClassName,
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'Final Response' },
    position: { x: 600, y: 100 },
    className: nodeClassName,
    targetPosition: 'left',
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', className: edgeClassName },
  { id: 'e2-3', source: '2', target: '3', className: edgeClassName },
  { id: 'e2-4', source: '2', target: '4', className: edgeClassName },
  { id: 'e2-5', source: '2', target: '5', className: edgeClassName },
  { id: 'e3-6', source: '3', target: '6', className: edgeClassName },
  { id: 'e4-6', source: '4', target: '6', className: edgeClassName },
  { id: 'e5-6', source: '5', target: '6', className: edgeClassName },
]

function InnerThoughtsFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="h-[300px] overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
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

export default InnerThoughtsFlow
