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
    data: { label: 'Complex Task' },
    position: { x: 250, y: 0 },
    className: nodeClassName,
    sourcePosition: 'bottom',
  },
  {
    id: '2',
    data: { label: 'Task Decomposition' },
    position: { x: 250, y: 100 },
    className: nodeClassName,
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: '3',
    data: { label: 'Memory Search' },
    position: { x: 100, y: 200 },
    className: nodeClassName,
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: '4',
    data: { label: 'Tool Usage' },
    position: { x: 250, y: 200 },
    className: nodeClassName,
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: '5',
    data: { label: 'Context Integration' },
    position: { x: 400, y: 200 },
    className: nodeClassName,
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'Solution Synthesis' },
    position: { x: 250, y: 300 },
    className: nodeClassName,
    targetPosition: 'top',
  },
]

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    className: edgeClassName,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    className: edgeClassName,
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    className: edgeClassName,
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    className: edgeClassName,
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    className: edgeClassName,
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    className: edgeClassName,
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    className: edgeClassName,
  },
]

function ComplexTaskFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="h-[500px] overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
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

export default ComplexTaskFlow
