'use client'

import React from 'react'
import ReactFlow, { Node, Edge, Controls, Background, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

// Node configuration with consistent styling
const nodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Planner\n(Initial Pass)' },
    position: { x: 250, y: 0 },
    style: {
      background: '#fefde8', // Light yellow background
      border: '1px solid #efc003', // Gold border
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      textAlign: 'center',
      whiteSpace: 'pre-line', // Allows line breaks in label
    },
  },
  {
    id: '2',
    data: { label: 'Writer\n(First Draft)' },
    position: { x: 250, y: 150 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    style: {
      background: '#fefde8', // Light yellow background
      border: '1px solid #efc003', // Gold border
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      textAlign: 'center',
      whiteSpace: 'pre-line',
    },
  },
  {
    id: '3',
    data: { label: 'Reviewer' },
    position: { x: 250, y: 300 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    style: {
      background: '#fefde8', // Light yellow background
      border: '1px solid #efc003', // Gold border
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      textAlign: 'center',
      whiteSpace: 'pre-line',
    },
  },
]

// Edge configuration with animations and labels
const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#efc003' }, // Gold stroke
    label: 'Initial Outline',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#efc003' },
    label: 'First Draft',
  },
]

export default function MultiAgentCollaboration() {
  return (
    <div className="my-8 flex flex-col items-center">
      <div style={{ width: '100%', height: '800px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          attributionPosition="bottom-right"
          // Disable node dragging for blog post
          nodesDraggable={false}
          // Disable zoom/pan for blog post
          zoomOnScroll={false}
          panOnScroll={false}
          preventScrolling={true}
        >
          <Controls showInteractive={false} />
          <Background color="#efc003" gap={16} /> {/* Gold background dots */}
        </ReactFlow>
      </div>
      <DiagramSubtitle>
        Figure: Multi-Agent Writing System showing collaboration between Planner, Writer, and
        Reviewer agents with feedback loops for continuous improvement
      </DiagramSubtitle>
    </div>
  )
}
