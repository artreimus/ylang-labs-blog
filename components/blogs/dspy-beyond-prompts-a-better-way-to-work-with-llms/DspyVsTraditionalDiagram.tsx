'use client'

import React from 'react'
import ReactFlow, { Node, Edge, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

const nodes: Node[] = [
  // Title Nodes
  {
    id: 'dspy-title',
    type: 'input',
    data: { label: 'DSPy Approach' },
    position: { x: 100, y: 0 },
    style: {
      background: '#e3f0d7',
      border: '2px solid #75b34a',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      width: 200,
    },
  },
  {
    id: 'traditional-title',
    type: 'input',
    data: { label: 'Traditional Prompt Engineering' },
    position: { x: 500, y: 0 },
    style: {
      background: '#fffdc2',
      border: '2px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      width: 200,
    },
  },

  // DSPy Nodes
  {
    id: 'signatures',
    data: { label: 'Signatures\n(Type-Safe Interfaces)' },
    position: { x: 100, y: 100 },
    style: {
      background: '#e3f0d7',
      border: '1px solid #75b34a',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'modules',
    data: { label: 'Modular Components\n(Reusable & Composable)' },
    position: { x: 100, y: 200 },
    style: {
      background: '#e3f0d7',
      border: '1px solid #75b34a',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'optimization',
    data: { label: 'Systematic Optimization\n(Data-Driven & Automated)' },
    position: { x: 100, y: 300 },
    style: {
      background: '#e3f0d7',
      border: '1px solid #75b34a',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'dspy-result',
    type: 'output',
    data: { label: 'Maintainable & Scalable System' },
    position: { x: 100, y: 400 },
    style: {
      background: '#e3f0d7',
      border: '1px solid #75b34a',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
    },
  },

  // Traditional Nodes
  {
    id: 'manual-prompts',
    data: { label: 'Manual Prompt Crafting\n(Trial & Error)' },
    position: { x: 500, y: 100 },
    style: {
      background: '#fffdc2',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'brittle',
    data: { label: 'Brittle Solutions\n(Sensitive to Changes)' },
    position: { x: 500, y: 200 },
    style: {
      background: '#fffdc2',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'manual-optimization',
    data: { label: 'Manual Optimization\n(Time-Consuming)' },
    position: { x: 500, y: 300 },
    style: {
      background: '#fffdc2',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'traditional-result',
    type: 'output',
    data: { label: 'Limited Scalability & Maintenance' },
    position: { x: 500, y: 400 },
    style: {
      background: '#fffdc2',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
    },
  },
]

const edges: Edge[] = [
  // DSPy edges
  {
    id: 'e-dspy-1',
    source: 'signatures',
    target: 'modules',
    animated: true,
    style: { stroke: '#75b34a' },
  },
  {
    id: 'e-dspy-2',
    source: 'modules',
    target: 'optimization',
    animated: true,
    style: { stroke: '#75b34a' },
  },
  {
    id: 'e-dspy-3',
    source: 'optimization',
    target: 'dspy-result',
    animated: true,
    style: { stroke: '#75b34a' },
  },

  // Traditional edges
  {
    id: 'e-trad-1',
    source: 'manual-prompts',
    target: 'brittle',
    animated: true,
    style: { stroke: '#efc003' },
  },
  {
    id: 'e-trad-2',
    source: 'brittle',
    target: 'manual-optimization',
    animated: true,
    style: { stroke: '#efc003' },
  },
  {
    id: 'e-trad-3',
    source: 'manual-optimization',
    target: 'traditional-result',
    animated: true,
    style: { stroke: '#efc003' },
  },
]

export default function DspyVsTraditionalDiagram() {
  return (
    <div className="flex flex-col items-center">
      <div style={{ width: '100%', height: '500px' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition="bottom-right">
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <DiagramSubtitle>
        Figure: Comparison of DSPy's programmatic approach with traditional prompt engineering,
        highlighting key differences in methodology and outcomes
      </DiagramSubtitle>
    </div>
  )
}
