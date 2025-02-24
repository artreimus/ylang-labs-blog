'use client'

import React from 'react'
import ReactFlow, { Node, Edge, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

// Node configuration with consistent styling
const nodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Agent Identifies Tool Need' },
    position: { x: 250, y: 0 },
    style: {
      background: '#fefde8', // Light yellow background
      border: '1px solid #efc003', // Gold border
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
      textAlign: 'center',
    },
  },
  {
    id: '2',
    data: { label: 'Agent Uses Tool' },
    position: { x: 250, y: 150 },
    style: {
      background: '#fefde8', // Light yellow background
      border: '1px solid #efc003', // Gold border
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
      textAlign: 'center',
    },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Agent Verifies Response' },
    position: { x: 250, y: 300 },
    style: {
      background: '#fefde8', // Light yellow background
      border: '1px solid #efc003', // Gold border
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
      textAlign: 'center',
    },
  },
]

// Edge configuration with animations
const edges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#efc003' }, // Gold stroke
    label: 'Tool Request',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    style: { stroke: '#efc003' }, // Gold stroke
    label: 'Tool Output',
  },
]

export default function AgentToolsFlow() {
  return (
    <div className="my-8 flex flex-col items-center">
      <div style={{ width: '100%', height: '400px' }}>
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
        Figure: Tool Usage Flow showing how an agent identifies a need for a tool, uses a tool, and
        verifies the results
      </DiagramSubtitle>
    </div>
  )
}
