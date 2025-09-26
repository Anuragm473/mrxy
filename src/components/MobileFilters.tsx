'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MobileFiltersProps {
  searchParams: {
    category?: string;
    color?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  };
  categories: string[];
}

export default function MobileFilters({ searchParams, categories }: MobileFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || '');
  const [priceTimeout, setPriceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Count active filters
  const activeFiltersCount = [
    searchParams.category,
    searchParams.inStock,
    searchParams.minPrice,
    searchParams.maxPrice,
    searchParams.color
  ].filter(Boolean).length;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const updateUrlParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(urlSearchParams.toString());
    
    if (value && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStockFilter = (stockStatus: string) => {
    const currentInStock = searchParams.inStock;
    
    if (currentInStock === stockStatus) {
      updateUrlParams('inStock', null);
    } else {
      updateUrlParams('inStock', stockStatus);
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    if (type === 'min') {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }

    if (priceTimeout) {
      clearTimeout(priceTimeout);
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(urlSearchParams.toString());
      
      if (type === 'min') {
        if (value && value !== '') {
          params.set('minPrice', value);
        } else {
          params.delete('minPrice');
        }
      } else {
        if (value && value !== '') {
          params.set('maxPrice', value);
        } else {
          params.delete('maxPrice');
        }
      }
      
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    setPriceTimeout(timeout);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(urlSearchParams.toString());
    params.delete('inStock');
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('category');
    params.delete('color');
    
    setMinPrice('');
    setMaxPrice('');
    
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  const hasActiveFilters = searchParams.inStock || searchParams.minPrice || searchParams.maxPrice || searchParams.category || searchParams.color;

  useEffect(() => {
    setMinPrice(searchParams.minPrice || '');
    setMaxPrice(searchParams.maxPrice || '');
  }, [searchParams.minPrice, searchParams.maxPrice]);

  return (
    <>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium text-black hover:border-black transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
        </svg>
        <span>Filter</span>
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Mobile Filter Modal/Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Filter Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-black">Filters</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-4 space-y-6">
              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="pb-4 border-b border-gray-100">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-black uppercase mb-3 tracking-[0.1em]">
                  Category
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
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
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 text-sm transition-colors duration-200 ${
                        searchParams.category === cat
                          ? 'text-black font-medium'
                          : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Stock Status Filter */}
              <div>
                <h3 className="text-sm font-medium text-black uppercase mb-3 tracking-[0.1em]">
                  Availability
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center group cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={searchParams.inStock === 'true'}
                        onChange={() => handleStockFilter('true')}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border border-gray-300 transition-all duration-200 ${
                        searchParams.inStock === 'true' 
                          ? 'bg-black border-black' 
                          : 'bg-white group-hover:border-gray-400'
                      }`}>
                        {searchParams.inStock === 'true' && (
                          <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-light text-black">
                      In Stock
                    </span>
                  </label>

                  <label className="flex items-center group cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={searchParams.inStock === 'false'}
                        onChange={() => handleStockFilter('false')}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border border-gray-300 transition-all duration-200 ${
                        searchParams.inStock === 'false' 
                          ? 'bg-black border-black' 
                          : 'bg-white group-hover:border-gray-400'
                      }`}>
                        {searchParams.inStock === 'false' && (
                          <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-light text-black">
                      Out of Stock
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-sm font-medium text-black uppercase mb-3 tracking-[0.1em]">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Min</label>
                      <input
                        type="number"
                        placeholder="₹0"
                        value={minPrice}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 text-sm font-light focus:outline-none focus:border-black transition-colors duration-200"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Max</label>
                      <input
                        type="number"
                        placeholder="₹999999"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 text-sm font-light focus:outline-none focus:border-black transition-colors duration-200"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  {/* Quick Price Ranges */}
                  <div className="pt-2">
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {[
                        { label: 'Under ₹500', min: '', max: '500' },
                        { label: '₹500-₹1000', min: '500', max: '1000' },
                        { label: '₹1000-₹2000', min: '1000', max: '2000' },
                        { label: 'Above ₹2000', min: '2000', max: '' },
                      ].map((range) => (
                        <button
                          key={range.label}
                          onClick={() => {
                            setMinPrice(range.min);
                            setMaxPrice(range.max);
                            
                            const params = new URLSearchParams(urlSearchParams.toString());
                            if (range.min) params.set('minPrice', range.min);
                            else params.delete('minPrice');
                            if (range.max) params.set('maxPrice', range.max);
                            else params.delete('maxPrice');
                            
                            router.push(`${pathname}?${params.toString()}`);
                          }}
                          className={`px-3 py-2 text-left border border-gray-200 font-light hover:border-black transition-colors duration-200 ${
                            (searchParams.minPrice === range.min && searchParams.maxPrice === range.max)
                              ? 'bg-black text-white border-black'
                              : 'text-black hover:bg-gray-50'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-black text-white py-3 px-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}