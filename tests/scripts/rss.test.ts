/** @jest-environment node */

import { spawnSync } from 'node:child_process'

function renderFeed(posts: unknown[]) {
  const expression = [
    "import('./scripts/rss.mjs')",
    `.then(({generateRss}) => process.stdout.write(generateRss(${JSON.stringify({
      siteUrl: 'https://example.com/?one=1&two=2',
      title: 'Ylang & Labs',
      description: 'AI < engineering',
      language: 'en-us',
      email: 'hello&team@example.com',
      author: 'Ada "A"',
    })}, ${JSON.stringify(posts)})))`,
  ].join('')
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', expression], {
    cwd: process.cwd(),
    encoding: 'utf8',
  })

  expect(result.stderr).toBe('')
  expect(result.status).toBe(0)
  return result.stdout
}

describe('RSS generation', () => {
  it('escapes XML text and attributes and sorts newest posts first', () => {
    const feed = renderFeed([
      {
        title: 'Older < post',
        date: '2026-01-01',
        path: 'blogs/older?x=1&y=2',
        tags: ['AI & ML'],
      },
      {
        title: 'Newer "post"',
        date: '2026-02-01',
        path: 'blogs/newer',
        tags: ['Agents'],
      },
    ])

    expect(feed).toContain('Ylang &amp; Labs')
    expect(feed).toContain('AI &lt; engineering')
    expect(feed).toContain('hello&amp;team@example.com')
    expect(feed).toContain('Ada &quot;A&quot;')
    expect(feed).toContain('AI &amp; ML')
    expect(feed).toContain('one=1&amp;two=2')
    expect(feed.indexOf('Newer &quot;post&quot;')).toBeLessThan(feed.indexOf('Older &lt; post'))
  })

  it('renders a valid empty channel without an unstable build date', () => {
    const feed = renderFeed([])

    expect(feed).toContain('<channel>')
    expect(feed).not.toContain('<lastBuildDate>')
    expect(feed).not.toContain('<item>')
  })
})
