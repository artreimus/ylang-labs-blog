'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Background, Controls, useNodesState, useEdgesState, Position, Edge, Node } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

const ReactFlow = dynamic(() => import('reactflow').then((m) => m.default), {
  ssr: false,
})

const colorPrimary = '#efc003' // primary-500
const colorSecondary = '#75b34a' // secondary-500 (unused after color unification)
const colorBlue = '#2196f3' // (unused after color unification)
const colorGray = '#64748b' // (unused after color unification)

const baseNodeStyle = {
  borderRadius: 8,
  padding: 10,
  fontSize: 14,
  width: 180,
}

// Unified styling per request: all nodes use #fefde8 background and 2px solid #efc003 border
const uniformNodeStyle = {
  ...baseNodeStyle,
  background: '#fefde8',
  border: `2px solid ${colorPrimary}`,
}

const promptNodeStyle = { ...uniformNodeStyle }
const wrapperNodeStyle = { ...uniformNodeStyle }
const providerNodeStyle = { ...uniformNodeStyle }
const validatedNodeStyle = { ...uniformNodeStyle }

const initialNodes: Node[] = [
  {
    id: 'prompt-schema',
    data: { label: 'Prompt & Schema' },
    position: { x: 10, y: 140 },
    style: promptNodeStyle,
    sourcePosition: Position.Right,
  },
  {
    id: 'provider-wrapper',
    data: { label: 'Provider Wrapper' },
    position: { x: 290, y: 140 },
    style: wrapperNodeStyle,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: 'anthropic',
    data: { label: 'Anthropic Claude' },
    position: { x: 580, y: 40 },
    style: providerNodeStyle,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: 'openai',
    data: { label: 'OpenAI GPT-5' },
    position: { x: 580, y: 140 },
    style: providerNodeStyle,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: 'pydantic-ai',
    data: { label: 'Gemini / Claude / GPT' },
    position: { x: 580, y: 240 },
    style: providerNodeStyle,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: 'validated',
    data: { label: 'Validated Model' },
    position: { x: 850, y: 140 },
    style: validatedNodeStyle,
    targetPosition: Position.Left,
  },
]

const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'prompt-schema',
    target: 'provider-wrapper',
    style: { stroke: colorPrimary, strokeWidth: 2 },
    label: 'schema + prompt',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
  },
  {
    id: 'e2',
    source: 'provider-wrapper',
    target: 'anthropic',
    label: 'Instructor',
    style: { stroke: colorPrimary, strokeWidth: 2 },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
  },
  {
    id: 'e3',
    source: 'provider-wrapper',
    target: 'openai',
    label: 'OpenAI JSON',
    style: { stroke: colorPrimary, strokeWidth: 2 },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
  },
  {
    id: 'e4',
    source: 'provider-wrapper',
    target: 'pydantic-ai',
    label: 'Pydantic AI',
    style: { stroke: colorPrimary, strokeWidth: 2 },
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
  },
  {
    id: 'e5',
    source: 'anthropic',
    target: 'validated',
    style: { stroke: colorPrimary, strokeWidth: 2 },
  },
  {
    id: 'e6',
    source: 'openai',
    target: 'validated',
    style: { stroke: colorPrimary, strokeWidth: 2 },
  },
  {
    id: 'e7',
    source: 'pydantic-ai',
    target: 'validated',
    style: { stroke: colorPrimary, strokeWidth: 2 },
  },
]

export default function SchemasAsAPIDialectsDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="my-4">
      <div className="h-[420px] w-full overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700">
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
      <DiagramSubtitle>
        Figure: Stable schema across provider dialects, producing a validated model
      </DiagramSubtitle>
    </div>
  )
}
