'use client'

import { Metadata } from 'next'
import { useState } from 'react'
import Link from 'next/link'

// Note: This metadata would go in a separate page.tsx file in the app router
const metadata: Metadata = {
  title: 'Contact Us | Mr.Xy - Get in Touch',
  description: 'Contact Mr.Xy for inquiries about our premium headwear collection, customer support, wholesale opportunities, or general questions. We\'re here to help.',
  keywords: 'contact Mr.Xy, customer support, headwear inquiries, wholesale caps, customer service, premium headwear support',
  openGraph: {
    title: 'Contact Mr.Xy - Premium Headwear Support',
    description: 'Get in touch with Mr.Xy for inquiries about our premium headwear collection and customer support.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Mr.Xy - Premium Headwear Support',
    description: 'Get in touch with Mr.Xy for inquiries about our premium headwear collection and customer support.',
  },
  alternates: {
    canonical: '/contact',
  },
}

const contactInfo = [
  {
    title: 'General Inquiries',
    details: 'info@mrxy.com',
    description: 'For general questions about our products and services',
  },
  {
    title: 'Customer Support',
    details: 'support@mrxy.com',
    description: 'For order assistance and product support',
  },
  {
    title: 'Wholesale',
    details: 'wholesale@mrxy.com',
    description: 'For bulk orders and business partnerships',
  },
]

const faqs = [
  {
    question: 'What are your shipping times?',
    answer: 'We typically ship within 1-2 business days. Standard delivery takes 3-7 business days within India.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Currently, we ship within India only. International shipping will be available soon.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unworn items in original condition with tags attached.',
  },
  {
    question: 'How do I track my order?',
    answer: 'You can track your order using our order tracking page with your order number and email.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Mr.Xy",
            "description": "Contact page for Mr.Xy premium headwear brand",
            "url": "https://www.mrxycaps.in/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Mr.Xy",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-9920910956",
                  "contactType": "customer service",
                  "email": "support@mrxy.com",
                  "availableLanguage": ["English", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  "email": "wholesale@mrxy.com",
                  "contactType": "sales"
                }
              ]
            }
          })
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-black mb-8">
              Get in Touch
            </h1>
            <p className="text-lg lg:text-xl font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Have questions about our premium headwear collection? We're here to help with any inquiries, 
              support needs, or feedback you may have.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="text-center p-8 border border-gray-100 hover:border-gray-200 transition-colors duration-300">
                  <h3 className="text-xl font-normal text-black mb-3 tracking-wide">
                    {info.title}
                  </h3>
                  <a 
                    href={`mailto:${info.details}`}
                    className="text-lg font-light text-gray-900 hover:text-black transition-colors duration-300 mb-3 block"
                  >
                    {info.details}
                  </a>
                  <p className="text-sm font-light text-gray-600 leading-relaxed">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
                Send us a Message
              </h2>
              <p className="text-lg font-light text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-black flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-black mb-4">Message Sent!</h3>
                <p className="text-gray-600 font-light mb-8">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
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
                  <label htmlFor="subject" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-light focus:border-black focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Customer Support</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="return">Return/Exchange</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-light focus:border-black focus:outline-none transition-colors duration-300 resize-vertical"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 disabled:bg-gray-400 transition-colors duration-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Section */}
<section className="py-20 border-t border-gray-100">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-light tracking-tight text-black mb-6">
        Frequently Asked Questions
      </h2>
      <p className="text-lg font-light text-gray-600">
        Find quick answers to common questions about our products and services.
      </p>
    </div>

    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-[6px] shadow-sm border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleFaq(index)}
            className="w-full flex justify-between items-center text-left px-5 py-4 outline-none focus-visible:ring-2 focus-visible:ring-black group"
            style={{ border: 'none' }}
          >
            <span className="text-base text-black font-normal">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedFaq === index && (
            <div className="px-5 pb-4 pt-1 text-gray-600 border-t border-gray-100 font-normal leading-relaxed bg-white animate-fadein">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
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
              Explore our other resources for more information about Mr.Xy and our products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/order-tracking"
                className="px-8 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
              >
                Track Your Order
              </Link>
              <Link 
                href="/about"
                className="px-8 py-3 border border-gray-300 text-black text-sm font-light tracking-wide hover:border-black transition-colors duration-300"
              >
                Learn About Us
              </Link>
              <Link 
                href="/products"
                className="px-8 py-3 bg-black text-white text-sm font-light tracking-wide hover:bg-gray-800 transition-colors duration-300"
              >
                Shop Collection
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}