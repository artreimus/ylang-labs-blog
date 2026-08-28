import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import siteMetadata from '../data/siteMetadata.js'
import { sortPosts } from 'pliny/utils/contentlayer.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'

// Read tag data file directly since we can't use assert syntax
const tagData = JSON.parse(
  readFileSync(new URL('../app/blog-tag-data.json', import.meta.url), 'utf-8')
)

const outputFolder = process.env.EXPORT ? 'out' : 'public'

const getPostUrl = (config, post) => `${config.siteUrl}/${post.path || `blogs/${post.slug}`}`

export const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

export const generateRssItem = (config, post) => {
  const postUrl = getPostUrl(config, post)
  return `
  <item>
    <guid>${escapeXml(postUrl)}</guid>
    <title>${escapeXml(post.title)}</title>
    <link>${escapeXml(postUrl)}</link>
    ${post.summary && `<description>${escapeXml(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${escapeXml(config.email)} (${escapeXml(config.author)})</author>
    ${post.tags && post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('')}
  </item>
`
}

export const generateRss = (config, posts, page = 'feed.xml') => {
  const sortedPosts = sortPosts(posts)
  const lastBuildDate = sortedPosts[0]
    ? `<lastBuildDate>${new Date(sortedPosts[0].date).toUTCString()}</lastBuildDate>`
    : ''

  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escapeXml(config.title)}</title>
      <link>${escapeXml(config.siteUrl)}/blogs</link>
      <description>${escapeXml(config.description)}</description>
      <language>${escapeXml(config.language)}</language>
      <managingEditor>${escapeXml(config.email)} (${escapeXml(config.author)})</managingEditor>
      <webMaster>${escapeXml(config.email)} (${escapeXml(config.author)})</webMaster>
      ${lastBuildDate}
      <atom:link href="${escapeXml(`${config.siteUrl}/${page}`)}" rel="self" type="application/rss+xml"/>
      ${sortedPosts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`
}

export async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  const rss = generateRss(config, publishPosts)
  writeFileSync(`./${outputFolder}/${page}`, rss)

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = publishPosts.filter((post) =>
        post.tags.map((t) => slug(t)).includes(tag)
      )
      if (filteredPosts.length === 0) continue

      const rss = generateRss(config, sortPosts(filteredPosts), `tags/${tag}/${page}`)
      const rssPath = path.join(outputFolder, 'tags', tag)
      mkdirSync(rssPath, { recursive: true })
      writeFileSync(path.join(rssPath, page), rss)
    }
  }
}

const rss = async () => {
  await generateRSS(siteMetadata, allBlogs)
  console.log('RSS feed generated...')
}
export default rss
