'use client'

import React from 'react'
import ReactFlow, { Node, Edge, Controls, Background } from 'reactflow'
import 'reactflow/dist/style.css'
import DiagramSubtitle from '@/components/DiagramSubtitle'

const nodes: Node[] = [
  // Programming Layer
  {
    id: 'programming',
    type: 'input',
    data: { label: 'Programming Layer' },
    position: { x: 400, y: 0 },
    style: {
      background: '#fefde8',
      border: '2px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  },

  // Core Components
  {
    id: 'signatures',
    data: { label: 'Signatures\n(Input/Output Behavior)' },
    position: { x: 200, y: 80 },
    style: {
      background: '#fffdc2',
      border: '2px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'modules',
    data: { label: 'Modules\n(LM Programs)' },
    position: { x: 600, y: 110 },
    style: {
      background: '#fffdc2',
      border: '2px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
      whiteSpace: 'pre-wrap',
    },
  },

  // Evaluation Layer
  {
    id: 'evaluation',
    data: { label: 'Evaluation Layer' },
    position: { x: 400, y: 220 },
    style: {
      background: '#f3f8ed',
      border: '2px solid #75b34a',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
    },
  },

  // Evaluation Components
  {
    id: 'metrics',
    data: { label: 'Metrics\n(Performance Assessment)' },
    position: { x: 200, y: 320 },
    style: {
      background: '#e3f0d7',
      border: '1px solid #75b34a',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      width: 140,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'devset',
    data: { label: 'Validation Set\n(Test Examples)' },
    position: { x: 600, y: 320 },
    style: {
      background: '#e3f0d7',
      border: '1px solid #75b34a',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      width: 140,
      whiteSpace: 'pre-wrap',
    },
  },

  // Optimization Layer
  {
    id: 'optimization',
    data: { label: 'Optimization Layer' },
    position: { x: 400, y: 400 },
    style: {
      background: '#fefde8',
      border: '2px solid #efc003',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
    },
  },

  // Optimization Components
  {
    id: 'trainset',
    data: { label: 'Training Set\n(Examples for Optimization)' },
    position: { x: 200, y: 480 },
    style: {
      background: '#fffdc2',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      width: 140,
      whiteSpace: 'pre-wrap',
    },
  },
  {
    id: 'optimizer',
    data: { label: 'Optimizer\n(Prompts & Weights)' },
    position: { x: 600, y: 480 },
    style: {
      background: '#fffdc2',
      border: '1px solid #efc003',
      borderRadius: '8px',
      padding: '8px',
      fontSize: '12px',
      width: 140,
      whiteSpace: 'pre-wrap',
    },
  },

  // Final Output
  {
    id: 'output',
    type: 'output',
    data: { label: 'Optimized LM Program' },
    position: { x: 400, y: 630 },
    style: {
      background: '#c9e3b3',
      border: '2px solid #75b34a',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '14px',
      width: 180,
      whiteSpace: 'pre-wrap',
    },
  },
]

const edges: Edge[] = [
  // Programming Layer Flow
  {
    id: 'e-prog-sig',
    source: 'programming',
    target: 'signatures',
    animated: true,
    style: { stroke: '#efc003' },
  },
  {
    id: 'e-prog-mod',
    source: 'programming',
    target: 'modules',
    animated: true,
    style: { stroke: '#efc003' },
  },

  // Core Components Flow
  {
    id: 'e-sig-mod',
    source: 'signatures',
    target: 'modules',
    animated: true,
    style: { stroke: '#efc003' },
  },

  // Flow to Evaluation
  {
    id: 'e-mod-eval',
    source: 'modules',
    target: 'evaluation',
    animated: true,
    style: { stroke: '#75b34a' },
  },

  // Evaluation Components
  { id: 'e-eval-metrics', source: 'evaluation', target: 'metrics', style: { stroke: '#75b34a' } },
  { id: 'e-eval-devset', source: 'evaluation', target: 'devset', style: { stroke: '#75b34a' } },

  // Flow to Optimization
  {
    id: 'e-eval-opt',
    source: 'evaluation',
    target: 'optimization',
    animated: true,
    style: { stroke: '#efc003' },
  },

  // Optimization Components
  { id: 'e-opt-train', source: 'optimization', target: 'trainset', style: { stroke: '#efc003' } },
  {
    id: 'e-opt-optimizer',
    source: 'optimization',
    target: 'optimizer',
    style: { stroke: '#efc003' },
  },
  {
    id: 'e-train-out',
    source: 'trainset',
    target: 'output',
    animated: true,
    style: { stroke: '#75b34a' },
  },
  {
    id: 'e-optimizer-out',
    source: 'optimizer',
    target: 'output',
    animated: true,
    style: { stroke: '#75b34a' },
  },
]

export default function CompleteDspyEcosystemDiagram() {
  return (
    <div className="flex flex-col items-center">
      <div style={{ width: '100%', height: '720px' }}>
        <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition="bottom-right">
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <DiagramSubtitle>
        Figure: The complete DSPy ecosystem, illustrating the three main stages of building AI
        systems: Programming Layer, Evaluation Layer, and Optimization Layer
      </DiagramSubtitle>
    </div>
  )
}
