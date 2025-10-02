import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import AddToCartButton from "@/components/AddToCartButton";
import { Metadata } from "next";
import ProductCards from "@/components/ProductCards";
import Link from "next/link";

interface ProductPageProps {
  params: { slug: string };
}

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
  { 
    name: "Alpha Gen Kids", 
    img: "/categories/exclusive.jpg",
    alt: "Trendy caps for Alpha Gen kids",
    description: "Cool and stylish caps designed for the young Alpha Gen kids"
  }
];

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  await dbConnect();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const price = product.discountedPrice ?? product.price;
  const originalPrice = product.discountedPrice ? product.price : null;

  return {
    title: `${product.name} - Premium ${product.category} | Your Store`,
    description: `${product.description} Available for ₹${price}${originalPrice ? ` (was ₹${originalPrice})` : ''}. Free shipping on orders above ₹999.`,
    keywords: `${product.name}, ${product.category}, ${product.color}, premium caps, fitted caps, streetwear`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images || [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images || [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  await dbConnect();
  const product = await Product.findOne({ slug: params.slug }).lean();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Product not found</p>
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

  // Structure data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "sku": product._id.toString(),
    "brand": {
      "@type": "Brand",
      "name": "Your Store"
    },
    "category": product.category,
    "color": product.color,
    "offers": {
      "@type": "Offer",
      "url": `https://yourstore.com/products/${product.slug}`,
      "priceCurrency": "INR",
      "price": price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Your Store"
      }
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Breadcrumb */}
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
            <li>
              <Link href="/" className="hover:text-yellow-500 transition-colors font-medium">
                Home
              </Link>
            </li>
            <li className="text-gray-400">→</li>
            <li>
              <Link href="/products" className="hover:text-yellow-500 transition-colors font-medium">
                Products
              </Link>
            </li>
            <li className="text-gray-400">→</li>
            <li className="text-gray-900 font-semibold truncate max-w-32 sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </div>
      </nav>

      <main className="w-full bg-gray-50">
        {/* Product Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Product Image */}
              <div className="relative">
                {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-black px-4 py-2 text-sm font-bold rounded-lg shadow-lg">
                    {discount}% OFF
                  </div>
                )}
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-xl border-4 border-gray-200">
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-yellow-600 text-sm uppercase tracking-wider font-bold mb-2 flex items-center">
                    <span className="w-8 h-0.5 bg-yellow-400 mr-2"></span>
                    {product.category}
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex items-baseline space-x-3 mb-2">
                    <span className="text-4xl font-bold text-gray-900">₹{price}</span>
                    {originalPrice && (
                      <>
                        <span className="text-2xl text-gray-400 line-through">₹{originalPrice}</span>
                        <span className="text-lg font-semibold text-green-600">Save ₹{originalPrice - price}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                </div>

                {/* Product Details */}
                {product.details && (
                  <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                      <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      Product Details
                    </h3>
                    <div className="space-y-3 text-sm">
                      {product.details.split('\n').map((detail: string, index: number) => {
                        const [key, value] = detail.split(': ');
                        return (
                          <div key={index} className="flex border-b border-gray-100 pb-2 last:border-0">
                            <span className="font-semibold text-gray-700 w-32 flex-shrink-0">{key}:</span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <div className="pt-4">
                  <AddToCartButton
                    productId={product._id.toString()}
                    name={product.name}
                    price={product.price}
                    discountedPrice={product.discountedPrice}
                    image={product.images?.[0]}
                  />
                  <p className="text-center text-sm text-gray-500 mt-3">
                    🚚 Free shipping on orders above ₹999
                  </p>
                </div>

                {/* Care Instructions */}
                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                    <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center">
                      <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      Care Instructions
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {product.careInstructions.map((instruction: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Banner */}
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

        {/* Shop by Category Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <p className="text-yellow-600 text-sm uppercase tracking-wider font-bold mb-2">
                  Browse Categories
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Shop by Category
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Find the perfect cap for every occasion and style preference
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
                {categories.map((category, index) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group flex flex-col items-center p-4 lg:p-6 rounded-2xl bg-gray-50 hover:bg-yellow-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400"
                    aria-label={`Shop ${category.name} - ${category.description}`}
                  >
                    <div className="relative mb-3 overflow-hidden rounded-full ring-4 ring-gray-200 group-hover:ring-yellow-400 transition-all duration-300">
                      <img
                        src={category.img}
                        alt={category.alt}
                        className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading={index < 3 ? "eager" : "lazy"}
                        width="112"
                        height="112"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 text-center text-sm lg:text-base group-hover:text-yellow-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 text-center hidden sm:block">
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
          {/* Animated background pattern */}
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
                  Why Choose Us
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  We're committed to delivering exceptional quality and service that exceeds expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Box 1 */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/10 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    Premium Quality
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Crafted with the finest materials and attention to detail for lasting durability and comfort.
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/10 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    Free Shipping
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Complimentary shipping on all orders above ₹999. Fast and secure delivery to your doorstep.
                  </p>
                </div>

                {/* Box 3 */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white/10 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                    Easy Returns
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    30-day hassle-free returns. Not satisfied? We'll make it right with our customer-first policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Cards Component */}
        <section className="bg-gray-50">
          <ProductCards/>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 bg-white py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-yellow-600 text-sm uppercase tracking-wider font-bold mb-2">
                  Premium Craftsmanship
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Designed for Excellence
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-yellow-50 transition-colors duration-300">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Perfect Fit</h3>
                      <p className="text-gray-600">
                        Engineered for comfort with precision sizing that feels just right.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-yellow-50 transition-colors duration-300">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Premium Materials</h3>
                      <p className="text-gray-600">
                        Made from the finest cotton for durability and long-lasting wear.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-yellow-50 transition-colors duration-300">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Versatile Style</h3>
                      <p className="text-gray-600">
                        Perfect for any occasion, from casual outings to smart casual events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-xl border-4 border-gray-200 overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">Product lifestyle image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}