import { shouldWriteContentlayerArtifacts } from '@/lib/contentlayer/write-artifacts'

describe('shouldWriteContentlayerArtifacts', () => {
  it('writes tracked artifacts by default', () => {
    expect(shouldWriteContentlayerArtifacts({})).toBe(true)
  })

  it('skips tracked artifacts when explicitly disabled', () => {
    expect(shouldWriteContentlayerArtifacts({ CONTENTLAYER_WRITE_ARTIFACTS: 'false' })).toBe(false)
  })

  it('does not treat other values as an opt-out', () => {
    expect(shouldWriteContentlayerArtifacts({ CONTENTLAYER_WRITE_ARTIFACTS: 'true' })).toBe(true)
    expect(shouldWriteContentlayerArtifacts({ CONTENTLAYER_WRITE_ARTIFACTS: 'FALSE' })).toBe(true)
  })
})
