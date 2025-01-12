import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

// DSPy Blog Components
import DspyWorkflowDiagram from './blogs/dspy-programming-not-prompting-your-lms/DspyWorkflowDiagram'
import DspyVsTraditionalDiagram from './blogs/dspy-programming-not-prompting-your-lms/DspyVsTraditionalDiagram'
import CompleteDspyEcosystemDiagram from './blogs/dspy-programming-not-prompting-your-lms/CompleteDspyEcosystemDiagram'

// MemGPT Blog Components
import {
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
} from './blogs/memgpt-llms-as-operating-systems/index'

// Core MDX Components
const coreMDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}

// Blog-specific Components
const dspyBlogComponents = {
  DspyWorkflowDiagram,
  DspyVsTraditionalDiagram,
  CompleteDspyEcosystemDiagram,
}

const memGPTBlogComponents = {
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
}

export const components: MDXComponents = {
  ...coreMDXComponents,
  ...dspyBlogComponents,
  ...memGPTBlogComponents,
}
