/** @jest-environment node */

import { realpathSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

describe('theme dependency contract', () => {
  it('resolves one next-themes module for the app and Pliny comments', () => {
    const rootRequire = createRequire(path.join(process.cwd(), 'package.json'))
    const plinyRequire = createRequire(path.join(process.cwd(), 'node_modules/pliny/package.json'))

    const appThemeModule = realpathSync(rootRequire.resolve('next-themes'))
    const commentsThemeModule = realpathSync(plinyRequire.resolve('next-themes'))

    expect(commentsThemeModule).toBe(appThemeModule)
  })
})
