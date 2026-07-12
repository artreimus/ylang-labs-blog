jest.mock('pliny/newsletter', () => ({
  NewsletterAPI: jest.fn(() => jest.fn()),
}))

jest.mock('@/data/siteMetadata', () => ({
  __esModule: true,
  default: {
    newsletter: { provider: 'mailchimp' },
  },
}))

import * as newsletterRoute from '@/app/api/newsletter/route'

describe('newsletter route', () => {
  it('exposes subscription as POST only', () => {
    expect(newsletterRoute.POST).toEqual(expect.any(Function))
    expect(newsletterRoute).not.toHaveProperty('GET')
  })
})
