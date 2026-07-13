type ContentlayerArtifactEnvironment = Record<string, string | undefined>

/**
 * Contentlayer's generated module output is always required, but tracked JSON
 * artifacts are optional for read-only checks such as standalone type checking.
 */
export function shouldWriteContentlayerArtifacts(
  environment: ContentlayerArtifactEnvironment = process.env
) {
  return environment.CONTENTLAYER_WRITE_ARTIFACTS !== 'false'
}
