import type { MDXComponents } from 'mdx/types'

import {
  CompleteDspyEcosystemDiagram,
  DspyVsTraditionalDiagram,
  DspyWorkflowDiagram,
} from './mdx-components.client'

export const blogMDXComponents = {
  DspyWorkflowDiagram,
  DspyVsTraditionalDiagram,
  CompleteDspyEcosystemDiagram,
} satisfies MDXComponents
