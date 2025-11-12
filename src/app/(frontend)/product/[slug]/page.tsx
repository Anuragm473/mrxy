import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import AddToCartButton from "@/components/AddToCartButton";
import { Metadata } from "next";
import ProductCards from "@/components/ProductCards";
import Link from "next/link";
import ImageSlider from "@/components/ImageSliders";

interface ProductPageProps {
  params: { slug: string };
}

const categories = [
  { 
    name: "Baseball", 
    img: "/categories/baseball.jpg",
    alt: "Premium baseball caps collection at Mr. Xy Caps",
    description: "Classic baseball caps for everyday style"
  },
  { 
    name: "Snapback", 
    img: "/categories/snapback.jpg",
    alt: "Trendy snapback caps collection at Mr. Xy Caps",
    description: "Adjustable snapback caps with street style"
  },
  { 
    name: "Trucker", 
    img: "/categories/trucker.jpg",
    alt: "Comfortable trucker caps collection at Mr. Xy Caps",
    description: "Mesh-back trucker caps for comfort"
  },
  { 
    name: "Fitted Cap", 
    img: "/categories/fitted.jpg",
    alt: "Premium fitted caps collection at Mr. Xy Caps",
    description: "Perfect fit caps in various sizes"
  },
  { 
    name: "Exclusive Collection", 
    img: "/categories/exclusive.jpg",
    alt: "Exclusive designer caps collection at Mr. Xy Caps",
    description: "Limited edition designer headwear"
  },
  { 
    name: "Alpha Gen Kids", 
    img: "/categories/exclusive.jpg",
    alt: "Trendy caps for Alpha Gen kids at Mr. Xy Caps",
    description: "Cool and stylish caps designed for the young Alpha Gen kids"
  }
];

