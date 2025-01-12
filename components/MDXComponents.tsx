import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import DspyWorkflowDiagram from './blogs/dspy-programming-not-prompting-your-lms/DspyWorkflowDiagram'
import DspyVsTraditionalDiagram from './blogs/dspy-programming-not-prompting-your-lms/DspyVsTraditionalDiagram'
import CompleteDspyEcosystemDiagram from './blogs/dspy-programming-not-prompting-your-lms/CompleteDspyEcosystemDiagram'
import dynamic from 'next/dynamic'

const ChatHistoryFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/ChatHistoryFlow'),
  {
    ssr: false,
  }
)

const MemorySectionsFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/MemorySectionsFlow'),
  {
    ssr: false,
  }
)

const MemoryFlowDiagram = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/MemoryFlowDiagram'),
  {
    ssr: false,
  }
)

const InnerThoughtsFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/InnerThoughtsFlow'),
  {
    ssr: false,
  }
)

const HeartbeatFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/HeartbeatFlow'),
  {
    ssr: false,
  }
)

const SelfEditingMemoryFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/SelfEditingMemoryFlow'),
  {
    ssr: false,
  }
)

const ContextCompilationFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/ContextCompilationFlow'),
  {
    ssr: false,
  }
)

const SearchRetrievalFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/SearchRetrievalFlow'),
  {
    ssr: false,
  }
)

const CompressionFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/CompressionFlow'),
  {
    ssr: false,
  }
)

const SessionStateFlow = dynamic(
  () => import('./blogs/memgpt-llms-as-operating-systems/SessionStateFlow'),
  {
    ssr: false,
  }
)

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  DspyWorkflowDiagram,
  DspyVsTraditionalDiagram,
  CompleteDspyEcosystemDiagram,
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
}
