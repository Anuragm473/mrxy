import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Mr. Xy Caps | Premium Caps Online India - Baseball, Snapback & Trucker Caps',
  description: 'Learn about Mr. Xy Caps - India\'s leading online store for premium baseball caps, snapback caps, trucker caps & fitted caps. Born where beach meets street. 10K+ happy customers. Free shipping above ₹999.',
  keywords: 'about Mr. Xy Caps, premium caps online India, baseball caps India, snapback caps, trucker caps, fitted caps, streetwear caps India, beach lifestyle caps, sports caps, designer caps, cap brand India, authentic caps',
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
    title: 'About Mr. Xy Caps - Premium Caps Online India | Baseball, Snapback & Trucker Caps',
    description: 'India\'s trusted online store for authentic premium caps. Baseball caps, snapback caps, trucker caps & more. 10K+ happy customers. Free shipping on orders above ₹999.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.mrxycaps.in/about',
    siteName: 'Mr. Xy Caps',
    images: [
      {
        url: 'https://www.mrxycaps.in/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mr. Xy Caps - Premium Caps Online India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mr. Xy Caps - Premium Caps Online India',
    description: 'India\'s trusted online store for authentic premium caps. Baseball caps, snapback caps, trucker caps & more.',
    images: ['https://www.mrxycaps.in/about-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.mrxycaps.in/about',
  },
}

const stats = [
  { number: '10K+', label: 'Happy Customers', description: 'Satisfied cap buyers across India' },
  { number: '500+', label: 'Unique Designs', description: 'Premium cap styles available' },
  { number: '5+', label: 'Years Experience', description: 'In premium headwear industry' },
  { number: '99%', label: 'Satisfaction Rate', description: 'Customer happiness guarantee' },
]

const values = [
  {
    title: 'Premium Quality Caps',
    description: 'Every baseball cap, snapback, and trucker cap is crafted with premium materials ensuring durability, comfort, and authentic style for years to come.',
    icon: '🏆',
  },
  {
    title: 'Authentic Streetwear',
    description: 'Bold and unapologetic designs bringing genuine street culture and urban fashion energy to every cap in our collection.',
    icon: '🔥',
  },
  {
    title: 'Customer First',
    description: 'Free shipping above ₹999, easy returns, and dedicated customer support. We ensure your cap shopping experience is seamless and satisfying.',
    icon: '💯',
  },
]

const capTypes = [
  {
    name: 'Baseball Caps',
    description: 'Classic curved brim baseball caps perfect for sports and casual wear',
    link: '/products?category=Baseball',
  },
  {
    name: 'Snapback Caps',
    description: 'Adjustable flat brim snapback caps for street style and hip-hop culture',
    link: '/products?category=Snapback',
  },
  {
    name: 'Trucker Caps',
    description: 'Breathable mesh-back trucker caps ideal for outdoor activities',
    link: '/products?category=Trucker',
  },
  {
    name: 'Fitted Caps',
    description: 'Professional fitted caps with precise sizing for the perfect fit',
    link: '/products?category=Fitted%20Cap',
  },
]

export default function AboutPage() {
  // Enhanced structured data with more SEO information
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mr. Xy Caps",
    "alternateName": "Mr.XY Caps",
    "description": "Premium caps online store in India specializing in baseball caps, snapback caps, trucker caps, and fitted caps. Free shipping on orders above ₹999.",
    "url": "https://www.mrxycaps.in",
    "logo": "https://www.mrxycaps.in/logo.png",
    "image": "https://www.mrxycaps.in/about-image.png",
    "sameAs": [
      "https://www.instagram.com/mrxycaps",
      "https://www.facebook.com/mrxycaps",
      "https://twitter.com/mrxycaps",
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "10000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "founder": {
      "@type": "Person",
      "name": "Mr. XY"
    },
    "foundingDate": "2019",
    "knowsAbout": [
      "Baseball Caps",
      "Snapback Caps",
      "Trucker Caps",
      "Fitted Caps",
      "Sports Caps",
      "Designer Caps",
      "Streetwear"
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.mrxycaps.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://www.mrxycaps.in/about"
      }
    ]
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section - SEO Optimized */}
        <header className="relative py-24 lg:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-black mb-8">
                About <span className="font-normal">Mr. Xy Caps</span>
              </h1>
              <p className="text-lg lg:text-xl font-light text-gray-600 leading-relaxed mb-6">
                India's premier online destination for <strong>premium caps</strong> - from classic <strong>baseball caps</strong> to trendy <strong>snapback caps</strong>, breathable <strong>trucker caps</strong> to perfectly fitted caps. Born where the waves kiss the shore and the streets never sleep.
              </p>
              <p className="text-base text-gray-500 font-light">
                <strong>10,000+ happy customers</strong> | <strong>Free shipping above ₹999</strong> | <strong>100% authentic products</strong>
              </p>
            </div>
          </div>
        </header>

        {/* Story Section - Enhanced with Keywords */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="space-y-8">
                <article>
                  <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                    The Mr. Xy Caps Story - Premium Caps Online India
                  </h2>
                  <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                    <p>
                      <strong>Mr. Xy Caps</strong> was founded with a simple mission: to bring <strong>premium quality caps</strong> to India at affordable prices. Born where the waves kiss the shore and the streets never sleep, we blend the effortless style of beach life with the bold energy of urban street culture.
                    </p>
                    <p>
                      What started as a passion for <strong>authentic baseball caps</strong> and <strong>snapback caps</strong> has grown into India's most trusted online store for all types of headwear. We specialize in <strong>trucker caps</strong>, <strong>fitted caps</strong>, designer caps, and exclusive collections that cater to every style and preference.
                    </p>
                    <p>
                      Each cap in our collection is carefully selected for quality, comfort, and style. Whether you're a sports enthusiast looking for <strong>athletic baseball caps</strong>, a hip-hop fan searching for the perfect <strong>flat-brim snapback</strong>, or an outdoor lover needing breathable <strong>mesh trucker caps</strong> - we have you covered.
                    </p>
                    <p>
                      From sandy beaches to bustling city streets, Mr. Xy Caps is made for those who live with adventure in their soul and style on their mind. We're not just selling caps; we're building a lifestyle brand that represents freedom, authenticity, and quality.
                    </p>
                  </div>
                </article>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden">
                  <Image
                    src="/about-image.png"
                    alt="Mr. Xy Caps - Premium baseball caps, snapback caps and trucker caps India"
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

        {/* Stats Section - Enhanced */}
        <section className="py-20 border-t border-gray-100 bg-gray-50" aria-label="Company statistics">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-4">Why Choose Mr. Xy Caps</h2>
              <p className="text-gray-600 font-light">India's Most Trusted Online Cap Store</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-light text-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-light text-gray-900 tracking-wide mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cap Types Section - New SEO Content */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                Types of Caps We Offer
              </h2>
              <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                Explore our extensive collection of premium caps online. Each style is crafted for specific needs and fashion preferences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {capTypes.map((cap, index) => (
                <article key={index} className="text-center p-6 bg-gray-50 rounded-sm hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-normal text-black mb-3 tracking-wide">
                    {cap.name}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-4 text-sm">
                    {cap.description}
                  </p>
                  <Link 
                    href={cap.link}
                    className="text-sm text-black font-light underline hover:no-underline"
                  >
                    Shop Now →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section - Enhanced with Icons */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                What Makes Us Different
              </h2>
              <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
                Our commitment to quality, authenticity, and customer satisfaction sets us apart as India's leading online cap store.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <article key={index} className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-normal text-black mb-4 tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-8">
              Our Mission: Making Premium Caps Accessible to Everyone
            </h2>
            <p className="text-xl lg:text-2xl font-light text-gray-600 leading-relaxed mb-8">
              To provide <strong>authentic, premium-quality caps</strong> to customers across India at affordable prices. We believe everyone deserves access to high-quality headwear that reflects their personality and lifestyle - whether it's a classic baseball cap, a trendy snapback, or a functional trucker cap.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Free Shipping ₹999+</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">100% Authentic</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Easy Returns</span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full">Pan-India Delivery</span>
            </div>
            <Link 
              href="/products"
              className="inline-block px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
            >
              Shop Premium Caps
            </Link>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-light text-black mb-6 text-center">
                Why Mr. Xy Caps is India's Best Online Cap Store
              </h2>
              
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p>
                  When you're looking to <strong>buy caps online in India</strong>, Mr. Xy Caps stands out as the premier destination for quality and variety. Here's what makes us the top choice for cap enthusiasts across the country:
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Extensive Cap Collection</h3>
                <p>
                  Our online store features over <strong>500+ unique designs</strong> across all popular categories. Whether you need a classic <strong>baseball cap for sports</strong>, a stylish <strong>snapback for street fashion</strong>, a breathable <strong>trucker cap for outdoor activities</strong>, or a perfectly fitted cap for a polished look - we have it all.
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Quality You Can Trust</h3>
                <p>
                  Every cap at Mr. Xy Caps undergoes strict quality checks. We source only <strong>authentic, premium-grade materials</strong> that ensure durability, comfort, and long-lasting style. Our caps are designed to withstand daily wear while maintaining their shape and color.
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Customer-First Approach</h3>
                <p>
                  With <strong>10,000+ satisfied customers</strong> and a <strong>99% satisfaction rate</strong>, our commitment to customer happiness is evident. We offer free shipping on orders above ₹999, easy returns, secure payment options, and responsive customer support to make your shopping experience seamless.
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Fast Pan-India Delivery</h3>
                <p>
                  We deliver to all major cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, and across India. Our reliable logistics partners ensure your caps reach you quickly and safely, no matter where you are.
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Caps for Every Occasion</h3>
                <p>
                  Whether you're hitting the gym, going to a music festival, playing sports, or just running errands - we have the perfect cap for every occasion. Our collection includes caps for men, women, and kids in various colors, styles, and sizes.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-black mb-6">
              Have Questions About Our Caps?
            </h2>
            <p className="text-lg font-light text-gray-600 mb-8 leading-relaxed">
              Whether you need help choosing the right cap style, want to know about sizing, or have any questions about our products - our team is here to help. Get in touch with us today!
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
                Browse All Caps
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section - New for SEO */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light text-black mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <details className="bg-white p-6 rounded-sm">
                <summary className="font-normal text-black cursor-pointer text-lg">
                  What types of caps does Mr. Xy Caps sell?
                </summary>
                <p className="mt-4 text-gray-600 font-light leading-relaxed">
                  We specialize in baseball caps, snapback caps, trucker caps, fitted caps, and exclusive designer collections. All our caps are 100% authentic and made with premium materials.
                </p>
              </details>
              
              <details className="bg-white p-6 rounded-sm">
                <summary className="font-normal text-black cursor-pointer text-lg">
                  Do you offer free shipping in India?
                </summary>
                <p className="mt-4 text-gray-600 font-light leading-relaxed">
                  Yes! We offer free shipping on all orders above ₹999 across India. For orders below ₹999, standard shipping charges apply.
                </p>
              </details>
              
              <details className="bg-white p-6 rounded-sm">
                <summary className="font-normal text-black cursor-pointer text-lg">
                  Are Mr. Xy Caps authentic?
                </summary>
                <p className="mt-4 text-gray-600 font-light leading-relaxed">
                  Absolutely! We guarantee 100% authentic, premium-quality caps. Every product undergoes strict quality checks before shipping.
                </p>
              </details>
              
              <details className="bg-white p-6 rounded-sm">
                <summary className="font-normal text-black cursor-pointer text-lg">
                  What is your return policy?
                </summary>
                <p className="mt-4 text-gray-600 font-light leading-relaxed">
                  We offer easy returns within 7 days of delivery if you're not satisfied with your purchase. The cap must be unused and in original condition.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}