// Enhanced SEO metadata generation
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  await dbConnect();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return {
      title: "Product Not Found | Mr. Xy Caps - Premium Caps Online India",
      description: "The requested cap product could not be found. Browse our collection of baseball caps, snapback caps, trucker caps, and fitted caps.",
      alternates: {
        canonical: "https://www.mrxycaps.in/products"
      }
    };
  }

  const price = product.discountedPrice ?? product.price;
  const originalPrice = product.discountedPrice ? product.price : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Enhanced keywords based on product attributes
  const keywords = [
    product.name.toLowerCase(),
    `${product.category.toLowerCase()} caps`,
    `${product.color.toLowerCase()} caps`,
    "caps online india",
    "buy caps online",
    "premium caps",
    "stylish caps",
    "caps for men",
    "caps for women",
    "baseball caps india",
    "snapback caps",
    "trucker caps",
    "fitted caps",
    "Mr. Xy Caps",
    "mrxycaps",
    "designer caps india",
    "trendy caps online",
    "affordable caps"
  ];

  return {
    title: `${product.name} - ${product.category} Cap | Buy Online at Mr. Xy Caps India`,
    description: `Shop ${product.name} in ${product.color} at Mr. Xy Caps. ${product.description} Available for ₹${price}${originalPrice ? ` (${discount}% OFF, was ₹${originalPrice})` : ''}. Free shipping on orders above ₹999. Premium quality caps online in India.`,
    keywords: keywords.join(", "),
    authors: [{ name: "Mr. Xy Caps" }],
    creator: "Mr. Xy Caps",
    publisher: "Mr. Xy Caps",
    
    openGraph: {
      title: `${product.name} - ${product.category} Cap | Mr. Xy Caps`,
      description: `${product.description} Buy now at ₹${price}${originalPrice ? ` (${discount}% OFF)` : ''}. Premium quality ${product.category.toLowerCase()} caps online in India.`,
      url: `https://www.mrxycaps.in/products/${product.slug}`,
      siteName: "Mr. Xy Caps",
      images: product.images && product.images.length > 0 ? product.images.map((img: string) => ({
        url: img.startsWith('http') ? img : `https://www.mrxycaps.in${img}`,
        width: 1200,
        height: 630,
        alt: `${product.name} - ${product.category} Cap at Mr. Xy Caps`
      })) : [{
        url: "https://www.mrxycaps.in/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Mr. Xy Caps - Premium Caps Online India"
      }],
      locale: "en_IN",
      type: "website",
    },
    
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Buy Online at Mr. Xy Caps`,
      description: `${product.description} ₹${price}${originalPrice ? ` (${discount}% OFF)` : ''}. Free shipping above ₹999.`,
      site: "@mrxycaps",
      creator: "@mrxycaps",
      images: product.images && product.images.length > 0 ? [product.images[0]] : ["/og-default.jpg"],
    },
    
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
    
    alternates: {
      canonical: `https://www.mrxycaps.in/products/${product.slug}`,
    },
    
    other: {
      'price:amount': price.toString(),
      'price:currency': 'INR',
      'product:availability': 'in stock',
      'product:condition': 'new',
      'product:brand': 'Mr. Xy Caps',
      'product:category': product.category,
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  await dbConnect();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Product not found</p>
          <Link href="/products" className="inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const price = product.discountedPrice ?? product.price;
  const originalPrice = product.discountedPrice ? product.price : null;
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Enhanced structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images && product.images.length > 0 ? product.images : ["https://www.mrxycaps.in/placeholder.jpg"],
    "description": product.description,
    "sku": product._id.toString(),
    "mpn": product._id.toString(),
    "brand": {
      "@type": "Brand",
      "name": "Mr. Xy Caps"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Mr. Xy Caps"
    },
    "category": product.category,
    "color": product.color,
    "material": product.details?.includes("material:") ? product.details.split("material:")[1]?.split("\n")[0]?.trim() : "Premium Cotton",
    "offers": {
      "@type": "Offer",
      "url": `https://www.mrxycaps.in/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": price,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          },
          "cutoffTime": "18:00:00",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 7,
            "unitCode": "DAY"
          }
        }
      },
      "seller": {
        "@type": "Organization",
        "name": "Mr. Xy Caps",
        "url": "https://www.mrxycaps.in"
      }
    },
    "aggregateRating": product.reviews && product.reviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / product.reviews.length,
      "reviewCount": product.reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": product.reviews && product.reviews.length > 0 ? product.reviews.map((review: any) => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": review.userName
      },
      "reviewBody": review.comment
    })) : undefined
  };

  // Breadcrumb structured data
  const breadcrumbData = {
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
        "name": "Products",
        "item": "https://www.mrxycaps.in/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `https://www.mrxycaps.in/products?category=${encodeURIComponent(product.category)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `https://www.mrxycaps.in/products/${product.slug}`
      }
    ]
  };

  // Website structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mr. Xy Caps",
    "url": "https://www.mrxycaps.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.mrxycaps.in/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />

      {/* Breadcrumb Navigation with enhanced SEO */}
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 overflow-x-auto whitespace-nowrap" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-yellow-500 transition-colors font-medium" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-400 dark:text-gray-600" aria-hidden="true">→</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/products" className="hover:text-yellow-500 transition-colors font-medium" itemProp="item">
                <span itemProp="name">Caps</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-400 dark:text-gray-600" aria-hidden="true">→</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link 
                href={`/products?category=${encodeURIComponent(product.category)}`} 
                className="hover:text-yellow-500 transition-colors font-medium"
                itemProp="item"
              >
                <span itemProp="name">{product.category} Caps</span>
              </Link>
              <meta itemProp="position" content="3" />
            </li>
            <li className="text-gray-400 dark:text-gray-600" aria-hidden="true">→</li>
            <li className="text-gray-900 dark:text-white font-semibold truncate max-w-32 sm:max-w-none" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">{product.name}</span>
              <meta itemProp="position" content="4" />
            </li>
          </ol>
        </div>
      </nav>

      <main className="w-full bg-gray-50 dark:bg-gray-900">
        <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-800" itemScope itemType="https://schema.org/Product">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Image Slider Component */}
              <ImageSlider 
                images={product.images && product.images.length > 0 ? product.images : ['/placeholder.jpg']} 
                productName={product.name}
                discount={discount}
              />

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-yellow-600 dark:text-yellow-400 text-sm uppercase tracking-wider font-bold mb-2 flex items-center">
                    <span className="w-8 h-0.5 bg-yellow-400 mr-2" aria-hidden="true"></span>
                    <span itemProp="category">{product.category} Cap</span>
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight" itemProp="name">
                    {product.name} - Premium {product.category} Cap
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed" itemProp="description">
                    {product.description}
                  </p>
                  <meta itemProp="color" content={product.color} />
                  <meta itemProp="brand" content="Mr. Xy Caps" />
                  <meta itemProp="sku" content={product._id.toString()} />
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <div className="flex items-baseline space-x-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white" itemProp="price" content={price.toString()}>
                      ₹{price}
                    </span>
                    <meta itemProp="priceCurrency" content="INR" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                    <meta itemProp="url" content={`https://www.mrxycaps.in/products/${product.slug}`} />
                    {originalPrice && (
                      <>
                        <span className="text-2xl text-gray-400 dark:text-gray-500 line-through">₹{originalPrice}</span>
                        <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                          Save ₹{originalPrice - price} ({discount}% OFF)
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Inclusive of all taxes • Free Shipping on Orders Above ₹999</p>
                </div>

                {product.details && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-sm">
                    <h2 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center">
                      <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      Product Specifications
                    </h2>
                    <dl className="space-y-3 text-sm">
                      {product.details.split('\n').map((detail: string, index: number) => {
                        const [key, value] = detail.split(': ');
                        return (
                          <div key={index} className="flex border-b border-gray-100 dark:border-gray-800 pb-2 last:border-0">
                            <dt className="font-semibold text-gray-700 dark:text-gray-300 w-32 flex-shrink-0 capitalize">{key}:</dt>
                            <dd className="text-gray-600 dark:text-gray-400">{value}</dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                )}

                <div className="pt-4">
                  <AddToCartButton
                    productId={product._id.toString()}
                    name={product.name}
                    price={product.price}
                    discountedPrice={product.discountedPrice}
                    image={product.images?.[0]}
                  />
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                    🚚 Free shipping on orders above ₹999 • 30-Day Easy Returns
                  </p>
                </div>

                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-2 border-yellow-200 dark:border-yellow-700">
                    <h2 className="font-bold text-gray-900 dark:text-white mb-4 text-lg flex items-center">
                      <svg className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      Care Instructions
                    </h2>
                    <ul className="space-y-2 text-sm">
                      {product.careInstructions.map((instruction: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-1.5 flex-shrink-0" aria-hidden="true"></span>
                          <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* SEO-Friendly Content Section */}
            <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About {product.name} - {product.category} Cap
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                <p className="mb-4">
                  Discover the perfect blend of style and comfort with our {product.name} in stunning {product.color}. 
                  This premium {product.category.toLowerCase()} cap from Mr. Xy Caps is designed for those who appreciate 
                  quality craftsmanship and contemporary fashion.
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                  Why Choose This {product.category} Cap?
                </h3>
                <p className="mb-4">
                  At Mr. Xy Caps, we understand that a great cap is more than just an accessory – it's a statement 
                  of your personal style. Our {product.name} features premium materials and attention to detail that 
                  sets it apart from ordinary caps. Whether you're looking for baseball caps, snapback caps, trucker 
                  caps, or fitted caps, we have the perfect option for every style preference.
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                  Premium Quality Caps Online in India
                </h3>
                <p className="mb-4">
                  Shopping for caps online has never been easier. Mr. Xy Caps offers a curated collection of 
                  high-quality headwear that combines durability with contemporary design. Our {product.category.toLowerCase()} 
                  caps are perfect for casual outings, sports activities, or adding that finishing touch to your 
                  streetwear ensemble.
                </p>
                <p className="mb-4">
                  <strong>Free Shipping:</strong> Enjoy free shipping on all orders above ₹999 across India. 
                  <strong> Easy Returns:</strong> Not satisfied? We offer hassle-free 30-day returns. 
                  <strong> Authentic Products:</strong> 100% genuine caps with quality guarantee.
                </p>
              </div>
            </section>
          </div>
        </article>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold text-base lg:text-lg py-4 overflow-hidden relative shadow-lg">
          <div className="animate-marquee whitespace-nowrap flex">
            <span className="mx-8 flex items-center">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING! 🎉
            </span>
            <span className="mx-8 flex items-center">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING! 🎉
            </span>
            <span className="mx-8 flex items-center">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING! 🎉
            </span>
            <span className="mx-8 flex items-center">
              🎉 FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING! 🎉
            </span>
          </div>
        </div>

        {/* Category Section with Enhanced SEO */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-800">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <p className="text-yellow-600 dark:text-yellow-400 text-sm uppercase tracking-wider font-bold mb-2">
                  Explore Our Collection
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Shop Caps by Category
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Browse our extensive range of baseball caps, snapback caps, trucker caps, fitted caps, and exclusive designer collections
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                {categories.map((category, index) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group flex flex-col items-center p-4 lg:p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400"
                    aria-label={`Shop ${category.name} - ${category.description}`}
                  >
                    <div className="relative mb-3 overflow-hidden rounded-full ring-4 ring-gray-200 dark:ring-gray-600 group-hover:ring-yellow-400 transition-all duration-300">
                      <img
                        src={category.img}
                        alt={category.alt}
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading={index < 3 ? "eager" : "lazy"}
                        width="112"
                        height="112"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-center text-sm lg:text-base group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center hidden sm:block">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <p className="text-yellow-400 text-sm uppercase tracking-wider font-bold mb-2">
                  Our Promise
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Why Buy Caps from Mr. Xy Caps?
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  India's premier destination for premium quality caps online. We're committed to delivering 
                  exceptional products and service that exceeds expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/10 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    Premium Quality Caps
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Crafted with the finest materials and attention to detail for lasting durability and comfort. 
                    Each cap undergoes strict quality control to ensure you get only the best.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/10 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    Free Shipping India
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Complimentary shipping on all orders above ₹999. Fast and secure delivery to your doorstep 
                    anywhere in India. Track your order in real-time.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/10 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    30-Day Easy Returns
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    30-day hassle-free returns policy. Not satisfied? We'll make it right with our customer-first 
                    approach. Your satisfaction is our priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="bg-gray-50 dark:bg-gray-900">
          <ProductCards/>
        </section>

        {/* Product Features & Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-yellow-600 dark:text-yellow-400 text-sm uppercase tracking-wider font-bold mb-2">
                  Premium Craftsmanship
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Designed for Excellence & Style
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Perfect Fit Every Time</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Engineered for comfort with precision sizing that feels just right. Our adjustable designs 
                        ensure the perfect fit for all head sizes, making our caps suitable for everyone.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Premium Materials</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Made from the finest cotton and denim fabrics for durability and long-lasting wear. 
                        Breathable, comfortable, and built to withstand daily use while maintaining their shape.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">Versatile Style</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Perfect for any occasion, from casual outings to smart casual events. Our caps complement 
                        both streetwear and contemporary fashion, making them a versatile addition to your wardrobe.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center shadow-xl border-4 border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Premium Cap Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-Rich FAQ Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions About Our Caps
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Everything you need to know about buying caps online from Mr. Xy Caps
              </p>
            </div>
            
            <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
              <details className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 group" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between" itemProp="name">
                  <span>What types of caps does Mr. Xy Caps offer?</span>
                  <svg className="w-5 h-5 text-yellow-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Mr. Xy Caps offers a wide variety of premium caps including baseball caps, snapback caps, trucker caps, 
                    fitted caps, and exclusive designer collections. We also have special collections for kids (Alpha Gen Kids). 
                    Each category features unique styles, colors, and designs to suit every preference and occasion.
                  </p>
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 group" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between" itemProp="name">
                  <span>Do you offer free shipping on cap orders?</span>
                  <svg className="w-5 h-5 text-yellow-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Yes! We offer free shipping across India on all orders above ₹999. For orders below ₹999, standard 
                    shipping charges apply. We also provide prepaid order discounts - get flat 10% off on prepaid orders. 
                    All orders are shipped securely with tracking information provided.
                  </p>
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 group" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between" itemProp="name">
                  <span>What is your return policy for caps?</span>
                  <svg className="w-5 h-5 text-yellow-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    We offer a hassle-free 30-day return policy. If you're not completely satisfied with your cap purchase, 
                    you can return it within 30 days of delivery for a full refund or exchange. The product should be in 
                    unused condition with original tags. Visit our returns page or contact customer support to initiate a return.
                  </p>
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 group" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between" itemProp="name">
                  <span>How do I choose the right cap size?</span>
                  <svg className="w-5 h-5 text-yellow-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Most of our caps come with adjustable straps (snapback, baseball caps) that fit most head sizes comfortably. 
                    For fitted caps, we provide a detailed size guide on each product page. Measure your head circumference 
                    and refer to our size chart. Our standard fit caps are designed to fit head sizes from 54cm to 62cm comfortably.
                  </p>
                </div>
              </details>

              <details className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 group" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <summary className="font-bold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between" itemProp="name">
                  <span>Are Mr. Xy Caps products authentic and high quality?</span>
                  <svg className="w-5 h-5 text-yellow-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Absolutely! All Mr. Xy Caps products are 100% authentic and made from premium materials. We use high-quality 
                    cotton, denim, and specialized fabrics that ensure durability and comfort. Each cap undergoes strict quality 
                    control checks before shipping. We stand behind our products with a quality guarantee and responsive customer service.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}