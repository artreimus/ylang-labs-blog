import { NewsletterAPI, type NewsletterConfig } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

const provider = siteMetadata.newsletter?.provider

if (!provider) {
  throw new Error('Newsletter provider is not configured')
}

const handler = NewsletterAPI({
  provider: provider as NewsletterConfig['provider'],
})

export { handler as POST }
