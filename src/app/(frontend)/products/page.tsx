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

// Server-side fetch with filters
async function getProducts(filters: ProductsPageProps["searchParams"]) {
  await dbConnect();

  const query: any = {};
  if (filters.category) query.category = filters.category;
  if (filters.color) query.color = filters.color;

  // Stock filter
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

  let sortOption: any = { createdAt: -1 }; // Default: Newest first
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
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-light tracking-[0.02em] text-black">Products</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Bar */}
        <div className="lg:hidden border-b border-gray-100 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 font-light">
                {products.length} {products.length === 1 ? 'product' : 'products'}
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
          {/* Desktop Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:w-64 xl:w-80 flex-shrink-0">
            <div className="sticky top-8">
              {/* Results Count & Sort */}
              <div className="flex flex-col gap-6 mb-12">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-light">
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <SortDropdown currentSort={searchParams.sort} />
                </div>
              </div>

              {/* Category Navigation */}
              <div className="mb-12">
                <h3 className="text-xs font-medium tracking-[0.1em] text-black uppercase mb-4">Category</h3>
                <nav className="space-y-1">
                  <Link
                    href="/products"
                    className={`block py-2 text-sm transition-colors duration-200 ${
                      !searchParams.category 
                        ? 'text-black font-medium' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    All Products
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className={`block py-2 text-sm transition-colors duration-200 ${
                        searchParams.category === cat
                          ? 'text-black font-medium'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Filters Panel */}
              <FiltersPanel searchParams={searchParams} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-20 lg:py-32">
                <div className="w-20 h-20 mx-auto mb-6 border border-gray-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-light text-black mb-2">No products found</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or browse all products</p>
                <Link 
                  href="/products" 
                  className="inline-block mt-6 px-6 py-2 border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors duration-200"
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
                      {/* Product Card Container */}
                      <div className="bg-white border border-gray-100 group-hover:border-gray-200 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        {/* Product Image Container */}
                        <div className="aspect-square overflow-hidden bg-gray-50 relative">
                          <img
                            src={product.images[0] || "/categories/baseball.jpg"}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Sale Badge */}
                          {hasDiscount && (
                            <div className="absolute top-3 left-3 z-10">
                              <div className="bg-black text-white px-2 py-1 text-xs font-medium tracking-[0.05em] uppercase">
                                -{discountPercentage}%
                              </div>
                            </div>
                          )}
                          
                          {/* Quick View Hint */}
                          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <div className="bg-white px-4 py-2 text-xs font-medium text-black tracking-[0.1em] uppercase shadow-lg">
                                View Details
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 space-y-3">
                          <div className="space-y-2">
                            <h3 className="text-sm font-light text-black group-hover:text-gray-700 transition-colors duration-200 leading-5 line-clamp-2">
                              {product.name}
                            </h3>
                            
                            {/* Category & Color */}
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-light">
                              <span>{product.category}</span>
                              {product.color && (
                                <>
                                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                  <span>{product.color}</span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {/* Price Section */}
                          <div className="pt-1 border-t border-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-baseline gap-2">
                                <span className="text-base font-medium text-black">
                                  ₹{product.discountedPrice || product.price}
                                </span>
                                {hasDiscount && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{product.price}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Savings indicator for discounted items */}
                            {hasDiscount && (
                              <div className="mt-2">
                                <span className="text-xs text-green-600 font-medium">
                                  Save ₹{product.price - product.discountedPrice}
                                </span>
                              </div>
                            )}
                          </div>
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
    </div>
  );
}