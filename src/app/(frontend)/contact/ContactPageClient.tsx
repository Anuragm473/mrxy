'use client'

import { useState } from 'react'
import Link from 'next/link'

const contactInfo = [
  {
    title: 'Customer Support',
    details: 'support@mrxycaps.in',
    phone: '+91-9920910956',
    description: 'For order assistance, product queries about baseball caps, snapback caps, trucker caps',
    icon: '📞',
  },
  {
    title: 'Wholesale & Bulk Orders',
    details: 'wholesale@mrxycaps.in',
    phone: '+91-9920910956',
    description: 'For bulk orders of caps, business partnerships, and wholesale inquiries',
    icon: '🏢',
  },
  {
    title: 'General Inquiries',
    details: 'info@mrxycaps.in',
    phone: '+91-9920910956',
    description: 'For general questions about our premium cap collection and services',
    icon: '💬',
  },
]

const faqs = [
  {
    question: 'What types of caps does Mr. Xy Caps sell?',
    answer: 'We specialize in premium baseball caps, snapback caps, trucker caps, fitted caps, and exclusive designer cap collections. All our caps are 100% authentic with various colors, styles, and sizes available for men, women, and kids.',
  },
  {
    question: 'What are your shipping times for caps across India?',
    answer: 'We typically dispatch caps within 1-2 business days. Standard delivery takes 3-7 business days across India. We offer FREE shipping on all cap orders above ₹999. We deliver to Mumbai, Delhi, Bangalore, Hyderabad, Chennai, and all major cities.',
  },
  {
    question: 'Do you offer international shipping for caps?',
    answer: 'Currently, we ship premium caps within India only. International shipping for our baseball caps, snapback caps, and trucker caps will be available soon. Stay tuned!',
  },
  {
    question: 'What is your return policy for caps?',
    answer: 'We offer a 7-day easy return policy for all caps including baseball caps, snapback caps, and trucker caps. Items must be unworn, in original condition with tags attached. Visit our returns page for detailed information.',
  },
  {
    question: 'How do I track my cap order?',
    answer: 'You can track your cap order using our order tracking page. Simply enter your order number and email address. You\'ll also receive tracking updates via email and SMS.',
  },
  {
    question: 'Do you offer bulk discounts on caps?',
    answer: 'Yes! We offer attractive bulk discounts on baseball caps, snapback caps, trucker caps, and fitted caps for corporate orders, events, and resellers. Contact our wholesale team at wholesale@mrxycaps.in for custom pricing.',
  },
  {
    question: 'Are your caps authentic and high quality?',
    answer: 'Absolutely! All Mr. Xy Caps are 100% authentic premium quality caps. We use high-grade materials, superior stitching, and undergo strict quality checks. Every baseball cap, snapback, and trucker cap is designed for durability and style.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery (COD) for cap orders. All transactions are secure and encrypted.',
  },
]

