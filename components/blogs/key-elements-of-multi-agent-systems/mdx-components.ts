import type { MDXComponents } from 'mdx/types'

import { AgentMemory, AgentToolsFlow, MultiAgentCollaboration } from './mdx-components.client'

export const blogMDXComponents = {
  AgentToolsFlow,
  MultiAgentCollaboration,
  AgentMemory,
} satisfies MDXComponents
