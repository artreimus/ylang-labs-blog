import { readFileSync, readdirSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { coreMDXComponentNames } from '../../../components/mdx/core-component-names'
import {
  blogComponentRegistry,
  getBlogComponentNames,
  loadBlogComponents,
} from '../../../lib/mdx/blog-component-loaders'

jest.mock(
  'lucide-react',
  () =>
    new Proxy(
      { __esModule: true },
      {
        get: (target, property) =>
          property in target ? target[property as keyof typeof target] : () => null,
      }
    )
)

const blogsDirectory = path.join(process.cwd(), 'data/blogs')

function findCustomComponentNames(markdown: string): string[] {
  const withoutFencedCode = markdown.replace(/```[\s\S]*?```/g, '')
  return Array.from(withoutFencedCode.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g), (match) => match[1])
}

describe('blog MDX component loader', () => {
  it('returns no article-specific components for an unregistered slug', async () => {
    expect(getBlogComponentNames('text-only-post')).toEqual([])
    await expect(loadBlogComponents('text-only-post')).resolves.toEqual({})
  })

  it('loads only the component registry assigned to a slug', async () => {
    const slug = 'design-md-the-design-contract-for-ai-agents'
    const components = await loadBlogComponents(slug)

    expect(Object.keys(components)).toEqual(['MermaidDiagram'])
    expect(getBlogComponentNames(slug)).toEqual(['MermaidDiagram'])
  })

  it('registers every custom component referenced by published blog MDX', () => {
    const coreNames = new Set<string>(coreMDXComponentNames)

    for (const fileName of readdirSync(blogsDirectory).filter((file) => file.endsWith('.mdx'))) {
      const source = readFileSync(path.join(blogsDirectory, fileName), 'utf8')
      const { data, content } = matter(source)
      if (data.draft === true) continue

      const slug = fileName.replace(/\.mdx$/, '')
      const availableNames = new Set([...coreNames, ...getBlogComponentNames(slug)])
      const missingNames = findCustomComponentNames(content).filter(
        (name) => !availableNames.has(name)
      )

      expect({ slug, missingNames }).toEqual({ slug, missingNames: [] })
    }
  })

  it('keeps registry metadata aligned with each loaded module', async () => {
    for (const [slug, entry] of Object.entries(blogComponentRegistry)) {
      const components = await loadBlogComponents(slug)
      expect(Object.keys(components).sort()).toEqual([...entry.componentNames].sort())
    }
  })
})
