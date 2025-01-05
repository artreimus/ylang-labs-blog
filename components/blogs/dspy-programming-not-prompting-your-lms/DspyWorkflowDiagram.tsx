'use client'

import React from 'react'
import ReactFlow, { Node, Edge, Controls, Background, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

const nodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Signatures' },
    position: { x: 250, y: 0 },
    style: {
      background: '#fefde8',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 150,
    },
  },
  {
    id: '2',
    data: { label: 'Modules' },
    position: { x: 250, y: 100 },
    style: {
      background: '#fffdc2',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 150,
    },
  },
  {
    id: '3',
    data: { label: 'Optimizers' },
    position: { x: 250, y: 200 },
    style: {
      background: '#fff787',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 150,
    },
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Optimized LLM Application' },
    position: { x: 250, y: 300 },
    style: {
      background: '#ffd702',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 150,
    },
  },
]

const edges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#efc003' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#efc003' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#efc003' } },
]

export default function DspyWorkflowDiagram() {
  return (
    <div className="flex flex-col items-center">
      <div style={{ width: '100%', height: '400px' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition="bottom-right">
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <DiagramSubtitle>
        Figure: The DSPy workflow, showing how Signatures, Modules, and Optimizers work together to
        create robust LLM applications
      </DiagramSubtitle>
    </div>
  )
}
