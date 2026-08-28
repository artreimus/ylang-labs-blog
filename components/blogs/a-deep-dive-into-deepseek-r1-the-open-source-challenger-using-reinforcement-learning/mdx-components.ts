import type { MDXComponents } from 'mdx/types'

import KnowledgeDistillationCircles from './KnowledgeDistillationCircles'
import {
  BenchmarkChart,
  HighLevelArchitectureDiagram,
  TrainingPipelineDiagram,
} from './mdx-components.client'

export const blogMDXComponents = {
  HighLevelArchitectureDiagram,
  TrainingPipelineDiagram,
  KnowledgeDistillationCircles,
  BenchmarkChart,
} satisfies MDXComponents
