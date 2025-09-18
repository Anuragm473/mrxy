// src/app/(frontend)/page.tsx
import Link from "next/link";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mr.Xy - Premium Headwear Collection | Baseball Caps, Snapbacks & More",
  description: "Discover Mr.Xy's exclusive collection of premium headwear. Shop baseball caps, snapbacks, trucker hats, fitted caps & exclusive designs. Free shipping on orders over ₹999.",
  keywords: [
    "premium caps",
    "baseball caps online",
    "snapback caps",
    "fitted caps",
    "trucker caps",
    "exclusive headwear",
    "Mr.Xy caps",
    "buy caps online India",
    "designer caps",
    "headwear collection"
  ],
  authors: [{ name: "Mr.Xy" }],
  creator: "Mr.Xy",
  publisher: "Mr.Xy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mrxy.com",
    siteName: "Mr.Xy",
    title: "Mr.Xy - Premium Headwear Collection | Baseball Caps & Snapbacks",
    description: "Shop premium headwear at Mr.Xy. Exclusive baseball caps, snapbacks, and designer headwear with free shipping on orders over ₹999.",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Mr.Xy Premium Headwear Collection",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MrXyCaps",
    creator: "@MrXyCaps",
    title: "Mr.Xy - Premium Headwear Collection",
    description: "Discover exclusive premium caps and headwear. Free shipping on orders over ₹999.",
    images: ["/twitter-banner.jpg"],
  },
  alternates: {
    canonical: "https://mrxy.com",
  },
  other: {
    "price:currency": "INR",
    "product:availability": "in stock",
    "product:condition": "new",
  },
};

// Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Mr.Xy",
  image: "https://mrxy.com/logo.jpg",
  description: "Premium headwear store offering baseball caps, snapbacks, trucker caps, and exclusive collections.",
  url: "https://mrxy.com",
  telephone: "+91-XXXXXXXXXX",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
  },
  sameAs: [
    "https://www.instagram.com/mrxycaps",
    "https://www.facebook.com/mrxycaps",
    "https://twitter.com/mrxycaps"
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Headwear Collection",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Baseball Caps",
          category: "Headwear"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Snapback Caps",
          category: "Headwear"
        }
      }
    ]
  }
};

const categories = [
  { 
    name: "Baseball", 
    img: "/categories/baseball.jpg",
    alt: "Premium baseball caps collection",
    description: "Classic baseball caps for everyday style"
  },
  { 
    name: "Snapback", 
    img: "/categories/snapback.jpg",
    alt: "Trendy snapback caps collection",
    description: "Adjustable snapback caps with street style"
  },
  { 
    name: "Trucker", 
    img: "/categories/trucker.jpg",
    alt: "Comfortable trucker caps collection",
    description: "Mesh-back trucker caps for comfort"
  },
  { 
    name: "Fitted Cap", 
    img: "/categories/fitted.jpg",
    alt: "Premium fitted caps collection",
    description: "Perfect fit caps in various sizes"
  },
  { 
    name: "Exclusive Collection", 
    img: "/categories/exclusive.jpg",
    alt: "Exclusive designer caps collection",
    description: "Limited edition designer headwear"
  },
];

const features = [
  {
    icon: "🏆",
    title: "Premium Quality",
    description: "Crafted from finest materials for lasting comfort and style",
    benefits: ["Durable construction", "Comfort-first design", "Quality guarantee"]
  },
  {
    icon: "🎨",
    title: "Exclusive Designs",
    description: "Unique patterns and styles you won't find anywhere else",
    benefits: ["Limited editions", "Designer collaborations", "Trend-setting styles"]
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    description: "Quick shipping across India with order tracking",
    benefits: ["2-3 day delivery", "Order tracking", "Secure packaging"]
  },
];

async function getFeaturedProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
    
    return products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt.toString(),
      updatedAt: p.updatedAt.toString(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Optimization */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source media="(max-width: 768px)" srcSet="/hero-mobile.png" />
              <source media="(max-width: 1200px)" srcSet="/hero-desktop.png" />
              <img
                src="/hero-desktop.png"
                alt="Mr.Xy Premium Headwear Collection - Baseball Caps and Snapbacks"
                className="w-full h-full object-cover object-center"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Premium <span className="text-yellow-400">Headwear</span>
              <br className="hidden sm:block" />
              Collection
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Discover exclusive baseball caps, snapbacks, and designer headwear crafted for style and comfort
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                aria-label="Shop all premium headwear products"
              >
                <span>Shop Collection</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-full transition-all duration-300"
                aria-label="Learn more about Mr.Xy brand"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Free Shipping Over ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>7-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Premium Quality Guarantee</span>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find the perfect cap for every occasion and style preference
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group flex flex-col items-center p-4 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg"
                  aria-label={`Shop ${category.name} - ${category.description}`}
                >
                  <div className="relative mb-4 overflow-hidden rounded-full">
                    <img
                      src={category.img}
                      alt={category.alt}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                      loading={index < 3 ? "eager" : "lazy"}
                      width="128"
                      height="128"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center hidden md:block">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Featured Products
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Handpicked favorites from our premium collection
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {featuredProducts.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    aria-label={`View ${product.name} - ₹${product.discountedPrice || product.price}`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0] || "/default-cap.webp"}
                        alt={`${product.name} - Premium headwear by Mr.Xy`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading={index < 4 ? "eager" : "lazy"}
                        width="300"
                        height="300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{product.discountedPrice || product.price}
                        </span>
                        {product.discountedPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/products"
                  className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300"
                  aria-label="View all products in our collection"
                >
                  View All Products
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Mr.Xy?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                We're committed to delivering the best headwear experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-gray-300">
                        <span className="text-yellow-400">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about shopping with Mr.Xy
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Do you offer free shipping?",
                  answer: "Yes! We offer free shipping on all orders over ₹999. Orders below this amount have a flat shipping rate of ₹99."
                },
                {
                  question: "What's your return policy?",
                  answer: "We accept returns within 7 days of delivery. Items must be unworn, with original tags, and in original packaging."
                },
                {
                  question: "How can I track my order?",
                  answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order on our 'Track Order' page."
                },
                {
                  question: "Do you ship internationally?",
                  answer: "Currently, we ship within India only. We're working on expanding international shipping soon!"
                },
                {
                  question: "Are your caps adjustable?",
                  answer: "Most of our caps are adjustable (snapbacks, trucker caps). Fitted caps come in specific sizes. Check individual product descriptions for details."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300"
                aria-label="Contact Mr.Xy customer support"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}