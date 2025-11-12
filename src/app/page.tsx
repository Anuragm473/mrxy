// src/app/(frontend)/page.tsx
import Link from "next/link";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import { Metadata } from "next";
import ProductCards from "@/components/ProductCards";
import TaglineSlideshow from "@/components/TageLine";
import ImageCarousel from "@/components/ImageCarousel";

export const metadata: Metadata = {
  title: "Buy Premium Caps Online India | Baseball, Snapback & Trucker Caps | Mr.Xy Caps",
  description:
    "Shop premium caps online at Mr.Xy - India's leading headwear brand. Buy baseball caps, snapback caps, trucker caps, fitted caps & alpha gen kids caps. Free shipping ₹999+. COD available. 7-day returns.",
  keywords: [
    "buy caps online",
    "caps online india",
    "baseball caps online",
    "snapback caps india",
    "trucker caps online",
    "fitted caps",
    "premium caps india",
    "designer caps online",
    "alpha gen kids caps",
    "Mr.Xy caps",
    "caps for men",
    "caps for women",
    "caps for kids",
    "headwear online india",
    "buy snapback online",
    "best caps brand india",
    "stylish caps online",
    "sports caps",
    "casual caps",
    "street style caps",
    "adjustable caps",
    "mesh caps",
    "cotton caps",
    "embroidered caps",
    "printed caps",
    "Mumbai caps store",
    "Maharashtra caps online",
  ],
  authors: [{ name: "Mr.Xy Caps" }],
  creator: "Mr.Xy Caps",
  publisher: "Mr.Xy Caps",
  applicationName: "Mr.Xy Caps Store",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.mrxycaps.in",
    siteName: "Mr.Xy Caps - Premium Headwear India",
    title: "Buy Premium Caps Online | Baseball, Snapback & Trucker Caps | Mr.Xy",
    description:
      "Shop India's best collection of premium caps. Baseball caps, snapbacks, trucker caps & more. Free shipping ₹999+. 7-day returns. COD available across India.",
    images: [
      {
        url: "https://www.mrxycaps.in/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Mr.Xy Caps - Premium Baseball Caps, Snapbacks & Trucker Caps Online India",
        type: "image/jpeg",
      },
      {
        url: "https://www.mrxycaps.in/og-caps-collection.jpg",
        width: 1200,
        height: 630,
        alt: "Premium Caps Collection - Baseball, Snapback, Trucker & Fitted Caps",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MrXyCaps",
    creator: "@MrXyCaps",
    title: "Buy Premium Caps Online India | Mr.Xy Caps",
    description:
      "Shop baseball caps, snapbacks & trucker caps. Premium quality. Free shipping ₹999+. 7-day returns.",
    images: ["https://www.mrxycaps.in/twitter-banner.jpg"],
  },
  alternates: {
    canonical: "https://www.mrxycaps.in",
    languages: {
      "en-IN": "https://www.mrxycaps.in",
    },
  },
  category: "E-commerce",
  classification: "Headwear, Fashion Accessories, Caps",
  other: {
    "price:currency": "INR",
    "product:availability": "in stock",
    "product:condition": "new",
    "product:brand": "Mr.Xy Caps",
    "product:retailer_item_id": "mrxy-caps-india",
    "og:locality": "Mumbai",
    "og:region": "Maharashtra",
    "og:country-name": "India",
    "og:phone_number": "+91-9920910956",
  },
};

// Enhanced Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.mrxycaps.in/#organization",
      name: "Mr.Xy Caps",
      legalName: "Mr.Xy Caps India",
      url: "https://www.mrxycaps.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mrxycaps.in/logo.jpg",
        width: 600,
        height: 600,
      },
      description:
        "India's premium headwear brand specializing in baseball caps, snapback caps, trucker caps, fitted caps, and alpha gen kids caps. Free shipping, easy returns, and COD available.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9920910956",
        contactType: "Customer Service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.instagram.com/mrxycaps",
        "https://www.facebook.com/mrxycaps",
        "https://twitter.com/mrxycaps",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mrxycaps.in/#website",
      url: "https://www.mrxycaps.in",
      name: "Mr.Xy Caps",
      description:
        "Buy premium caps online in India - Baseball caps, Snapback caps, Trucker caps, Fitted caps",
      publisher: {
        "@id": "https://www.mrxycaps.in/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.mrxycaps.in/products?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Store",
      "@id": "https://www.mrxycaps.in/#store",
      name: "Mr.Xy Caps Online Store",
      image: "https://www.mrxycaps.in/store-banner.jpg",
      description:
        "Premium online caps store in India offering baseball caps, snapbacks, trucker caps, fitted caps, and alpha gen kids caps with free shipping on orders above ₹999.",
      url: "https://www.mrxycaps.in",
      telephone: "+91-9920910956",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Premium Caps Collection",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Baseball Caps",
              description: "Premium baseball caps for men, women, and kids",
              category: "Headwear/Baseball Caps",
              brand: { "@type": "Brand", name: "Mr.Xy Caps" },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Snapback Caps",
              description: "Adjustable snapback caps with modern designs",
              category: "Headwear/Snapback Caps",
              brand: { "@type": "Brand", name: "Mr.Xy Caps" },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Trucker Caps",
              description: "Breathable mesh-back trucker caps",
              category: "Headwear/Trucker Caps",
              brand: { "@type": "Brand", name: "Mr.Xy Caps" },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Fitted Caps",
              description: "Perfect fit caps in multiple sizes",
              category: "Headwear/Fitted Caps",
              brand: { "@type": "Brand", name: "Mr.Xy Caps" },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Alpha Gen Kids Caps",
              description: "Stylish caps designed for young generation",
              category: "Headwear/Kids Caps",
              brand: { "@type": "Brand", name: "Mr.Xy Caps" },
            },
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.mrxycaps.in/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.mrxycaps.in",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.mrxycaps.in/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do you offer free shipping on caps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! We offer free shipping on all orders over ₹999 across India. Orders below this amount have a flat shipping rate of ₹99.",
          },
        },
        {
          "@type": "Question",
          name: "What types of caps do you sell?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We sell premium baseball caps, snapback caps, trucker caps, fitted caps, and alpha gen kids caps. All our caps are made from high-quality materials.",
          },
        },
        {
          "@type": "Question",
          name: "What is your return policy for caps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We accept returns within 7 days of delivery. Items must be unworn, with original tags, and in original packaging for a full refund.",
          },
        },
        {
          "@type": "Question",
          name: "Do you ship caps across India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we ship premium caps across all of India. Delivery typically takes 2-5 business days depending on your location.",
          },
        },
        {
          "@type": "Question",
          name: "Are your caps adjustable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most of our caps including snapbacks and trucker caps are adjustable. Fitted caps come in specific sizes (S, M, L, XL). Check individual product descriptions for details.",
          },
        },
      ],
    },
  ],
};

