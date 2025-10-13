import Link from "next/link";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import SortDropdown from "@/components/SortDropdown";
import FiltersPanel from "@/components/FiltersPanelProps";
import MobileFilters from "@/components/MobileFilters";

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

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getProducts(searchParams);
  const categories = ["Basic", "Baseball", "Snapback", "Trucker", "Fitted Cap", "Exclusive Collection","Alpha Gen Kids"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b-4 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <p className="text-yellow-500 text-sm uppercase tracking-wider font-bold mb-3 flex items-center justify-center">
              <span className="w-12 h-0.5 bg-yellow-400 mr-3"></span>
              Premium Collection
              <span className="w-12 h-0.5 bg-yellow-400 ml-3"></span>
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3">
              Our Products
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the perfect headwear for your style
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <aside className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100">
                    <p className="text-sm text-gray-700 font-semibold flex items-center">
                      <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                      </svg>
                      {products.length} {products.length === 1 ? 'Product' : 'Products'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
                      Sort By
                    </label>
                    <SortDropdown currentSort={searchParams.sort} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-6">
                <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                  </svg>
                  Categories
                </h3>
                <nav className="space-y-1">
                  <Link
                    href="/products"
                    className={`block py-3 px-4 text-sm rounded-lg transition-all duration-200 ${
                      !searchParams.category 
                        ? 'bg-yellow-400 text-black font-bold shadow-md' 
                        : 'text-gray-700 hover:bg-gray-100 font-medium'
                    }`}
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={`block py-3 px-4 text-sm rounded-lg transition-all duration-200 ${
                        searchParams.category === cat
                          ? 'bg-yellow-400 text-black font-bold shadow-md'
                          : 'text-gray-700 hover:bg-gray-100 font-medium'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
                <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/>
                  </svg>
                  Filters
                </h3>
                <FiltersPanel searchParams={searchParams} />
              </div>
            </div>
          </aside>

          <main className="flex-1">
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 text-center py-20 lg:py-32">
                <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Products Found</h3>
                <p className="text-base text-gray-600 mb-6">Try adjusting your filters or browse all products</p>
                <Link 
                  href="/products" 
                  className="inline-block px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  View All Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {products.map((product: any) => {
                  const hasDiscount = product.discountedPrice && product.price !== product.discountedPrice;
                  const discountPercentage = hasDiscount 
                    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
                    : 0;
                  
                  return (
                    <Link
                      key={product._id}
                      href={`/product/${product.slug}`}
                      className="group block"
                    >
                      <div className="bg-white rounded-2xl border-2 border-gray-200 group-hover:border-yellow-400 transition-all duration-300 group-hover:shadow-2xl overflow-hidden transform group-hover:-translate-y-1">
                        <div className="aspect-square overflow-hidden relative flex items-center justify-center" >
                          {product.images && product.images.length > 0 && product.images[0] ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="max-w-full max-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                              <div className="text-center p-8">
                                <svg className="w-20 h-20 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm text-gray-400 font-medium">Image Not Available</p>
                              </div>
                            </div>
                          )}
                          
                          {hasDiscount && (
                            <div className="absolute top-4 left-4 z-10">
                              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg">
                                -{discountPercentage}% OFF
                              </div>
                            </div>
                          )}
                          
                          {product.stock <= 5 && product.stock > 0 && (
                            <div className="absolute top-4 right-4 z-10">
                              <div className="bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-lg shadow-lg">
                                Only {product.stock} Left
                              </div>
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
                              <div className="bg-yellow-400 px-6 py-3 text-sm font-bold text-black tracking-wider uppercase shadow-xl rounded-lg">
                                View Details →
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <div className="space-y-2">
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 leading-snug line-clamp-2 min-h-[3rem]">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                {product.category}
                              </span>
                              {product.color && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                                  {product.color}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="pt-3 border-t-2 border-gray-100">
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
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"/>
                                </svg>
                                <span className="text-xs font-bold">
                                  Save ₹{product.price - product.discountedPrice}
                                </span>
                              </div>
                            )}

                            {(product.discountedPrice || product.price) >= 999 && (
                              <div className="mt-2 inline-flex items-center text-xs text-blue-600 font-semibold">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                                </svg>
                                Free Shipping
                              </div>
                            )}
                          </div>

                          <button className="w-full mt-3 bg-gray-900 text-white py-3 rounded-lg font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-yellow-400 hover:text-black">
                            Quick Add to Cart
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Get in touch with us and we'll help you find the perfect cap!
          </p>
          <Link 
            href="/contact"
            className="inline-block px-8 py-4 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}