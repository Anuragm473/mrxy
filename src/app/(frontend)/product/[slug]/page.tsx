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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">404</h1>
          <p className="text-lg sm:text-xl text-gray-600">Product not found</p>
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
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
            <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
            <li className="px-1">→</li>
            <li><a href="/products" className="hover:text-black transition-colors">Products</a></li>
            <li className="px-1">→</li>
            <li className="text-black font-medium truncate max-w-32 sm:max-w-none">{product.name}</li>
          </ol>
        </div>
      </nav>

      <main className="w-full">
        {/* Product Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-20">
              {/* Product Image */}
              <div className="relative order-1 lg:order-1">
                {discount > 0 && (
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-black text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded">
                    {discount}% OFF
                  </div>
                )}
                <div className="relative overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="order-2 lg:order-2 space-y-4 sm:space-y-6">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm uppercase tracking-wide font-medium mb-2">
                    {product.category}
                  </p>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-2xl sm:text-3xl font-bold text-black">₹{price}</span>
                  {originalPrice && (
                    <span className="text-lg sm:text-xl text-gray-500 line-through">₹{originalPrice}</span>
                  )}
                </div>

                {/* Product Details */}
                {product.details && (
                  <div className="border-t border-b border-gray-200 py-4 sm:py-6">
                    <h3 className="font-semibold text-black mb-3 text-sm sm:text-base">Product Details</h3>
                    <div className="space-y-2 text-xs sm:text-sm lg:text-base text-gray-700">
                      {product.details.split('\n').map((detail: string, index: number) => {
                        const [key, value] = detail.split(': ');
                        return (
                          <div key={index} className="flex flex-col sm:flex-row">
                            <span className="font-medium sm:w-20 lg:w-24">{key}:</span>
                            <span className="sm:ml-2">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <div className="pt-2 sm:pt-4">
                  <AddToCartButton
                    productId={product._id.toString()}
                    name={product.name}
                    price={product.price}
                    discountedPrice={product.discountedPrice}
                    image={product.images?.[0]}
                  />
                </div>

                {/* Care Instructions */}
                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="pt-4 sm:pt-6">
                    <h3 className="font-semibold text-black mb-3 text-sm sm:text-base">Care Instructions</h3>
                    <ul className="space-y-2 text-xs sm:text-sm lg:text-base text-gray-700">
                      {product.careInstructions.map((instruction: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                          <span className="flex-1">{instruction}</span>
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
        <div className="bg-black text-white font-bold text-sm sm:text-base lg:text-lg py-2 sm:py-3 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex">
            <span className="mx-4 sm:mx-6 lg:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
            <span className="mx-4 sm:mx-6 lg:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
            <span className="mx-4 sm:mx-6 lg:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
            <span className="mx-4 sm:mx-6 lg:mx-8">
              FLAT 10% OFF ON PREPAID ORDERS + FREE SHIPPING!
            </span>
          </div>
        </div>

        {/* Shop by Category Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Shop by Category
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                  Find the perfect cap for every occasion and style preference
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
                {categories.map((category, index) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group flex flex-col items-center p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-lg"
                    aria-label={`Shop ${category.name} - ${category.description}`}
                  >
                    <div className="relative mb-2 sm:mb-3 lg:mb-4 overflow-hidden rounded-full">
                      <img
                        src={category.img}
                        alt={category.alt}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading={index < 3 ? "eager" : "lazy"}
                        width="128"
                        height="128"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-center text-xs sm:text-sm lg:text-base">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 text-center hidden sm:block px-1">
                      {category.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative bg-black text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
          {/* Animated Waves */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
              className="relative block w-[200%] h-12 sm:h-16 lg:h-24 animate-[wave_6s_linear_infinite]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C300,60 900,0 1200,60 L1200,120 L0,120 Z"
                fill="#111"
              />
            </svg>
          </div>

          <div className="relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Why Choose Us</h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
                  We're committed to delivering exceptional quality and service that exceeds expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Box 1 */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Premium Quality</h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Crafted with the finest materials and attention to detail for lasting durability and comfort.
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-white/20 hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Free Shipping</h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Complimentary shipping on all orders above ₹999. Fast and secure delivery to your doorstep.
                  </p>
                </div>

                {/* Box 3 */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border border-white/20 hover:scale-105 transition-transform duration-300 md:col-span-1">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Easy Returns</h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    30-day hassle-free returns. Not satisfied? We'll make it right with our customer-first policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Cards Component */}
        <ProductCards/>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 border-t border-gray-200 py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 sm:mb-6">
                  Designed for Excellence
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-black mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">Perfect Fit</h3>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                        Engineered for comfort with precision sizing that feels just right.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-black mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">Premium Materials</h3>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                        Made from the finest cotton for durability and long-lasting wear.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-black mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">Versatile Style</h3>
                      <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                        Perfect for any occasion, from casual outings to smart casual events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm sm:text-base lg:text-lg">Product lifestyle image</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}