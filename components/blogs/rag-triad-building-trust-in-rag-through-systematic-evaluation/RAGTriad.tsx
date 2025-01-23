'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Background, Controls, useNodesState, useEdgesState, Position, Edge, Node } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

// Dynamic import of ReactFlow to ensure it works with Next.js SSR
const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), {
  ssr: false,
})

// -- Color palette (Feel free to adjust to your primary/secondary colors) --
const colorPrimary = '#efc003' // primary-500
const colorSecondary = '#75b34a' // secondary-500
const colorBlue = '#2196f3'

const queryNodeStyle = {
  background: '#fefde8', // primary-50
  border: `2px solid ${colorPrimary}`,
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  width: 150,
}

const responseNodeStyle = {
  background: '#e3f2fd', // light blue background
  border: `2px solid ${colorBlue}`,
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  width: 150,
}

const contextNodeStyle = {
  background: '#f3f8ed', // secondary-50
  border: `2px solid ${colorSecondary}`,
  borderRadius: '8px',
  padding: '10px',
  fontSize: '14px',
  width: 150,
}

// -- Initial Node Definitions --------------------------------------------
// This array defines the nodes (boxes) in the diagram, including their labels,
// positions, and styles. Node positioning (x, y) is manually configured here
// for clarity.
const initialNodes: Node[] = [
  {
    id: 'query',
    data: { label: 'Query' },
    position: { x: 300, y: 0 },
    style: queryNodeStyle,
    sourcePosition: Position.Bottom,
    targetPosition: Position.Bottom,
  },
  {
    id: 'response',
    data: { label: 'Response' },
    position: { x: 100, y: 200 },
    style: responseNodeStyle,
    targetPosition: Position.Top,
    sourcePosition: Position.Right,
  },
  {
    id: 'context',
    data: { label: 'Context' },
    position: { x: 500, y: 200 },
    style: contextNodeStyle,
    targetPosition: Position.Left,
    sourcePosition: Position.Top,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'query-response',
    source: 'query',
    target: 'response',
    label: 'Answer Relevance',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    style: { stroke: colorPrimary },
  },
  {
    id: 'context-query',
    source: 'context',
    target: 'query',
    label: 'Context Relevance',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    style: { stroke: colorSecondary },
  },
  {
    id: 'response-context',
    source: 'response',
    target: 'context',
    label: 'Groundedness',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    style: { stroke: colorBlue },
  },
]

// -- RAGFlowDiagram Component ---------------------------------------------
// This functional component wraps the React Flow diagram. It manages the
// nodes and edges as state, and is easily reusable in other parts of the app.
export default function RAGTriad() {
  // Using React Flow's custom hooks to manage node and edge state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="my-4">
      <div className="h-[400px] w-full overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
        <ReactFlow
          // Render the nodes and edges
          nodes={nodes}
          edges={edges}
          // onNodesChange and onEdgesChange let us dynamically update the diagram
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          className="bg-gray-50 dark:bg-gray-900"
        >
          {/* Background and Controls provide additional UI for zoom/pan */}
          <Background className="bg-gray-100 dark:bg-gray-800" />
          <Controls className="border-2 border-gray-200 bg-white fill-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:fill-gray-400" />
        </ReactFlow>
      </div>
      <DiagramSubtitle>
        Figure: The RAG Triad: Three key metrics for evaluating RAG systems
      </DiagramSubtitle>
    </div>
  )
}
