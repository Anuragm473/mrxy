import Link from "next/link";
import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import SortDropdown from "@/components/SortDropdown";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    color?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

// Server-side fetch with filters
async function getProducts(filters: ProductsPageProps["searchParams"]) {
  await dbConnect();

  const query: any = {};
  if (filters.category) query.category = filters.category;
  if (filters.color) query.color = filters.color;

  if (filters.minPrice || filters.maxPrice) {
    query.discountedPrice = {};
    if (filters.minPrice) query.discountedPrice.$gte = Number(filters.minPrice);
    if (filters.maxPrice) query.discountedPrice.$lte = Number(filters.maxPrice);
  }

  let sortOption: any = { createdAt: -1 }; // Default: Newest first
  if (filters.sort === "price-asc") sortOption = { discountedPrice: 1 };
  if (filters.sort === "price-desc") sortOption = { discountedPrice: -1 };

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
  const categories = ["Basic", "Baseball", "Snapback", "Trucker", "Fitted Cap", "Exclusive Collection"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-light tracking-wide text-black">Products</h1>
        </div>
      </div>

      {/* Filters & Navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filters */}
            <nav className="flex flex-wrap gap-1">
              <Link
                href="/products"
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  !searchParams.category 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300'
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    searchParams.category === cat
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-600 hover:text-black border-b-2 border-transparent hover:border-gray-300'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </nav>

            {/* Sort Dropdown - Now as Client Component */}
            <SortDropdown currentSort={searchParams.sort} />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 font-light">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 border border-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-black mb-2">No products found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters or browse all products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug}`}
                className="group block"
              >
                {/* Product Image */}
                <div className="aspect-square mb-4 overflow-hidden bg-gray-50">
                  <img
                    src={product.images[0] || "/default-cap.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-black">
                      ₹{product.discountedPrice || product.price}
                    </span>
                    {product.discountedPrice && product.price !== product.discountedPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                  {/* Category & Color */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{product.category}</span>
                    {product.color && (
                      <>
                        <span>•</span>
                        <span>{product.color}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}