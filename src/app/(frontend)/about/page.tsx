import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Mr.XY - Beach Meets Street Premium Caps',
  description: 'Discover Mr.XY - born where waves kiss the shore and streets never sleep. Premium caps blending beach freedom with street culture for those who live with adventure in their soul.',
  keywords: 'about Mr.XY, beach lifestyle caps, street culture headwear, premium caps, lifestyle brand, beach streetwear, adventure caps',
  openGraph: {
    title: 'About Mr.XY - Where Beach Meets Street',
    description: 'Born where the waves kiss the shore and the streets never sleep. Premium caps for adventurous souls.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mr.XY - Where Beach Meets Street',
    description: 'Born where the waves kiss the shore and the streets never sleep. Premium caps for adventurous souls.',
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
    title: 'Ocean Spirit',
    description: 'Embracing the freedom and flow of beach life, where every design captures the effortless vibe of coastal living.',
  },
  {
    title: 'Street Edge',
    description: 'Bold and unapologetic, our caps bring the energy of urban culture to every adventure you embark on.',
  },
  {
    title: 'Lifestyle First',
    description: "More than headwear—we create pieces that match your rhythm, whether you're chasing waves or conquering streets.",
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
            "name": "Mr.XY",
            "description": "Premium caps brand blending beach lifestyle with street culture. Born where waves meet streets.",
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
                About <span className="font-normal">Mr.XY</span>
              </h1>
              <p className="text-lg lg:text-xl font-light text-gray-600 leading-relaxed">
                Born where the waves kiss the shore and the streets never sleep. We blend effortless style with everyday comfort.
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
                      Mr.XY was born where the waves kiss the shore and the streets never sleep. Inspired by the calm of the beach and the energy of city life, our caps blend effortless style with everyday comfort.
                    </p>
                    <p>
                      Each design carries the free spirit of the ocean and the bold edge of streetwear, making Mr.XY more than just a cap—it's a lifestyle.
                    </p>
                    <p>
                      From sandy beaches to bustling streets, Mr.XY is made for those who live with adventure in their soul and style on their mind.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden">
                  <Image
                    src="/about-image.png"
                    alt="Mr.XY lifestyle - beach meets street culture caps"
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
                Our principles guide every decision we make, from design inspiration to the lifestyle we represent.
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
              To create caps that embody the perfect balance of beach serenity and street culture, 
              for those who refuse to choose between comfort and style, adventure and authenticity.
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
              Have questions about our products or want to learn more about the Mr.XY lifestyle? 
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