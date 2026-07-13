'use client'

import dynamic from 'next/dynamic'

export const AgentMemory = dynamic(() => import('./AgentMemory'))
export const AgentToolsFlow = dynamic(() => import('./AgentToolsFlows'))
export const MultiAgentCollaboration = dynamic(() => import('./MultiAgentCollaboration'))
