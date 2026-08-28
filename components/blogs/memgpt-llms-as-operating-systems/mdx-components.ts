import type { MDXComponents } from 'mdx/types'

import {
  ChatHistoryFlow,
  ComplexTaskFlow,
  CompressionFlow,
  ContextCompilationFlow,
  HeartbeatFlow,
  InnerThoughtsFlow,
  MemoryFlowDiagram,
  MemorySectionsFlow,
  ResourceUtilizationFlow,
  SearchRetrievalFlow,
  SelfEditingMemoryFlow,
  SessionStateFlow,
} from './index'

export const blogMDXComponents = {
  ChatHistoryFlow,
  MemorySectionsFlow,
  MemoryFlowDiagram,
  InnerThoughtsFlow,
  HeartbeatFlow,
  SelfEditingMemoryFlow,
  ContextCompilationFlow,
  SearchRetrievalFlow,
  CompressionFlow,
  SessionStateFlow,
  ComplexTaskFlow,
  ResourceUtilizationFlow,
} satisfies MDXComponents
