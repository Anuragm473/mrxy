'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface FiltersPanelProps {
  searchParams: {
    category?: string;
    color?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  };
}

export default function FiltersPanel({ searchParams }: FiltersPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || '');
  const [priceTimeout, setPriceTimeout] = useState<NodeJS.Timeout | null>(null);

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
      // If same filter is clicked, remove it
      updateUrlParams('inStock', null);
    } else {
      // Apply new filter
      updateUrlParams('inStock', stockStatus);
    }
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    if (type === 'min') {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }

    // Clear existing timeout
    if (priceTimeout) {
      clearTimeout(priceTimeout);
    }

    // Set new timeout for debounced update
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
    }, 500); // 500ms debounce

    setPriceTimeout(timeout);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(urlSearchParams.toString());
    params.delete('inStock');
    params.delete('minPrice');
    params.delete('maxPrice');
    params.delete('category');
    params.delete('color');
    params.delete('sort');
    
    setMinPrice('');
    setMaxPrice('');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters = searchParams.inStock || searchParams.minPrice || searchParams.maxPrice || searchParams.category || searchParams.color;

  // Update local state when URL params change
  useEffect(() => {
    setMinPrice(searchParams.minPrice || '');
    setMaxPrice(searchParams.maxPrice || '');
  }, [searchParams.minPrice, searchParams.maxPrice]);

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pb-6 border-b border-gray-100">
          <button
            onClick={clearAllFilters}
            className="text-xs font-medium tracking-[0.1em] text-gray-600 hover:text-black transition-colors duration-200 uppercase"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Stock Status Filter */}
      <div>
        <h3 className="text-xs font-medium tracking-[0.1em] text-black uppercase mb-4">
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
            <span className="ml-3 text-sm font-light text-black group-hover:text-gray-600 transition-colors duration-200">
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
            <span className="ml-3 text-sm font-light text-black group-hover:text-gray-600 transition-colors duration-200">
              Out of Stock
            </span>
          </label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-xs font-medium tracking-[0.1em] text-black uppercase mb-4">
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
            <div className="grid grid-cols-2 gap-2 text-xs">
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
  );
}