import TOCInline from 'pliny/ui/TOCInline.js'
import type { MDXComponents } from 'mdx/types'

import Callout from '../Callout'
import DiagramDisplay from '../DiagramDisplay'
import DiagramSubtitle from '../DiagramSubtitle'
import AssetImage from './AssetImage'
import CustomLink from '../Link'
import MdxPre from '../MdxPre'
import TableWrapper from '../TableWrapper'

export { coreMDXComponentNames } from './core-component-names'

/**
 * Components available to every MDX document.
 *
 * Article-specific interactive components intentionally live in slug-scoped
 * registries so their client dependencies are not part of every content route.
 */
export const coreMDXComponents: MDXComponents = {
  Image: AssetImage,
  TOCInline,
  a: CustomLink,
  pre: MdxPre,
  table: TableWrapper,
  DiagramSubtitle,
  DiagramDisplay,
  Callout,
}