const categories = [
  {
    name: "Baseball",
    img: "/categories/baseball.jpg",
    alt: "Buy Premium Baseball Caps Online India - Mr.Xy Caps",
    description: "Classic baseball caps for men, women & kids - everyday style",
    slug: "baseball-caps",
  },
  {
    name: "Snapback",
    img: "/categories/snapback.jpg",
    alt: "Buy Snapback Caps Online India - Adjustable Premium Caps",
    description: "Adjustable snapback caps with street style - trending designs",
    slug: "snapback-caps",
  },
  {
    name: "Trucker",
    img: "/categories/trucker.jpg",
    alt: "Buy Trucker Caps Online India - Breathable Mesh Caps",
    description: "Mesh-back trucker caps for comfort - breathable & stylish",
    slug: "trucker-caps",
  },
  {
    name: "Fitted Cap",
    img: "/categories/fitted.jpg",
    alt: "Buy Fitted Caps Online India - Perfect Fit Premium Caps",
    description: "Perfect fit caps in various sizes - S, M, L, XL available",
    slug: "fitted-caps",
  },
  {
    name: "Exclusive Collection",
    img: "/categories/exclusive.jpg",
    alt: "Buy Designer Caps Online India - Limited Edition Premium Caps",
    description: "Limited edition designer headwear - exclusive premium quality",
    slug: "exclusive-caps",
  },
  {
    name: "Alpha Gen Kids",
    img: "/categories/exclusive.jpg",
    alt: "Buy Kids Caps Online India - Alpha Gen Children's Caps",
    description: "Stylish caps for kids - alpha gen design for young trendsetters",
    slug: "kids-caps",
  },
];

