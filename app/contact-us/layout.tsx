import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Contact Us',
  description: 'Contact Ylang Labs about AI engineering projects, research, and support.',
  url: '/contact-us',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
