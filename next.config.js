const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const blobOrigin = process.env.BLOB_PUBLIC_ORIGIN
const blobPathPrefix = process.env.BLOB_PUBLIC_PATH_PREFIX

function parseHttpsOrigin(value, variableName) {
  if (!value) return undefined

  const url = new URL(value)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`${variableName} must be an HTTPS origin without a path, query, or fragment`)
  }
  return url.origin
}

const configuredBlobOrigin = parseHttpsOrigin(blobOrigin, 'BLOB_PUBLIC_ORIGIN')
if (configuredBlobOrigin && !blobPathPrefix) {
  throw new Error('BLOB_PUBLIC_PATH_PREFIX is required when BLOB_PUBLIC_ORIGIN is configured')
}
if (
  blobPathPrefix &&
  (!blobPathPrefix.startsWith('/') || !blobPathPrefix.endsWith('/**') || blobPathPrefix === '/**')
) {
  throw new Error('BLOB_PUBLIC_PATH_PREFIX must be a narrow absolute prefix ending in /**')
}

const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': [
    "'self'",
    'blob:',
    'data:',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    ...(configuredBlobOrigin ? [configuredBlobOrigin] : []),
  ],
  'media-src': ["'self'", 'blob:', ...(configuredBlobOrigin ? [configuredBlobOrigin] : [])],
  'connect-src': [
    "'self'",
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://region1.google-analytics.com',
  ],
  'font-src': ["'self'", 'data:'],
  'frame-src': ['https://giscus.app'],
  'worker-src': ["'self'", 'blob:'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'report-to': ['csp-endpoint'],
  'report-uri': ['/api/csp-report'],
}

const contentSecurityPolicy = Object.entries(cspDirectives)
  .map(([directive, values]) => `${directive} ${values.join(' ')}`)
  .join('; ')

// Keep the currently deployed policy enforced while the narrower candidate is
// observed. Promote `contentSecurityPolicy` to this header only after the
// report-only rollout gate in docs/operations/contact-form.md is complete.
const enforcedMediaSources = [
  "'self'",
  'blob:',
  '*.s3.amazonaws.com',
  ...(configuredBlobOrigin ? [configuredBlobOrigin] : []),
]
const enforcedContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' www.googletagmanager.com www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src ${enforcedMediaSources.join(' ')};
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`.replace(/\n/g, '')

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: enforcedContentSecurityPolicy,
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: contentSecurityPolicy,
  },
  {
    key: 'Reporting-Endpoints',
    // A relative endpoint resolves against the response origin, so Preview and
    // Development reports stay isolated from production reporting.
    value: 'csp-endpoint="/api/csp-report"',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    transpilePackages: ['github-slugger'],
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      remotePatterns:
        configuredBlobOrigin && blobPathPrefix
          ? [
              {
                protocol: 'https',
                hostname: new URL(configuredBlobOrigin).hostname,
                pathname: blobPathPrefix,
              },
            ]
          : [],
      unoptimized,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
  })
}