const popularCategories = [
  { name: 'Baseball Caps', link: '/products?category=Baseball', description: 'Classic curved brim caps' },
  { name: 'Snapback Caps', link: '/products?category=Snapback', description: 'Adjustable flat brim caps' },
  { name: 'Trucker Caps', link: '/products?category=Trucker', description: 'Breathable mesh back caps' },
  { name: 'Fitted Caps', link: '/products?category=Fitted%20Cap', description: 'Perfect fit caps' },
]

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1500)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  // Enhanced structured data
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Mr. Xy Caps - Premium Caps Online India",
    "description": "Contact page for Mr. Xy Caps - India's premier online store for baseball caps, snapback caps, trucker caps, and fitted caps.",
    "url": "https://www.mrxycaps.in/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Mr. Xy Caps",
      "alternateName": "Mr.XY Caps",
      "url": "https://www.mrxycaps.in",
      "logo": "https://www.mrxycaps.in/logo.png",
      "image": "https://www.mrxycaps.in/logo.png",
      "description": "Premium caps online store in India - Baseball caps, Snapback caps, Trucker caps, Fitted caps",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "India"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9920910956",
          "contactType": "customer service",
          "email": "support@mrxycaps.in",
          "availableLanguage": ["English", "Hindi"],
          "areaServed": "IN",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        },
        {
          "@type": "ContactPoint",
          "email": "wholesale@mrxycaps.in",
          "contactType": "sales",
          "areaServed": "IN"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/mrxycaps",
        "https://www.facebook.com/mrxycaps",
        "https://twitter.com/mrxycaps"
      ]
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
        "name": "Contact Us",
        "item": "https://www.mrxycaps.in/contact"
      }
    ]
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <header className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-black mb-8">
              Contact Mr. Xy Caps
            </h1>
            <p className="text-lg lg:text-xl font-light text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
              Have questions about our <strong>premium baseball caps</strong>, <strong>snapback caps</strong>, <strong>trucker caps</strong>, or <strong>fitted caps</strong>? We're here to help with orders, returns, bulk inquiries, and any questions about buying caps online in India.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span>✓ Free Shipping ₹999+</span>
              <span>✓ 24-Hour Support</span>
              <span>✓ Easy Returns</span>
              <span>✓ Pan-India Delivery</span>
            </div>
          </div>
        </header>

        {/* Contact Info Cards */}
        <section className="py-20 border-t border-gray-100" aria-label="Contact information">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-4">Get in Touch - Multiple Ways to Reach Us</h2>
              <p className="text-gray-600 font-light">Whether you need help with baseball caps, snapback caps, or bulk orders</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <article key={index} className="text-center p-8 border border-gray-100 hover:border-gray-200 transition-colors duration-300 hover:shadow-lg">
                  <div className="text-4xl mb-4">{info.icon}</div>
                  <h3 className="text-xl font-normal text-black mb-3 tracking-wide">
                    {info.title}
                  </h3>
                  <a 
                    href={`mailto:${info.details}`}
                    className="text-base font-light text-gray-900 hover:text-black transition-colors duration-300 mb-2 block"
                  >
                    {info.details}
                  </a>
                  <a 
                    href={`tel:${info.phone}`}
                    className="text-base font-light text-gray-900 hover:text-black transition-colors duration-300 mb-3 block"
                  >
                    {info.phone}
                  </a>
                  <p className="text-sm font-light text-gray-600 leading-relaxed">
                    {info.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                Send Us a Message About Caps
              </h2>
              <p className="text-lg font-light text-gray-600">
                Fill out the form below for inquiries about our baseball caps, snapback caps, trucker caps, or any other questions. We'll respond within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 bg-white rounded-sm p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-black flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-black mb-4">Message Sent Successfully!</h3>
                <p className="text-gray-600 font-light mb-8">
                  Thank you for contacting Mr. Xy Caps. Our team will get back to you within 24 hours regarding your inquiry about our premium caps.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 lg:p-12 rounded-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-light focus:border-black focus:outline-none transition-colors duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-light focus:border-black focus:outline-none transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-light focus:border-black focus:outline-none transition-colors duration-300"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                    Subject / Inquiry Type *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-light focus:border-black focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="product">Product Inquiry (Baseball/Snapback/Trucker Caps)</option>
                    <option value="order">Order Status & Tracking</option>
                    <option value="wholesale">Wholesale & Bulk Orders</option>
                    <option value="return">Return/Exchange Caps</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="payment">Payment Issues</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-light focus:border-black focus:outline-none transition-colors duration-300 resize-vertical"
                    placeholder="Tell us about your inquiry regarding caps, orders, or any questions..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 disabled:bg-gray-400 transition-colors duration-300"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                  <p className="text-xs text-gray-500 mt-4 font-light">
                    We typically respond within 24 hours on business days
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-gray-100" itemScope itemType="https://schema.org/FAQPage">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                Frequently Asked Questions About Caps
              </h2>
              <p className="text-lg font-light text-gray-600">
                Find quick answers to common questions about buying baseball caps, snapback caps, trucker caps, and our services.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <article 
                  key={index} 
                  className="bg-white rounded-[6px] shadow-sm border border-gray-200 overflow-hidden"
                  itemScope 
                  itemProp="mainEntity" 
                  itemType="https://schema.org/Question"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-black group"
                    style={{ border: 'none' }}
                    aria-expanded={expandedFaq === index}
                  >
                    <span className="text-base text-black font-normal" itemProp="name">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${expandedFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div 
                      className="px-5 pb-4 pt-1 text-gray-600 border-t border-gray-100 font-light leading-relaxed bg-white animate-fadein"
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                    >
                      <div itemProp="text">{faq.answer}</div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-4">Shop Premium Caps by Category</h2>
              <p className="text-gray-600 font-light">Browse our collection of authentic caps online</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCategories.map((category, index) => (
                <Link 
                  key={index}
                  href={category.link}
                  className="text-center p-6 bg-white border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg group"
                >
                  <h3 className="text-lg font-normal text-black mb-2 group-hover:text-gray-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-light mb-3">{category.description}</p>
                  <span className="text-xs text-black font-light underline">Browse Now →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Business Hours & Location Info */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-6">Visit Us or Contact During Business Hours</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center p-8 bg-gray-50">
                <h3 className="text-xl font-normal text-black mb-4">Customer Support Hours</h3>
                <div className="space-y-2 text-gray-600 font-light">
                  <p><strong>Monday - Saturday:</strong> 9:00 AM - 6:00 PM IST</p>
                  <p><strong>Sunday:</strong> Closed</p>
                  <p className="text-sm pt-2">Email support available 24/7</p>
                </div>
              </div>
              <div className="text-center p-8 bg-gray-50">
                <h3 className="text-xl font-normal text-black mb-4">We Deliver Across India</h3>
                <div className="space-y-2 text-gray-600 font-light">
                  <p>Mumbai | Delhi | Bangalore</p>
                  <p>Hyderabad | Chennai | Kolkata</p>
                  <p>Pune | Ahmedabad & more</p>
                  <p className="text-sm pt-2">Free shipping on orders ₹999+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-light tracking-tight text-black mb-6">
              Need Something Else?
            </h2>
            <p className="text-lg font-light text-gray-600 mb-8 leading-relaxed">
              Explore our other resources for more information about Mr. Xy Caps and our premium cap collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link 
                href="/order-tracking"
                className="px-8 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
              >
                Track Your Cap Order
              </Link>
              <Link 
                href="/about"
                className="px-8 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
              >
                About Mr. Xy Caps
              </Link>
              <Link 
                href="/returns"
                className="px-8 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
              >
                Returns & Exchanges
              </Link>
              <Link 
                href="/products"
                className="px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                Shop All Caps
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-light text-black mb-6 text-center">
                Why Contact Mr. Xy Caps?
              </h2>
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p>
                  At <strong>Mr. Xy Caps</strong>, customer satisfaction is our top priority. Whether you have questions about our <strong>baseball caps</strong>, need help choosing the right <strong>snapback cap</strong>, want to place a <strong>bulk order for trucker caps</strong>, or need assistance with returns - our dedicated support team is here to help.
                </p>
                <h3 className="text-2xl font-light text-black mt-8 mb-4">Wholesale & Bulk Orders</h3>
                <p>
                  Planning a corporate event, sports team, or retail business? We offer competitive pricing on <strong>bulk cap orders</strong>. Whether you need 50 baseball caps for your team or 500 snapback caps for resale, we've got you covered. Contact our wholesale team at <strong>wholesale@mrxycaps.in</strong> for custom quotes and volume discounts.
                </p>
                
                <h3 className="text-2xl font-light text-black mt-8 mb-4">Multiple Contact Options</h3>
                <p>
                  We believe in making it easy for you to reach us. Choose from email support at <strong>support@mrxycaps.in</strong>, phone support at <strong>+91-9920910956</strong>, or use our online contact form. We also provide order tracking, detailed FAQs, and comprehensive product information to help you make informed decisions when buying caps online in India.
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Returns & Exchanges Made Easy</h3>
                <p>
                  Not satisfied with your cap? We offer a hassle-free 7-day return policy. Whether it's a <strong>baseball cap</strong>, <strong>snapback</strong>, or <strong>trucker cap</strong>, if you're not completely happy, we'll make it right. Contact us to initiate a return or exchange, and our team will guide you through the simple process.
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Order Tracking & Support</h3>
                <p>
                  Want to know where your caps are? Use our order tracking system or contact our support team with your order number. We provide real-time updates via email and SMS for all cap orders delivered across India.
                </p>

                <h3 className="text-2xl font-light text-black mt-8 mb-4">Custom Cap Inquiries</h3>
                <p>
                  Looking for custom designs, embroidery, or personalized caps? Mr. Xy Caps offers customization services for bulk orders. Contact us to discuss your requirements for custom <strong>baseball caps</strong>, branded <strong>snapback caps</strong>, or promotional <strong>trucker caps</strong> for your business or event.
                </p>

                <div className="mt-8 p-6 bg-yellow-50 rounded-sm border-2 border-yellow-200">
                  <h4 className="text-xl font-normal text-black mb-3">Quick Contact Summary</h4>
                  <ul className="space-y-2 text-gray-700 font-light">
                    <li>📧 <strong>Customer Support:</strong> support@mrxycaps.in</li>
                    <li>📧 <strong>Wholesale Inquiries:</strong> wholesale@mrxycaps.in</li>
                    <li>📧 <strong>General Questions:</strong> info@mrxycaps.in</li>
                    <li>📞 <strong>Phone:</strong> +91-9920910956 (Mon-Sat, 9 AM - 6 PM IST)</li>
                    <li>🚚 <strong>Free Shipping:</strong> On all orders above ₹999</li>
                    <li>↩️ <strong>Easy Returns:</strong> 7-day return policy</li>
                    <li>⏱️ <strong>Response Time:</strong> Within 24 hours</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Social Media & Other Contact Channels */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-black mb-4">Connect With Us on Social Media</h2>
              <p className="text-gray-600 font-light">Follow us for latest cap collections, exclusive offers, and style inspiration</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://www.instagram.com/mrxycaps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="font-light">Instagram</span>
              </a>
              
              <a 
                href="https://www.facebook.com/mrxycaps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-light">Facebook</span>
              </a>
              
              <a 
                href="https://twitter.com/mrxycaps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span className="font-light">Twitter</span>
              </a>

              <a 
                href="https://wa.me/919920910956" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-green-500 text-white border border-green-500 hover:bg-green-600 transition-all duration-300 hover:shadow-lg"
                aria-label="Chat with us on WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="font-light">WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-16 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl mb-2">✓</div>
                <h3 className="text-sm font-normal text-black mb-1">100% Authentic</h3>
                <p className="text-xs text-gray-600 font-light">Genuine caps only</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="text-sm font-normal text-black mb-1">Free Shipping</h3>
                <p className="text-xs text-gray-600 font-light">Orders above ₹999</p>
              </div>
              <div>
                <div className="text-3xl mb-2">↩️</div>
                <h3 className="text-sm font-normal text-black mb-1">Easy Returns</h3>
                <p className="text-xs text-gray-600 font-light">7-day return policy</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💬</div>
                <h3 className="text-sm font-normal text-black mb-1">24/7 Support</h3>
                <p className="text-xs text-gray-600 font-light">Always here to help</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-gray-100 bg-black text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-light mb-4">Ready to Shop Premium Caps?</h2>
            <p className="text-gray-300 font-light mb-8 leading-relaxed">
              Browse our collection of authentic baseball caps, snapback caps, trucker caps, and fitted caps. 
              Free shipping on orders above ₹999 across India.
            </p>
            <Link 
              href="/products"
              className="inline-block px-12 py-4 bg-white text-black text-sm font-light tracking-wide hover:bg-gray-100 transition-colors duration-300"
            >
              Shop All Caps
            </Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 0.3s ease-out;
        }
      `}</style>
    </>
  )
}