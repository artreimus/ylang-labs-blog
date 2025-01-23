import dynamic from 'next/dynamic'

// Each component is a default export, so we need to handle them accordingly
export const ChatHistoryFlow = dynamic(
  () => import('./ChatHistoryFlow').then((mod) => mod.default),
  { ssr: false }
)
export const MemorySectionsFlow = dynamic(
  () => import('./MemorySectionsFlow').then((mod) => mod.default),
  { ssr: false }
)
export const MemoryFlowDiagram = dynamic(
  () => import('./MemoryFlowDiagram').then((mod) => mod.default),
  { ssr: false }
)
export const InnerThoughtsFlow = dynamic(
  () => import('./InnerThoughtsFlow').then((mod) => mod.default),
  { ssr: false }
)
export const HeartbeatFlow = dynamic(() => import('./HeartbeatFlow').then((mod) => mod.default), {
  ssr: false,
})
export const SelfEditingMemoryFlow = dynamic(
  () => import('./SelfEditingMemoryFlow').then((mod) => mod.default),
  { ssr: false }
)
export const ContextCompilationFlow = dynamic(
  () => import('./ContextCompilationFlow').then((mod) => mod.default),
  { ssr: false }
)
export const SearchRetrievalFlow = dynamic(
  () => import('./SearchRetrievalFlow').then((mod) => mod.default),
  { ssr: false }
)
export const CompressionFlow = dynamic(
  () => import('./CompressionFlow').then((mod) => mod.default),
  { ssr: false }
)
export const SessionStateFlow = dynamic(
  () => import('./SessionStateFlow').then((mod) => mod.default),
  { ssr: false }
)
export const ComplexTaskFlow = dynamic(
  () => import('./ComplexTaskFlow').then((mod) => mod.default),
  { ssr: false }
)
export const ResourceUtilizationFlow = dynamic(
  () => import('./ResourceUtilizationFlow').then((mod) => mod.default),
  { ssr: false }
)
