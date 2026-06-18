import { existsSync, readdirSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { imageSize } from 'image-size'

const rootDir = process.cwd()
const blogsDir = path.join(rootDir, 'data/blogs')
const authorsDir = path.join(rootDir, 'data/authors')
const publicDir = path.join(rootDir, 'public')

function publicPath(assetPath: string) {
  return path.join(publicDir, assetPath.replace(/^\//, ''))
}

describe('blog content contracts', () => {
  const blogFiles = readdirSync(blogsDir).filter((file) => file.endsWith('.mdx'))

  it('keeps publishable posts aligned with required frontmatter and assets', () => {
    for (const file of blogFiles) {
      const { data } = matter.read(path.join(blogsDir, file))
      if (data.draft === true) continue

      expect(data.title).toEqual(expect.any(String))
      expect(data.date).toEqual(expect.any(String))
      expect(data.summary).toEqual(expect.any(String))
      expect(data.authors).toEqual(expect.arrayContaining([expect.any(String)]))
      expect(data.cardImage).toEqual(expect.any(String))
      expect(data.images).toEqual(expect.arrayContaining([expect.any(String)]))

      for (const author of data.authors as string[]) {
        expect(existsSync(path.join(authorsDir, `${author}.mdx`))).toBe(true)
      }

      expect(existsSync(publicPath(data.cardImage))).toBe(true)
      expect(existsSync(publicPath(data.images[0]))).toBe(true)
    }
  })

  it('keeps standard card and header image dimensions stable', () => {
    for (const file of blogFiles) {
      const { data } = matter.read(path.join(blogsDir, file))
      if (data.draft === true) continue

      const cardImagePath = publicPath(data.cardImage)
      const headerImagePath = publicPath(data.images[0])

      if (path.basename(cardImagePath) === 'cardImage.png') {
        expect(imageSize(cardImagePath)).toMatchObject({ width: 1080, height: 1920 })
      }

      if (path.basename(headerImagePath) === 'blogHeader.png') {
        expect(imageSize(headerImagePath)).toMatchObject({ width: 1260, height: 700 })
      }
    }
  })
})
