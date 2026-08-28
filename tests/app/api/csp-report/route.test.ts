/** @jest-environment node */

import { POST } from '@/app/api/csp-report/route'
import { normalizeCspReport } from '@/lib/security/csp-report'

function request(body: string, contentType = 'application/csp-report') {
  return new Request('https://ylanglabs.com/api/csp-report', {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body,
  })
}

function requestWithDeclaredLength(body: string, length: number) {
  return new Request('https://ylanglabs.com/api/csp-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/csp-report',
      'Content-Length': String(length),
    },
    body,
  })
}

describe('CSP report collector', () => {
  it('rejects unsupported content types and oversized reports', async () => {
    await expect(POST(request('{}', 'application/json'))).resolves.toMatchObject({ status: 415 })
    await expect(
      POST(request(JSON.stringify({ value: 'x'.repeat(17 * 1024) })))
    ).resolves.toMatchObject({
      status: 413,
    })
    await expect(POST(requestWithDeclaredLength('{}', 17 * 1024))).resolves.toMatchObject({
      status: 413,
    })
  })

  it('rejects malformed JSON', async () => {
    await expect(POST(request('{'))).resolves.toMatchObject({ status: 400 })
  })

  it('redacts URLs to same-origin path and blocked origin only', () => {
    expect(
      normalizeCspReport(
        {
          'effective-directive': 'img-src',
          disposition: 'report',
          'document-uri': 'https://ylanglabs.com/blogs/example?email=private#section',
          'blocked-uri': 'https://images.example.com/private/path?token=secret',
          referrer: 'https://private.example.com',
          'script-sample': 'private source text',
        },
        'https://ylanglabs.com'
      )
    ).toEqual({
      directive: 'img-src',
      disposition: 'report',
      route: '/blogs/example',
      blockedOrigin: 'https://images.example.com',
    })
  })

  it('sanitizes log tokens and opaque blocked URLs', () => {
    expect(
      normalizeCspReport(
        {
          effectiveDirective: 'script-src\nforged-log-entry',
          disposition: 'report\u0000',
          documentURL: 'https://ylanglabs.com/contact-us?email=private',
          blockedURL: 'chrome-extension://private-extension/path',
        },
        'https://ylanglabs.com'
      )
    ).toEqual({
      directive: 'script-srcforged-log-entry',
      disposition: 'report',
      route: '/contact-us',
      blockedOrigin: 'chrome-extension:',
    })
  })

  it('accepts and logs redacted Reporting API batches', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined)
    const response = await POST(
      request(
        JSON.stringify([
          {
            type: 'csp-violation',
            body: {
              effectiveDirective: 'media-src',
              disposition: 'report',
              documentURL: 'https://ylanglabs.com/projects/example?private=1',
              blockedURL: 'https://assets.example.com/video/demo.mp4?signature=private',
            },
          },
        ]),
        'application/reports+json; charset=utf-8'
      )
    )

    expect(response.status).toBe(204)
    expect(warn).toHaveBeenCalledWith('CSP violation', {
      directive: 'media-src',
      disposition: 'report',
      route: '/projects/example',
      blockedOrigin: 'https://assets.example.com',
    })
  })
})
