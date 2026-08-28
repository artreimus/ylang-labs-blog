import { coreMDXComponents } from './mdx/core-components'

/**
 * Backwards-compatible core registry for non-blog MDX routes.
 *
 * Blog routes merge this registry with a slug-specific registry at render time.
 */
export const components = coreMDXComponents
