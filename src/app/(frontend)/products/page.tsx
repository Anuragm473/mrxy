import Link from "next/link";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import SortDropdown from "@/components/SortDropdown";
import FiltersPanel from "@/components/FiltersPanelProps";
import MobileFilters from "@/components/MobileFilters";
import { Metadata } from "next";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    color?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  };
}

// SEO Metadata Generation
export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const category = searchParams.category;
  const baseTitle = "Premium Caps Online India";
  const siteName = "Mr. Xy Caps";
  const domain = "www.mrxycaps.in";
  
  const categoryTitles: Record<string, string> = {
    "Basic": "Basic Caps - Classic Everyday Caps Online",
    "Baseball": "Baseball Caps - Authentic Sports Caps India",
    "Snapback": "Snapback Caps - Adjustable Hip Hop Caps",
    "Trucker": "Trucker Caps - Mesh Back Caps Online",
    "Fitted Cap": "Fitted Caps - Perfect Fit Caps India",
    "Exclusive Collection": "Exclusive Designer Caps - Limited Edition",
    "Alpha Gen Kids": "Kids Caps - Children's Caps Online India"
  };

  const title = category 
    ? `${categoryTitles[category] || category} | ${siteName}`
    : `Buy ${baseTitle} - All Types of Caps | ${siteName}`;

  const description = category
    ? `Shop premium ${category.toLowerCase()} online at Mr. Xy Caps. Wide range of high-quality ${category.toLowerCase()} for men, women & kids. Free shipping on orders above ₹999. Best caps in India.`
    : "Buy premium caps online in India - Baseball caps, snapback caps, trucker caps, fitted caps & more. 100% authentic headwear with free shipping. Shop now at Mr. Xy Caps!";

  const keywords = [
    "buy caps online india",
    "premium caps",
    "baseball caps india",
    "snapback caps online",
    "trucker caps",
    "fitted caps",
    "men caps online",
    "women caps",
    "kids caps",
    "designer caps india",
    "sports caps",
    "hip hop caps",
    category?.toLowerCase(),
    "mr xy caps",
    "caps online shopping",
    "best caps in india"
  ].filter(Boolean).join(", ");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Mr. Xy Caps" }],
    creator: "Mr. Xy Caps",
    publisher: "Mr. Xy Caps",
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
      type: "website",
      locale: "en_IN",
      url: `https://${domain}/products${category ? `?category=${encodeURIComponent(category)}` : ''}`,
      siteName,
      title,
      description,
      images: [
        {
          url: `https://${domain}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteName} - Premium Caps Collection`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://${domain}/og-image.jpg`],
    },
    alternates: {
      canonical: `https://${domain}/products${category ? `?category=${encodeURIComponent(category)}` : ''}`,
    },
  };
}

async function getProducts(filters: ProductsPageProps["searchParams"]) {
  await dbConnect();

  const query: any = {};
  if (filters.category) query.category = filters.category;
  if (filters.color) query.color = filters.color;

  if (filters.inStock === 'true') {
    query.stock = { $gt: 0 };
  } else if (filters.inStock === 'false') {
    query.stock = { $lte: 0 };
  }

  if (filters.minPrice || filters.maxPrice) {
    query.discountedPrice = {};
    if (filters.minPrice) query.discountedPrice.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.discountedPrice.$lte = Number(filters.maxPrice);
  }

  let sortOption: any = { createdAt: -1 };
  if (filters.sort === "price-asc") sortOption = { discountedPrice: 1 };
  if (filters.sort === "price-desc") sortOption = { discountedPrice: -1 };
  if (filters.sort === "newest") sortOption = { createdAt: -1 };

  const products = await Product.find(query).sort(sortOption).lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt.toString(),
    updatedAt: p.updatedAt.toString(),
  }));
}

