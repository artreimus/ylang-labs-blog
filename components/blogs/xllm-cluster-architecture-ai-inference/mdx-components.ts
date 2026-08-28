import type { MDXComponents } from 'mdx/types'

import MermaidDiagram from '../../mdx/DynamicMermaidDiagram'
import { XllmBenchmarkCharts } from './mdx-components.client'

export const blogMDXComponents = {
  MermaidDiagram,
  XllmBenchmarkCharts,
} satisfies MDXComponents
