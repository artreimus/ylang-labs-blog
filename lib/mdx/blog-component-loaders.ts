import type { MDXComponents } from 'mdx/types'

type BlogComponentModule = {
  blogMDXComponents: MDXComponents
}

type BlogComponentRegistryEntry = {
  componentNames: readonly string[]
  load: () => Promise<BlogComponentModule>
}

/**
 * Literal import paths keep every article registry visible to the bundler while
 * preserving one async boundary per component family.
 */
export const blogComponentRegistry = {
  'a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning': {
    componentNames: [
      'HighLevelArchitectureDiagram',
      'TrainingPipelineDiagram',
      'KnowledgeDistillationCircles',
      'BenchmarkChart',
    ],
    load: () =>
      import(
        '../../components/blogs/a-deep-dive-into-deepseek-r1-the-open-source-challenger-using-reinforcement-learning/mdx-components'
      ),
  },
  'building-reliable-llm-workflows-with-pydantic': {
    componentNames: ['SchemasAsAPIDialectsDiagram'],
    load: () =>
      import('../../components/blogs/building-reliable-llm-workflows-with-pydantic/mdx-components'),
  },
  'context-engineering-for-ai-agents': {
    componentNames: ['MemoryArchitecture', 'ProcessFlow'],
    load: () => import('../../components/blogs/context-engineering-for-ai-agents/mdx-components'),
  },
  'design-md-the-design-contract-for-ai-agents': {
    componentNames: ['MermaidDiagram'],
    load: () =>
      import('../../components/blogs/design-md-the-design-contract-for-ai-agents/mdx-components'),
  },
  'dspy-programming-not-prompting-your-lms': {
    componentNames: [
      'DspyWorkflowDiagram',
      'DspyVsTraditionalDiagram',
      'CompleteDspyEcosystemDiagram',
    ],
    load: () =>
      import('../../components/blogs/dspy-programming-not-prompting-your-lms/mdx-components'),
  },
  'key-elements-of-multi-agent-systems': {
    componentNames: ['AgentToolsFlow', 'MultiAgentCollaboration', 'AgentMemory'],
    load: () => import('../../components/blogs/key-elements-of-multi-agent-systems/mdx-components'),
  },
  'memgpt-llms-as-operating-systems': {
    componentNames: [
      'ChatHistoryFlow',
      'MemorySectionsFlow',
      'MemoryFlowDiagram',
      'InnerThoughtsFlow',
      'HeartbeatFlow',
      'SelfEditingMemoryFlow',
      'ContextCompilationFlow',
      'SearchRetrievalFlow',
      'CompressionFlow',
      'SessionStateFlow',
      'ComplexTaskFlow',
      'ResourceUtilizationFlow',
    ],
    load: () => import('../../components/blogs/memgpt-llms-as-operating-systems/mdx-components'),
  },
  'openclaw-on-aws': {
    componentNames: ['MermaidDiagram'],
    load: () => import('../../components/blogs/openclaw-on-aws/mdx-components'),
  },
  'rag-triad-building-trust-in-rag-through-systematic-evaluation': {
    componentNames: ['RAGTriad'],
    load: () =>
      import(
        '../../components/blogs/rag-triad-building-trust-in-rag-through-systematic-evaluation/mdx-components'
      ),
  },
  'the-unreasonable-effectiveness-of-html-for-agent-output': {
    componentNames: ['HtmlMarkdownArtifactExperience'],
    load: () =>
      import(
        '../../components/blogs/the-unreasonable-effectiveness-of-html-for-agent-output/mdx-components'
      ),
  },
  'xllm-cluster-architecture-ai-inference': {
    componentNames: ['MermaidDiagram', 'XllmBenchmarkCharts'],
    load: () =>
      import('../../components/blogs/xllm-cluster-architecture-ai-inference/mdx-components'),
  },
} as const satisfies Record<string, BlogComponentRegistryEntry>

const registryBySlug: Record<string, BlogComponentRegistryEntry> = blogComponentRegistry

export function getBlogComponentNames(slug: string): readonly string[] {
  return registryBySlug[slug]?.componentNames ?? []
}

export async function loadBlogComponents(slug: string): Promise<MDXComponents> {
  const entry = registryBySlug[slug]
  if (!entry) return {}

  const loadedModule = await entry.load()
  return loadedModule.blogMDXComponents
}