const features = [
  {
    icon: "🏆",
    title: "Premium Quality Caps",
    description: "100% original premium caps made from finest materials for lasting comfort, durability and style",
    benefits: [
      "Durable construction for long-lasting wear",
      "Comfort-first ergonomic design",
      "Quality guarantee on all caps",
    ],
  },
  {
    icon: "🎨",
    title: "Exclusive Cap Designs",
    description: "Unique patterns, embroidery and styles you won't find in other caps stores online",
    benefits: [
      "Limited edition cap collections",
      "Designer collaborations",
      "Trend-setting street style caps",
    ],
  },
  {
    icon: "🚀",
    title: "Fast Delivery Across India",
    description: "Quick shipping of caps across India with real-time order tracking and secure packaging",
    benefits: ["2-5 day delivery nationwide", "Real-time order tracking", "Secure packaging for caps"],
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
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen">
        {/* Hero Section - SEO Optimized */}
        <section 
          className="relative h-[100dvh] min-h-[500px] max-h-[800px] sm:max-h-[700px] md:max-h-[600px] lg:max-h-[800px] flex items-center justify-center overflow-hidden"
          aria-label="Mr.Xy Caps - Buy Premium Caps Online in India"
        >
          {/* Background Image with Advanced Optimization */}
          <div className="absolute inset-0 z-0">
            <picture>
              <source media="(max-width: 480px)" srcSet="/hero-mobile.png" />
              <source media="(max-width: 768px)" srcSet="/hero-desktop.png" />
              <source media="(max-width: 1024px)" srcSet="/hero-desktop.png" />
              <source media="(max-width: 1440px)" srcSet="/hero-desktop.png" />
              <img
                src="/hero-desktop.png"
                alt="Buy Premium Caps Online India - Baseball Caps, Snapback Caps, Trucker Caps | Mr.Xy"
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                loading="eager"
                fetchPriority="high"
                width="1920"
                height="800"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
          </div>

          {/* Hero Content - SEO Enhanced */}
          <div className="relative z-10 text-center text-white px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <h1 className="text-2xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-[1.1] xs:leading-tight tracking-tight">
              Buy Premium{" "}
              <span className="text-yellow-400 drop-shadow-lg">Caps Online</span>
              <br className="hidden xs:block" />
              <span className="block xs:inline"> in India</span>
            </h1>

            {/* <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 md:mb-10 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto opacity-90 leading-relaxed font-light px-2">
              Shop premium baseball caps, snapback caps, trucker caps, fitted caps & alpha gen kids caps. Free shipping above ₹999 | 7-day returns | COD available
            </p> */}

            {/* CTA Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-5 justify-center items-center mb-8 sm:mb-12">
              <Link
                href="/products"
                className="w-full xs:w-auto inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 lg:px-10 py-3 xs:py-3.5 sm:py-4 lg:py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm xs:text-base sm:text-lg rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl min-w-[200px] xs:min-w-0"
                aria-label="Shop all premium caps - Baseball, Snapback, Trucker & Fitted Caps"
                title="Buy Premium Caps Online"
              >
                <span>Shop Premium Caps</span>
                <svg
                  className="ml-2 w-4 h-4 xs:w-5 xs:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>

              <Link
                href="/about"
                className="w-full xs:w-auto inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 lg:px-10 py-3 xs:py-3.5 sm:py-4 lg:py-5 border-2 border-white text-white hover:bg-white hover:text-black font-semibold text-sm xs:text-base sm:text-lg rounded-full transition-all duration-300 backdrop-blur-sm min-w-[200px] xs:min-w-0"
                aria-label="Learn more about Mr.Xy Caps - India's premium cap brand"
                title="About Mr.Xy Caps"
              >
                About Mr.Xy Caps
              </Link>
            </div>

            {/* Trust Indicators - SEO Enhanced */}
            <div className="mt-8 sm:mt-12 flex flex-col xs:flex-row flex-wrap justify-center items-center gap-4 xs:gap-6 sm:gap-8 text-xs xs:text-sm sm:text-base opacity-80">
              <div className="flex items-center gap-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <span className="text-green-400 text-sm xs:text-base" aria-hidden="true">✓</span>
                <span className="whitespace-nowrap">Free Shipping Over ₹999</span>
                <meta itemProp="priceCurrency" content="INR" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm xs:text-base" aria-hidden="true">✓</span>
                <span className="whitespace-nowrap">7-Day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm xs:text-base" aria-hidden="true">✓</span>
                <span className="whitespace-nowrap">100% Original Caps</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tagline Slideshow Section */}
        <section className="py-6 xs:py-8 sm:py-10 bg-gray-900" aria-label="Featured promotions">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <TaglineSlideshow />
          </div>
        </section>

        {/* Categories Section - SEO Enhanced */}
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gray-50" aria-labelledby="categories-heading">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <h2 id="categories-heading" className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 tracking-tight">
                Shop Caps by Category
              </h2>
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
                Browse our complete collection of baseball caps, snapback caps, trucker caps, fitted caps and kids caps
              </p>
            </div>

            {/* Enhanced Category Grid with Schema */}
            <nav className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 xs:gap-4 sm:gap-6 lg:gap-8" aria-label="Cap categories">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group flex flex-col items-center p-3 xs:p-4 sm:p-5 lg:p-6 rounded-xl xs:rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  aria-label={`Shop ${category.name} - ${category.description}`}
                  title={`Buy ${category.name} Online India`}
                  itemProp="url"
                  itemScope
                  itemType="https://schema.org/ProductCategory"
                >
                  <div className="relative mb-3 xs:mb-4 overflow-hidden rounded-full">
                    <img
                      src={category.img}
                      alt={category.alt}
                      className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                      loading={index < 3 ? "eager" : "lazy"}
                      width="128"
                      height="128"
                      itemProp="image"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 xs:mb-2 text-center text-xs xs:text-sm sm:text-base lg:text-lg leading-tight" itemProp="name">
                    {category.name}
                  </h3>
                  <p className="text-xs xs:text-sm text-gray-600 text-center hidden sm:block leading-snug" itemProp="description">
                    {category.description}
                  </p>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* SEO Content Section - Rich Text for Keywords */}
        {/* <section className="py-12 xs:py-16 sm:py-20 bg-white" aria-labelledby="seo-content-heading">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <h2 id="seo-content-heading" className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Premium Caps Online India - Mr.Xy Caps
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Welcome to <strong>Mr.Xy Caps</strong>, India's leading online destination for <strong>premium caps</strong>. 
                Whether you're looking to <strong>buy baseball caps online</strong>, <strong>snapback caps</strong>, 
                <strong>trucker caps</strong>, or <strong>fitted caps</strong>, we offer the finest collection of headwear 
                designed for style, comfort, and durability.
              </p>
              <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mt-8 mb-4">
                Why Buy Caps from Mr.Xy?
              </h3>
              <p className="text-gray-700 mb-4">
                At Mr.Xy Caps, we understand that a cap is more than just an accessory – it's a statement of your personal style. 
                Our <strong>premium caps online India</strong> collection features:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Baseball Caps</strong>: Classic 6-panel construction with curved brim, perfect for everyday wear</li>
                <li><strong>Snapback Caps</strong>: Adjustable back closure with flat brim for urban street style</li>
                <li><strong>Trucker Caps</strong>: Breathable mesh back panels ideal for outdoor activities and sports</li>
                <li><strong>Fitted Caps</strong>: Professional fitted design available in multiple sizes (S, M, L, XL)</li>
                <li><strong>Alpha Gen Kids Caps</strong>: Specially designed caps for children with comfortable, secure fit</li>
              </ul>
              <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mt-8 mb-4">
                Shop Caps Online with Confidence
              </h3>
              <p className="text-gray-700 mb-4">
                When you <strong>buy caps online</strong> from Mr.Xy, you get <strong>free shipping on orders above ₹999</strong>, 
                7-day easy returns, and COD (Cash on Delivery) facility across India. We ship to Mumbai, Delhi, Bangalore, 
                Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, and all major cities in India.
              </p>
            </article>
          </div>
        </section> */}

        {/* Image Carousel Section */}
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gray-50" aria-label="Cap collection showcase">
          <ImageCarousel />
        </section>

        {/* Featured Products - SEO Enhanced */}
        {featuredProducts.length > 0 && (
          <section className="py-12 xs:py-16 sm:py-20 lg:py-24" aria-labelledby="featured-heading" itemScope itemType="https://schema.org/ItemList">
            <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 xs:mb-12 sm:mb-16">
                <h2 id="featured-heading" className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 xs:mb-4 tracking-tight" itemProp="name">
                  Featured Premium Caps
                </h2>
                <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed" itemProp="description">
                  Handpicked bestselling caps from our premium collection - Baseball, Snapback & Trucker Caps
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
                {featuredProducts.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug}`}
                    className="group bg-white rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    aria-label={`Buy ${product.name} - Premium Cap Online India - ₹${product.discountedPrice || product.price}`}
                    title={`Buy ${product.name} Online`}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/Product"
                  >
                    <meta itemProp="position" content={String(index + 1)} />
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[0] || "/default-cap.webp"}
                        alt={`${product.name} - Premium ${product.category || 'Cap'} by Mr.Xy Caps India`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading={index < 4 ? "eager" : "lazy"}
                        width="300"
                        height="300"
                        itemProp="image"
                      />
                    </div>
                    <div className="p-3 xs:p-4 sm:p-5 lg:p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 xs:mb-3 line-clamp-2 text-sm xs:text-base sm:text-lg leading-tight" itemProp="name">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900" itemProp="price" content={String(product.discountedPrice || product.price)}>
                          ₹{product.discountedPrice || product.price}
                        </span>
                        <meta itemProp="priceCurrency" content="INR" />
                        <meta itemProp="availability" content="https://schema.org/InStock" />
                        <meta itemProp="url" content={`https://www.mrxycaps.in/product/${product.slug}`} />
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

              <div className="text-center mt-8 xs:mt-10 sm:mt-12">
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm xs:text-base sm:text-lg"
                  aria-label="View all premium caps - Complete collection of baseball, snapback, trucker & fitted caps"
                  title="Shop All Premium Caps Online"
                >
                  View All Premium Caps
                  <svg
                    className="ml-2 w-4 h-4 xs:w-5 xs:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* New Releases Section - SEO Optimized */}
        <section className="relative min-h-[40vh] xs:min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center bg-[url('/hero-desktop.png')] bg-cover bg-center" aria-labelledby="new-releases-heading">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>

          <div className="relative z-10 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center bg-black/80 backdrop-blur-sm px-4 xs:px-6 sm:px-8 lg:px-12 py-6 xs:py-8 sm:py-10 lg:py-12 rounded-lg xs:rounded-xl sm:rounded-2xl mx-3 xs:mx-4">
            <h2 id="new-releases-heading" className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 xs:mb-4 sm:mb-6 leading-tight tracking-tight">
              New Cap Releases 2025
            </h2>
            <p className="text-gray-300 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base sm:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed">
              Latest arrivals: Versatile premium caps for every style - street wear, casual, sports. Perfect for any occasion
            </p>
            <Link
              href="/products"
              className="inline-block px-6 xs:px-7 sm:px-8 lg:px-10 py-3 xs:py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm xs:text-base sm:text-lg"
              title="Shop New Cap Arrivals"
            >
              Shop New Arrivals
            </Link>
          </div>
        </section>

        {/* Promotional Banner - SEO Optimized */}
        <div className="bg-black text-white font-bold text-sm xs:text-base sm:text-lg lg:text-xl py-2 xs:py-3 overflow-hidden relative" role="banner" aria-label="Special offer">
          <div className="animate-marquee whitespace-nowrap flex">
            <span className="mx-4 xs:mx-6 sm:mx-8">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING ABOVE ₹999 🎉
            </span>
            <span className="mx-4 xs:mx-6 sm:mx-8">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING ABOVE ₹999 🎉
            </span>
            <span className="mx-4 xs:mx-6 sm:mx-8">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING ABOVE ₹999 🎉
            </span>
            <span className="mx-4 xs:mx-6 sm:mx-8">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING ABOVE ₹999 🎉
            </span>
          </div>
        </div>

        {/* Product Cards Component */}
        <ProductCards />

        {/* Features Section - SEO Enhanced */}
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24 bg-gray-900 text-white" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <h2 id="features-heading" className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 xs:mb-4 tracking-tight">
                Why Buy Caps from Mr.Xy?
              </h2>
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-xs xs:max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
                India's most trusted online cap store - Premium quality, exclusive designs, fast delivery
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 lg:gap-12">
              {features.map((feature, index) => (
                <article key={index} className="text-center group">
                  <div className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl mb-4 xs:mb-5 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
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
                      <li
                        key={idx}
                        className="flex items-center justify-center gap-2 text-gray-300 text-sm xs:text-base"
                      >
                        <span className="text-yellow-400 text-base xs:text-lg" aria-hidden="true">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SEO-Rich Content Section - Additional Keywords */}
        <section className="py-12 xs:py-16 sm:py-20 bg-gray-50" aria-labelledby="buying-guide-heading">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg max-w-none">
              <h2 id="buying-guide-heading" className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Complete Guide to Buying Caps Online in India
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Types of Caps We Offer</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>Baseball Caps:</strong> Classic 6-panel curved brim caps perfect for casual wear, sports, and outdoor activities</li>
                    <li><strong>Snapback Caps:</strong> Adjustable flat brim caps with snap closure - ideal for urban street style</li>
                    <li><strong>Trucker Caps:</strong> Mesh back panels for breathability, perfect for summer and sports</li>
                    <li><strong>Fitted Caps:</strong> Professional tailored fit available in S, M, L, XL sizes</li>
                    <li><strong>Kids Caps:</strong> Alpha Gen collection designed specifically for children's comfort and style</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Cap Materials & Quality</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li><strong>100% Cotton Caps:</strong> Soft, breathable, perfect for all-day comfort</li>
                    <li><strong>Polyester Blend:</strong> Durable, moisture-wicking, quick-dry technology</li>
                    <li><strong>Mesh Panels:</strong> Enhanced ventilation for hot weather and sports</li>
                    <li><strong>Premium Embroidery:</strong> High-quality stitching that lasts years</li>
                    <li><strong>UV Protection:</strong> Many caps offer sun protection for outdoor use</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Mr.Xy is the Best Online Cap Store in India</h3>
              <p className="text-gray-700 mb-4">
                When you <strong>shop caps online</strong> at Mr.Xy, you're choosing India's premier headwear destination. 
                We offer <strong>premium quality caps</strong> at competitive prices with benefits you won't find elsewhere:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Free Shipping:</strong> On all orders above ₹999 across India</li>
                <li><strong>COD Available:</strong> Cash on Delivery option for your convenience</li>
                <li><strong>Easy Returns:</strong> 7-day hassle-free return policy</li>
                <li><strong>Authentic Products:</strong> 100% original caps, no duplicates</li>
                <li><strong>Pan-India Delivery:</strong> We ship to all cities - Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, and more</li>
                <li><strong>Secure Payments:</strong> Multiple payment options with bank-level security</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">How to Choose the Right Cap</h3>
              <p className="text-gray-700 mb-4">
                Selecting the perfect cap depends on your needs. For <strong>sports and outdoor activities</strong>, choose 
                our <strong>trucker caps</strong> with mesh panels. For <strong>fashion and street style</strong>, our 
                <strong>snapback caps</strong> are ideal. Looking for a <strong>professional look</strong>? Our 
                <strong>fitted caps</strong> offer a tailored appearance. And for <strong>classic everyday wear</strong>, 
                nothing beats our <strong>baseball caps</strong>.
              </p>
            </article>
          </div>
        </section>

        {/* FAQ Section - Enhanced for SEO */}
        <section className="py-12 xs:py-16 sm:py-20 lg:py-24" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 xs:mb-12 sm:mb-16">
              <h2 id="faq-heading" className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-4 tracking-tight">
                Frequently Asked Questions - Buying Caps Online
              </h2>
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Common questions about ordering premium caps from Mr.Xy Caps India
              </p>
            </div>

            <div className="space-y-4 xs:space-y-5 sm:space-y-6" itemScope itemType="https://schema.org/FAQPage">
              {[
                {
                  question: "Do you offer free shipping on caps?",
                  answer:
                    "Yes! We offer free shipping on all cap orders over ₹999 across India. Orders below ₹999 have a flat shipping rate of ₹99. We ship to all major cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Pune, and more.",
                },
                {
                  question: "What types of caps do you sell?",
                  answer:
                    "Mr.Xy Caps offers a complete range: Premium Baseball Caps (classic 6-panel curved brim), Snapback Caps (adjustable flat brim), Trucker Caps (mesh back for breathability), Fitted Caps (tailored fit in multiple sizes), and Alpha Gen Kids Caps (specially designed for children).",
                },
                {
                  question: "What's your return policy for caps?",
                  answer:
                    "We accept returns within 7 days of delivery. Caps must be unworn, unwashed, with original tags attached, and in original packaging. We offer easy return pickup and full refund for eligible returns.",
                },
                {
                  question: "Do you ship caps across India?",
                  answer:
                    "Yes, we ship premium caps across all of India. Delivery typically takes 2-5 business days depending on your location. We serve Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, and 25,000+ pin codes nationwide.",
                },
                {
                  question: "Are your caps adjustable?",
                  answer:
                    "Most of our caps are adjustable including Snapback Caps (snap closure), Trucker Caps (snap closure), and Baseball Caps with adjustable straps. Fitted Caps come in specific sizes: Small (54-55cm), Medium (56-57cm), Large (58-59cm), and X-Large (60-61cm). Check individual product pages for sizing details.",
                },
                {
                  question: "Is Cash on Delivery (COD) available?",
                  answer:
                    "Yes! We offer Cash on Delivery (COD) option across India. You can pay when your cap order is delivered to your doorstep. Additional prepaid discounts available - save 10% on prepaid orders.",
                },
                {
                  question: "How do I track my cap order?",
                  answer:
                    "Once your order ships, you'll receive a tracking number via email and SMS. You can track your cap delivery in real-time on our 'Track Order' page or directly on the courier partner's website.",
                },
                {
                  question: "Are Mr.Xy caps original and authentic?",
                  answer:
                    "Yes, 100%! All caps sold on mrxycaps.in are authentic, original products. We guarantee premium quality with no duplicates or imitations. Every cap comes with quality assurance and brand authenticity.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg dark:shadow-gray-900/50 dark:hover:shadow-gray-900/70 transition-all duration-300"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 xs:p-5 sm:p-6 lg:p-8 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg xs:rounded-xl sm:rounded-2xl transition-colors duration-200">
                    <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight pr-4" itemProp="name">
                      {faq.question}
                    </h3>
                    <svg
                      className="w-5 h-5 xs:w-6 xs:h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 group-open:rotate-180 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-4 xs:px-5 sm:px-6 lg:px-8 pb-4 xs:pb-5 sm:pb-6 lg:pb-8 pt-0" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm xs:text-base sm:text-lg border-t border-gray-100 dark:border-gray-700 pt-4" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="text-center mt-8 xs:mt-10 sm:mt-12">
              <p className="text-gray-600 mb-3 xs:mb-4 text-sm xs:text-base sm:text-lg">
                Still have questions about buying caps online?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 xs:px-6 sm:px-7 lg:px-8 py-3 xs:py-3.5 sm:py-4 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-300 text-sm xs:text-base sm:text-lg"
                aria-label="Contact Mr.Xy Caps customer support team"
                title="Contact Us - Mr.Xy Caps"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* Final SEO Footer Content */}
        <section className="py-12 bg-gray-100" aria-label="About Mr.Xy Caps">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mr.Xy Caps - India's Premium Online Cap Store
              </h2>
              <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Based in Mumbai, Maharashtra, <strong>Mr.Xy Caps</strong> is your trusted destination to 
                <strong> buy caps online in India</strong>. We specialize in premium <strong>baseball caps</strong>, 
                <strong>snapback caps</strong>, <strong>trucker caps</strong>, <strong>fitted caps</strong>, and 
                <strong>kids caps</strong>. Shop with confidence with our free shipping, easy returns, and 
                COD facility. Follow us on Instagram <a href="https://www.instagram.com/mrxycaps" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">@mrxycaps</a> for 
                latest arrivals and exclusive offers.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>✓ 10,000+ Happy Customers</span>
                <span>✓ 5-Star Rated</span>
                <span>✓ Pan-India Delivery</span>
                <span>✓ 100% Authentic Caps</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}