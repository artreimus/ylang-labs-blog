import TOCInline from 'pliny/ui/TOCInline'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import DiagramDisplay from './DiagramDisplay'
import Callout from './Callout'
import MdxPre from './MdxPre'
import MermaidDiagram from './MermaidDiagram'

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

// RAG Triad Blog Components
import RAGTriad from './blogs/rag-triad-building-trust-in-rag-through-systematic-evaluation/RAGTriad'
import DiagramSubtitle from './DiagramSubtitle'

// Pydantic Blog Components
import SchemasAsAPIDialectsDiagram from './blogs/building-reliable-llm-workflows-with-pydantic/SchemasAsAPIDialectsDiagram'

// DeepSeek Blog Components
import HighLevelArchitectureDiagram from './blogs/a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning/HighLevelArchitectureDiagram'
import TrainingPipelineDiagram from './blogs/a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning/TrainingPipelineDiagram'
import KnowledgeDistillationCircles from './blogs/a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning/KnowledgeDistillationCircles'
import BenchmarkChart from './blogs/a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning/BenchmarkChart'

// Multi-Agent Systems Blog Components
import AgentToolsFlow from './blogs/key-elements-of-multi-agent-systems/AgentToolsFlows'
import MultiAgentCollaboration from './blogs/key-elements-of-multi-agent-systems/MultiAgentCollaboration'
import AgentMemory from './blogs/key-elements-of-multi-agent-systems/AgentMemory'

// Core MDX Components
const coreMDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: MdxPre,
  table: TableWrapper,
  BlogNewsletterForm,
  DiagramSubtitle,
  DiagramDisplay,
  Callout,
  MermaidDiagram,
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

const ragTriadBlogComponents = {
  RAGTriad,
}

const pydanticBlogComponents = {
  SchemasAsAPIDialectsDiagram,
}

// DeepSeek Blog Components
const deepSeekBlogComponents = {
  HighLevelArchitectureDiagram,
  TrainingPipelineDiagram,
  KnowledgeDistillationCircles,
  BenchmarkChart,
}

const multiAgentBlogComponents = {
  AgentToolsFlow,
  MultiAgentCollaboration,
  AgentMemory,
}

export const components: MDXComponents = {
  ...coreMDXComponents,
  ...dspyBlogComponents,
  ...memGPTBlogComponents,
  ...ragTriadBlogComponents,
  ...pydanticBlogComponents,
  ...deepSeekBlogComponents,
  ...multiAgentBlogComponents,
}
