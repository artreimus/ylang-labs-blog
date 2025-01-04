import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import DspyWorkflowDiagram from './blogs/dspy-beyond-prompts-a-better-way-to-work-with-llms/DspyWorkflowDiagram'
import DspyVsTraditionalDiagram from './blogs/dspy-beyond-prompts-a-better-way-to-work-with-llms/DspyVsTraditionalDiagram'
import CompleteDspyEcosystemDiagram from './blogs/dspy-beyond-prompts-a-better-way-to-work-with-llms/CompleteDspyEcosystemDiagram'

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
}
