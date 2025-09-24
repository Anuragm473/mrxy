// src/app/(frontend)/page.tsx
import Link from "next/link";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import { Metadata } from "next";
import ProductCards from "@/components/ProductCards";

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
        {/* Hero Section - Fully Responsive */}
        <section className="relative h-[100dvh] min-h-[500px] max-h-[800px] sm:max-h-[700px] md:max-h-[600px] lg:max-h-[800px] flex items-center justify-center overflow-hidden">
          {/* Background Image with Advanced Optimization */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source 
                media="(max-width: 480px)" 
                srcSet="/hero-mobile.png" 
              />
              <source 
                media="(max-width: 768px)" 
                srcSet="/hero-desktop.png" 
              />
              <source 
                media="(max-width: 1024px)" 
                srcSet="/hero-desktop.png" 
              />
              <source 
                media="(max-width: 1440px)" 
                srcSet="/hero-desktop.png" 
              />
              <img
                src="/hero-desktop.png"
                alt="Mr.Xy Premium Headwear Collection - Baseball Caps and Snapbacks"
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
          </div>

          {/* Hero Content - Ultra Responsive */}
          <div className="relative z-10 text-center text-white px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* Main Heading - Responsive Typography */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.1] xs:leading-tight tracking-tight">
              Premium{" "}
              <span className="text-yellow-400 drop-shadow-lg">
                Headwear
              </span>
              <br className="hidden xs:block" />
              <span className="block xs:inline"> Collection</span>
            </h1>
            
            {/* Subtitle - Responsive Text */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 md:mb-10 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto opacity-90 leading-relaxed font-light px-2">
              Discover exclusive baseball caps, snapbacks, and designer headwear crafted for style and comfort
            </p>
            
            {/* CTA Buttons - Mobile First Design */}
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-5 justify-center items-center mb-8 sm:mb-12">
              <Link
                href="/products"
                className="w-full xs:w-auto inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 lg:px-10 py-3 xs:py-3.5 sm:py-4 lg:py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm xs:text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl min-w-[200px] xs:min-w-0"
                aria-label="Shop all premium headwear products"
              >
                <span>Shop Collection</span>
                <svg className="ml-2 w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                href="/about"
                className="w-full xs:w-auto inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 lg:px-10 py-3 xs:py-3.5 sm:py-4 lg:py-5 border-2 border-white text-white hover:bg-white hover:text-black font-semibold text-sm xs:text-base sm:text-lg rounded-full transition-all duration-300 backdrop-blur-sm min-w-[200px] xs:min-w-0"
                aria-label="Learn more about Mr.Xy brand"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators - Responsive Layout */}
            <div className="mt-8 sm:mt-12 flex flex-col xs:flex-row flex-wrap justify-center items-center gap-4 xs:gap-6 sm:gap-8 text-xs xs:text-sm sm:text-base opacity-80">
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm xs:text-base">✓</span>
                <span className="whitespace-nowrap">Free Shipping Over ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm xs:text-base">✓</span>
                <span className="whitespace-nowrap">7-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm xs:text-base">✓</span>
                <span className="whitespace-nowrap">Premium Quality Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section - Ultra Responsive Grid */}
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 tracking-tight">
                Shop by Category
              </h2>
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
                Find the perfect cap for every occasion and style preference
              </p>
            </div>

            {/* Responsive Category Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group flex flex-col items-center p-3 xs:p-4 sm:p-5 lg:p-6 rounded-xl xs:rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  aria-label={`Shop ${category.name} - ${category.description}`}
                >
                  <div className="relative mb-3 xs:mb-4 overflow-hidden rounded-full">
                    <img
                      src={category.img}
                      alt={category.alt}
                      className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                      loading={index < 3 ? "eager" : "lazy"}
                      width="128"
                      height="128"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 xs:mb-2 text-center text-xs xs:text-sm sm:text-base lg:text-lg leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs xs:text-sm text-gray-600 text-center hidden sm:block leading-snug">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products - Responsive Product Grid */}
        {featuredProducts.length > 0 && (
          <section className="py-12 xs:py-16 sm:py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="text-center mb-8 xs:mb-12 sm:mb-16">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 tracking-tight">
                  Featured Products
                </h2>
                <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
                  Handpicked favorites from our premium collection
                </p>
              </div>

              {/* Responsive Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                {featuredProducts.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug}`}
                    className="group bg-white rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
                    <div className="p-3 xs:p-4 sm:p-5 lg:p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 xs:mb-3 line-clamp-2 text-sm xs:text-base sm:text-lg leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                          ₹{product.discountedPrice || product.price}
                        </span>
                        {product.discountedPrice && (
                          <span className="text-sm xs:text-base sm:text-lg text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-8 xs:mt-10 sm:mt-12">
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm xs:text-base sm:text-lg"
                  aria-label="View all products in our collection"
                >
                  View All Products
                  <svg className="ml-2 w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* New Releases Section - Fully Responsive */}
        <section className="relative min-h-[40vh] xs:min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center bg-[url('/hero-desktop.png')] bg-cover bg-center">
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>

          {/* Responsive Content */}
          <div className="relative z-10 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center bg-black/80 backdrop-blur-sm px-4 xs:px-6 sm:px-8 lg:px-12 py-6 xs:py-8 sm:py-10 lg:py-12 rounded-lg xs:rounded-xl sm:rounded-2xl mx-3 xs:mx-4">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 xs:mb-4 sm:mb-6 leading-tight tracking-tight">
              New Releases
            </h2>
            <p className="text-gray-300 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed">
              Versatile Caps for every vibe, whether you are hitting the streets or just chilling at home
            </p>
            <Link
              href="/products"
              className="inline-block px-6 xs:px-7 sm:px-8 lg:px-10 py-3 xs:py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm xs:text-base sm:text-lg"
            >
              All Products
            </Link>
          </div>
        </section>

        {/* Promotional Banner - Ultra Responsive Marquee */}
        <div className="bg-black text-white font-bold text-sm xs:text-base sm:text-lg lg:text-xl py-2 xs:py-3 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex">
            <span className="mx-4 xs:mx-6 sm:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
            <span className="mx-4 xs:mx-6 sm:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
            <span className="mx-4 xs:mx-6 sm:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
            <span className="mx-4 xs:mx-6 sm:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
          </div>
        </div>

        {/* Product Cards Component */}
        <ProductCards/>

        {/* Features Section - Responsive Grid */}
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 xs:mb-4 tracking-tight">
                Why Choose Mr.Xy?
              </h2>
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
                We're committed to delivering the best headwear experience
              </p>
            </div>

            {/* Responsive Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 lg:gap-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl mb-4 xs:mb-5 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold mb-3 xs:mb-4 sm:mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base sm:text-lg lg:text-xl leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2 xs:space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center justify-center gap-2 text-gray-300 text-sm xs:text-base">
                        <span className="text-yellow-400 text-base xs:text-lg">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Mobile Optimized */}
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Everything you need to know about shopping with Mr.Xy
              </p>
            </div>

            {/* Responsive FAQ Items */}
            <div className="space-y-4 xs:space-y-5 sm:space-y-6">
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
                <div key={index} className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 lg:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-900 mb-2 xs:mb-3 leading-tight">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm xs:text-base sm:text-lg">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="text-center mt-8 xs:mt-10 sm:mt-12">
              <p className="text-gray-600 mb-3 xs:mb-4 text-sm xs:text-base sm:text-lg">
                Still have questions?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 xs:px-6 sm:px-7 lg:px-8 py-3 xs:py-3.5 sm:py-4 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300 text-sm xs:text-base sm:text-lg"
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