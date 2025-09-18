import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Mr.Xy - Premium Headwear Collection',
  description: 'Discover the story behind Mr.Xy, your premier destination for premium caps and headwear. Learn about our commitment to quality, style, and craftsmanship in every piece we create.',
  keywords: 'about Mr.Xy, premium caps, headwear brand, quality hats, cap manufacturing, brand story, premium headwear collection',
  openGraph: {
    title: 'About Mr.Xy - Premium Headwear Brand',
    description: 'Discover the story behind Mr.Xy, your premier destination for premium caps and headwear.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mr.Xy - Premium Headwear Brand',
    description: 'Discover the story behind Mr.Xy, your premier destination for premium caps and headwear.',
  },
  alternates: {
    canonical: '/about',
  },
}

const stats = [
  { number: '10K+', label: 'Happy Customers' },
  { number: '500+', label: 'Unique Designs' },
  { number: '5+', label: 'Years Experience' },
  { number: '99%', label: 'Satisfaction Rate' },
]

const values = [
  {
    title: 'Quality First',
    description: 'Every piece is crafted with premium materials and attention to detail that defines our brand.',
  },
  {
    title: 'Timeless Design',
    description: 'We create headwear that transcends trends, focusing on classic styles with modern touches.',
  },
  {
    title: 'Customer Focus',
    description: 'Your satisfaction drives everything we do, from design concepts to final delivery.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Mr.Xy",
            "description": "Premium headwear and caps brand offering quality craftsmanship and timeless designs.",
            "url": "https://your-domain.com",
            "logo": "https://your-domain.com/logo.png",
            "sameAs": [
              "https://instagram.com/mrxy",
              "https://facebook.com/mrxy",
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN"
            }
          })
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-black mb-8">
                About <span className="font-normal">Mr.Xy</span>
              </h1>
              <p className="text-lg lg:text-xl font-light text-gray-600 leading-relaxed">
                Where premium craftsmanship meets timeless design. We create headwear that tells your story.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                    <p>
                      Born from a passion for authentic style and quality craftsmanship, Mr.Xy began as a vision to create headwear that transcends fleeting trends and becomes part of your personal story.
                    </p>
                    <p>
                      Every cap in our collection represents hours of meticulous design and construction, using only the finest materials sourced from trusted suppliers worldwide.
                    </p>
                    <p>
                      What started as a small venture has grown into a brand trusted by thousands who appreciate the intersection of comfort, durability, and timeless aesthetic.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden">
                  <Image
                    src="/about-image.jpg"
                    alt="Mr.Xy craftsmanship process showing premium cap construction"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-light text-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-light text-gray-600 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                What We Stand For
              </h2>
              <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                Our principles guide every decision we make, from material selection to customer service.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-normal text-black mb-4 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-8">
              Our Mission
            </h2>
            <p className="text-xl lg:text-2xl font-light text-gray-600 leading-relaxed mb-8">
              To create premium headwear that becomes an extension of your personality, 
              crafted with integrity and designed to accompany you on life's journey.
            </p>
            <Link 
              href="/products"
              className="inline-block px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-black mb-6">
              Get in Touch
            </h2>
            <p className="text-lg font-light text-gray-600 mb-8 leading-relaxed">
              Have questions about our products or want to learn more about our brand? 
              We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                Contact Us
              </Link>
              <Link 
                href="/products"
                className="px-8 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}