// Generate JSON-LD structured data for SEO
function generateStructuredData(products: any[], category?: string) {
  const domain = "www.mrxycaps.in";
  
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://${domain}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category || "All Products",
        "item": `https://${domain}/products${category ? `?category=${encodeURIComponent(category)}` : ''}`
      }
    ]
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "url": `https://${domain}/product/${product.slug}`,
        "image": product.images?.[0] || `https://${domain}/default-cap.jpg`,
        "description": product.description || `Premium ${product.category} - ${product.name}`,
        "brand": {
          "@type": "Brand",
          "name": "Mr. Xy Caps"
        },
        "offers": {
          "@type": "Offer",
          "price": product.discountedPrice || product.price,
          "priceCurrency": "INR",
          "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "url": `https://${domain}/product/${product.slug}`,
          "seller": {
            "@type": "Organization",
            "name": "Mr. Xy Caps"
          }
        },
        "category": product.category
      }
    }))
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mr. Xy Caps",
    "url": `https://${domain}`,
    "logo": `https://${domain}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/mrxycaps",
      "https://www.instagram.com/mrxycaps",
      "https://twitter.com/mrxycaps"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    }
  };

  return { breadcrumbList, itemList, organization };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getProducts(searchParams);
  const categories = ["Basic", "Baseball", "Snapback", "Trucker", "Fitted Cap", "Exclusive Collection","Alpha Gen Kids"];
  const structuredData = generateStructuredData(products, searchParams.category);

  const categoryDescriptions: Record<string, string> = {
    "Baseball": "Discover our authentic baseball caps collection - perfect for sports enthusiasts and casual wear. Classic curved brim design with adjustable straps.",
    "Snapback": "Premium snapback caps with adjustable snap closure. Street-style headwear perfect for hip-hop culture and urban fashion.",
    "Trucker": "Breathable trucker caps with mesh back panels. Ideal for outdoor activities, sports, and casual everyday wear.",
    "Fitted Cap": "Expertly crafted fitted caps for the perfect fit. No adjustments needed - professional quality headwear.",
    "Basic": "Essential everyday caps in classic styles. Comfortable, versatile, and perfect for any occasion.",
    "Exclusive Collection": "Limited edition designer caps. Premium materials and unique designs for the discerning cap collector.",
    "Alpha Gen Kids": "Specially designed caps for children. Safe, comfortable, and stylish headwear for kids of all ages."
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.organization) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with SEO-optimized heading structure */}
        <header className="bg-white border-b-4 border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center">
              <p className="text-yellow-500 text-sm uppercase tracking-wider font-bold mb-3 flex items-center justify-center">
                <span className="w-12 h-0.5 bg-yellow-400 mr-3" aria-hidden="true"></span>
                Premium Collection
                <span className="w-12 h-0.5 bg-yellow-400 ml-3" aria-hidden="true"></span>
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
                {searchParams.category 
                  ? `${searchParams.category} - Premium ${searchParams.category} Online`
                  : "Buy Premium Caps Online in India - All Types of Caps"}
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {searchParams.category && categoryDescriptions[searchParams.category]
                  ? categoryDescriptions[searchParams.category]
                  : "Shop authentic baseball caps, snapback caps, trucker caps, fitted caps & more. Free shipping on orders above ₹999. 100% genuine products."}
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Bar */}
          <div className="lg:hidden bg-white border-b-2 border-gray-200 shadow-sm py-4 sticky top-0 z-20">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-semibold">
                  {products.length} {products.length === 1 ? 'Product' : 'Products'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32">
                  <SortDropdown currentSort={searchParams.sort} />
                </div>
                <MobileFilters searchParams={searchParams} categories={categories} />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-8 lg:py-12">
            {/* Sidebar with semantic navigation */}
            <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0" aria-label="Product filters and categories">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
                      <p className="text-sm text-gray-700 font-semibold flex items-center">
                        <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                        </svg>
                        {products.length} {products.length === 1 ? 'Product' : 'Products'}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="sort-dropdown" className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                        Sort By
                      </label>
                      <SortDropdown currentSort={searchParams.sort} />
                    </div>
                  </div>
                </div>

                <nav className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-6" aria-label="Product categories">
                  <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    Shop by Category
                  </h2>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/products"
                        className={`block py-3 px-4 text-sm rounded-lg transition-all duration-200 ${
                          !searchParams.category 
                            ? 'bg-yellow-400 text-black font-bold shadow-md' 
                            : 'text-gray-700 hover:bg-gray-100 font-medium'
                        }`}
                        aria-current={!searchParams.category ? 'page' : undefined}
                      >
                        All Caps
                      </Link>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat}>
                        <Link
                          href={`/products?category=${encodeURIComponent(cat)}`}
                          className={`block py-3 px-4 text-sm rounded-lg transition-all duration-200 ${
                            searchParams.category === cat
                              ? 'bg-yellow-400 text-black font-bold shadow-md'
                              : 'text-gray-700 hover:bg-gray-100 font-medium'
                          }`}
                          aria-current={searchParams.category === cat ? 'page' : undefined}
                        >
                          {cat}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
                  <h2 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
                    </svg>
                    Filter Products
                  </h2>
                  <FiltersPanel searchParams={searchParams} />
                </div>
              </div>
            </aside>

            {/* Main Product Grid */}
            <main className="flex-1" role="main">
              {products.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 text-center py-20 lg:py-32">
                  <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No Caps Found</h3>
                  <p className="text-base text-gray-600 mb-6">Try adjusting your filters or browse all our premium caps</p>
                  <Link 
                    href="/products" 
                    className="inline-block px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    View All Caps
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {products.map((product: any) => {
                      const hasDiscount = product.discountedPrice && product.price !== product.discountedPrice;
                      const discountPercentage = hasDiscount 
                        ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
                        : 0;
                      
                      return (
                        <article
                          key={product._id}
                          itemScope
                          itemType="https://schema.org/Product"
                          className="group"
                        >
                          <Link
                            href={`/product/${product.slug}`}
                            className="block"
                            aria-label={`View details of ${product.name}`}
                          >
                            <div className="bg-white rounded-2xl border-2 border-gray-200 group-hover:border-yellow-400 transition-all duration-300 group-hover:shadow-2xl overflow-hidden transform group-hover:-translate-y-1">
                              <div className="aspect-square overflow-hidden relative flex items-center justify-center">
                                {product.images && product.images.length > 0 && product.images[0] ? (
                                  <div className="relative w-full h-full flex items-center justify-center">
                                    <img
                                      src={product.images[0]}
                                      alt={`${product.name} - ${product.category} - Mr. Xy Caps`}
                                      className="max-w-full max-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      loading="lazy"
                                      width="400"
                                      height="400"
                                      itemProp="image"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                                    <div className="text-center p-8">
                                      <svg className="w-20 h-20 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      <p className="text-sm text-gray-400 font-medium">Image Not Available</p>
                                    </div>
                                  </div>
                                )}
                                
                                {hasDiscount && (
                                  <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg">
                                      -{discountPercentage}% OFF
                                    </span>
                                  </div>
                                )}
                                
                                {product.stock <= 5 && product.stock > 0 && (
                                  <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-lg shadow-lg">
                                      Only {product.stock} Left
                                    </span>
                                  </div>
                                )}

                                {product.stock === 0 && (
                                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
                                    <div className="bg-white px-6 py-3 rounded-lg">
                                      <p className="text-black font-bold text-lg">Out of Stock</p>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    <span className="bg-yellow-400 px-6 py-3 text-sm font-bold text-black tracking-wider uppercase shadow-xl rounded-lg">
                                      View Details →
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="p-5 space-y-3">
                                <div className="space-y-2">
                                  <h3 className="text-base font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 leading-snug line-clamp-2 min-h-[3rem]" itemProp="name">
                                    {product.name}
                                  </h3>
                                  
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700" itemProp="category">
                                      {product.category}
                                    </span>
                                    {product.color && (
                                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                        {product.color}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="pt-3 border-t-2 border-gray-100" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                  <meta itemProp="priceCurrency" content="INR" />
                                  <meta itemProp="price" content={String(product.discountedPrice || product.price)} />
                                  <meta itemProp="availability" content={product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                                  <link itemProp="url" href={`https://www.mrxycaps.in/product/${product.slug}`} />
                                  
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-baseline gap-2">
                                      <span className="text-2xl font-bold text-gray-900">
                                        ₹{product.discountedPrice || product.price}
                                      </span>
                                      {hasDiscount && (
                                        <span className="text-base text-gray-400 line-through font-medium">
                                          ₹{product.price}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {hasDiscount && (
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                                      </svg>
                                      <span className="text-xs font-bold">
                                        Save ₹{product.price - product.discountedPrice}
                                      </span>
                                    </div>
                                  )}

                                  {(product.discountedPrice || product.price) >= 999 && (
                                    <div className="mt-2 inline-flex items-center text-xs text-blue-600 font-semibold">
                                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                                      </svg>
                                      Free Shipping
                                    </div>
                                  )}
                                </div>

                                <button 
                                  type="button"
                                  className="w-full mt-3 bg-gray-900 text-white py-3 rounded-lg font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-yellow-400 hover:text-black"
                                  aria-label={`Add ${product.name} to cart`}
                                >
                                  Quick Add to Cart
                                </button>
                              </div>
                            </div>
                          </Link>
                        </article>
                      );
                    })}
                  </div>

                  {/* SEO Content Section */}
                  <section className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
                    <article className="prose prose-lg max-w-none">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {searchParams.category 
                          ? `Buy Premium ${searchParams.category} Online in India | Mr. Xy Caps`
                          : "Premium Caps Online - Your Destination for Authentic Headwear"}
                      </h2>
                      
                      {searchParams.category ? (
                        <>
                          {searchParams.category === "Baseball" && (
                            <>
                              <p className="text-gray-700 mb-4">
                                Welcome to Mr. Xy Caps, India's premier destination for <strong>authentic baseball caps</strong>. Our collection features high-quality baseball caps perfect for sports enthusiasts, casual wear, and outdoor activities. Each baseball cap is crafted with premium materials ensuring durability and comfort.
                              </p>
                              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Why Choose Our Baseball Caps?</h3>
                              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li><strong>Authentic Design:</strong> Classic curved brim baseball cap design</li>
                                <li><strong>Adjustable Fit:</strong> Comfortable strap closure for perfect fit</li>
                                <li><strong>Premium Materials:</strong> High-quality fabric that lasts</li>
                                <li><strong>Versatile Style:</strong> Perfect for sports, casual outings, and daily wear</li>
                                <li><strong>Free Shipping:</strong> On orders above ₹999 across India</li>
                              </ul>
                            </>
                          )}
                          
                          {searchParams.category === "Snapback" && (
                            <>
                              <p className="text-gray-700 mb-4">
                                Discover the best <strong>snapback caps online in India</strong> at Mr. Xy Caps. Our snapback collection features adjustable snap closures, flat brims, and street-style designs perfect for hip-hop culture and urban fashion. Shop premium quality snapback caps with fast shipping across India.
                              </p>
                              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Features of Our Snapback Caps</h3>
                              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li><strong>Adjustable Snap Closure:</strong> Perfect fit for all head sizes</li>
                                <li><strong>Flat Brim Design:</strong> Authentic street-style look</li>
                                <li><strong>Premium Construction:</strong> Durable materials and stitching</li>
                                <li><strong>Urban Fashion:</strong> Latest designs and colors</li>
                                <li><strong>Unisex Styles:</strong> Perfect for men and women</li>
                              </ul>
                            </>
                          )}
                          
                          {searchParams.category === "Trucker" && (
                            <>
                              <p className="text-gray-700 mb-4">
                                Shop <strong>trucker caps online</strong> at Mr. Xy Caps - India's trusted source for breathable mesh-back trucker caps. Our trucker cap collection features foam front panels and mesh backs, perfect for outdoor activities, sports, and hot weather. Get authentic trucker caps with free shipping.
                              </p>
                              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Why Trucker Caps Are Perfect For You</h3>
                              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li><strong>Breathable Mesh Back:</strong> Stay cool in any weather</li>
                                <li><strong>Foam Front Panel:</strong> Structured look with comfort</li>
                                <li><strong>Snapback Closure:</strong> Adjustable for perfect fit</li>
                                <li><strong>Outdoor Ready:</strong> Ideal for sports and activities</li>
                                <li><strong>Classic Style:</strong> Timeless trucker cap design</li>
                              </ul>
                            </>
                          )}
                          
                          {searchParams.category === "Fitted Cap" && (
                            <>
                              <p className="text-gray-700 mb-4">
                                Experience the perfect fit with <strong>premium fitted caps</strong> from Mr. Xy Caps. Our fitted cap collection offers professional-quality headwear with precise sizing - no adjustments needed. Shop authentic fitted caps online in India with various sizes available.
                              </p>
                              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Benefits of Fitted Caps</h3>
                              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li><strong>Perfect Fit:</strong> Precise sizing for optimal comfort</li>
                                <li><strong>No Adjustments:</strong> Clean look without straps</li>
                                <li><strong>Professional Quality:</strong> Premium construction</li>
                                <li><strong>Multiple Sizes:</strong> Find your exact fit</li>
                                <li><strong>Authentic Style:</strong> Classic fitted cap design</li>
                              </ul>
                            </>
                          )}
                          
                          {!["Baseball", "Snapback", "Trucker", "Fitted Cap"].includes(searchParams.category) && (
                            <p className="text-gray-700 mb-4">
                              Explore our exclusive collection of <strong>{searchParams.category.toLowerCase()}</strong> at Mr. Xy Caps. Each cap is carefully selected for quality, style, and comfort. Shop with confidence knowing you're getting 100% authentic products with free shipping on orders above ₹999.
                            </p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-gray-700 mb-4">
                            Welcome to <strong>Mr. Xy Caps</strong> - India's premier online destination for <strong>premium caps and headwear</strong>. We offer an extensive collection of authentic caps including baseball caps, snapback caps, trucker caps, fitted caps, and exclusive designer collections. Shop with confidence knowing you're getting 100% genuine products with fast shipping across India.
                          </p>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Types of Caps Available at Mr. Xy Caps</h3>
                          <div className="grid md:grid-cols-2 gap-6 my-6">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">Baseball Caps</h4>
                              <p className="text-gray-700">Classic curved brim caps perfect for sports and casual wear. Adjustable straps for comfortable fit.</p>
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">Snapback Caps</h4>
                              <p className="text-gray-700">Flat brim caps with adjustable snap closure. Perfect for hip-hop style and urban fashion.</p>
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">Trucker Caps</h4>
                              <p className="text-gray-700">Breathable mesh-back caps ideal for outdoor activities and hot weather. Classic foam front design.</p>
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">Fitted Caps</h4>
                              <p className="text-gray-700">Professional quality caps with precise sizing. No adjustments needed for the perfect fit.</p>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Shop at Mr. Xy Caps?</h3>
                          <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li><strong>100% Authentic Products:</strong> Only genuine, high-quality caps</li>
                            <li><strong>Wide Selection:</strong> All types of caps for men, women, and kids</li>
                            <li><strong>Free Shipping:</strong> On orders above ₹999 across India</li>
                            <li><strong>Competitive Pricing:</strong> Best value for premium quality</li>
                            <li><strong>Fast Delivery:</strong> Quick dispatch and reliable shipping</li>
                            <li><strong>Easy Returns:</strong> Hassle-free return policy</li>
                            <li><strong>Secure Payment:</strong> Safe and secure checkout process</li>
                          </ul>

                          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Shop Caps by Style</h3>
                          <p className="text-gray-700 mb-4">
                            Whether you're looking for <strong>sports caps</strong>, <strong>fashion caps</strong>, <strong>designer caps</strong>, or <strong>everyday casual caps</strong>, Mr. Xy Caps has something for everyone. Our collection includes caps for:
                          </p>
                          <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            <li>Sports enthusiasts and athletes</li>
                            <li>Fashion-forward individuals</li>
                            <li>Outdoor adventure lovers</li>
                            <li>Hip-hop and street culture fans</li>
                            <li>Professionals seeking quality headwear</li>
                            <li>Kids and young adults</li>
                          </ul>

                          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Premium Quality Guarantee</h3>
                          <p className="text-gray-700 mb-4">
                            At Mr. Xy Caps, quality is our top priority. Every cap in our collection is carefully inspected to ensure it meets our high standards. We use premium materials, superior stitching, and authentic designs to deliver caps that not only look great but also last long.
                          </p>

                          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Buy Caps Online in India</h3>
                          <p className="text-gray-700 mb-4">
                            Shopping for caps online has never been easier. Browse our extensive collection, filter by category, color, and price, and find the perfect cap for your style. With secure payment options, fast shipping across India, and excellent customer service, Mr. Xy Caps is your go-to destination for <strong>buying caps online in India</strong>.
                          </p>
                        </>
                      )}

                      <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Free Shipping Across India</h3>
                        <p className="text-gray-700">
                          Enjoy <strong>free shipping on all orders above ₹999</strong>. We deliver to all major cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, and across India. Fast dispatch and reliable courier partners ensure your caps reach you quickly and safely.
                        </p>
                      </div>
                    </article>
                  </section>
                </>
              )}
            </main>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Get in touch with us and we'll help you find the perfect cap! Our team is ready to assist you.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
            >
              Contact Us
            </Link>
          </div>
        </section>

        {/* Additional SEO Footer Content */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Popular Categories</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><Link href="/products?category=Baseball" className="hover:text-yellow-600">Baseball Caps</Link></li>
                  <li><Link href="/products?category=Snapback" className="hover:text-yellow-600">Snapback Caps</Link></li>
                  <li><Link href="/products?category=Trucker" className="hover:text-yellow-600">Trucker Caps</Link></li>
                  <li><Link href="/products?category=Fitted%20Cap" className="hover:text-yellow-600">Fitted Caps</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Links</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><Link href="/about" className="hover:text-yellow-600">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-yellow-600">Contact</Link></li>
                  <li><Link href="/shipping" className="hover:text-yellow-600">Shipping Info</Link></li>
                  <li><Link href="/returns" className="hover:text-yellow-600">Returns Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Customer Service</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><Link href="/faq" className="hover:text-yellow-600">FAQs</Link></li>
                  <li><Link href="/size-guide" className="hover:text-yellow-600">Size Guide</Link></li>
                  <li><Link href="/care-instructions" className="hover:text-yellow-600">Care Instructions</Link></li>
                  <li><Link href="/track-order" className="hover:text-yellow-600">Track Order</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}