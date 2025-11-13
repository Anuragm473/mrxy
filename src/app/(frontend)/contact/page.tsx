import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us - Buy Premium Caps Online India | Mr. Xy Caps Customer Support',
  description: 'Contact Mr. Xy Caps for inquiries about baseball caps, snapback caps, trucker caps & fitted caps. Customer support, bulk orders, returns & shipping help. Call/Email us today!',
  keywords: 'contact Mr. Xy Caps, buy caps online India, baseball caps customer support, snapback caps inquiry, trucker caps wholesale, fitted caps bulk order, cap store India contact, premium caps support, headwear customer service, caps return policy India',
  authors: [{ name: 'Mr. Xy Caps' }],
  creator: 'Mr. Xy Caps',
  publisher: 'Mr. Xy Caps',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Contact Mr. Xy Caps - Premium Caps Customer Support India',
    description: 'Get help with your cap orders. Contact us for baseball caps, snapback caps, trucker caps inquiries. Fast customer support across India.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.mrxycaps.in/contact',
    siteName: 'Mr. Xy Caps',
    images: [
      {
        url: 'https://www.mrxycaps.in/contact-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Mr. Xy Caps - Premium Caps Customer Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Mr. Xy Caps - Premium Caps Customer Support',
    description: 'Get help with baseball caps, snapback caps, trucker caps orders. Fast customer support.',
    images: ['https://www.mrxycaps.in/contact-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.mrxycaps.in/contact',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}