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
    data: { label: 'Active Session' },
    position: { x: 250, y: 0 },
    className: nodeClassName,
  },
  {
    id: '2',
    data: { label: 'State Capture' },
    position: { x: 250, y: 100 },
    className: nodeClassName,
  },
  {
    id: '3',
    data: { label: 'Persistence Layer' },
    position: { x: 250, y: 200 },
    className: nodeClassName,
  },
  {
    id: '4',
    data: { label: 'State Recovery' },
    position: { x: 250, y: 300 },
    className: nodeClassName,
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'New Session' },
    position: { x: 250, y: 400 },
    className: nodeClassName,
  },
]

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    label: 'Serialize',
    className: edgeClassName,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    label: 'Store',
    className: edgeClassName,
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    label: 'Load',
    className: edgeClassName,
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    label: 'Initialize',
    className: edgeClassName,
  },
]

function SessionStateFlow() {
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

export default SessionStateFlow
