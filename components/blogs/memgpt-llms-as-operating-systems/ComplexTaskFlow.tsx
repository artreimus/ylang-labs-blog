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
    data: { label: 'Complex Task' },
    position: { x: 250, y: 0 },
    style: nodeStyle,
  },
  {
    id: '2',
    data: { label: 'Task Decomposition' },
    position: { x: 250, y: 100 },
    style: nodeStyle,
  },
  {
    id: '3',
    data: { label: 'Memory Search' },
    position: { x: 100, y: 200 },
    style: nodeStyle,
  },
  {
    id: '4',
    data: { label: 'Tool Usage' },
    position: { x: 250, y: 200 },
    style: nodeStyle,
  },
  {
    id: '5',
    data: { label: 'Context Integration' },
    position: { x: 400, y: 200 },
    style: nodeStyle,
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'Solution Synthesis' },
    position: { x: 250, y: 300 },
    style: nodeStyle,
  },
]

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#efc003' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    style: { stroke: '#efc003' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    style: { stroke: '#efc003' },
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    style: { stroke: '#efc003' },
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    style: { stroke: '#efc003' },
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    style: { stroke: '#efc003' },
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    style: { stroke: '#efc003' },
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
