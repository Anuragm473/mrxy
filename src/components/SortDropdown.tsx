'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface SortDropdownProps {
  currentSort?: string;
}

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop Label - Hidden on mobile */}
      <label className="hidden lg:block text-xs font-medium tracking-[0.1em] text-black uppercase mb-2">
        Sort By
      </label>
      
      {/* Custom Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-w-[120px] lg:min-w-[180px] flex items-center justify-between px-3 lg:px-4 py-2 lg:py-3 bg-white border border-gray-200 text-xs lg:text-sm font-light text-black hover:border-black focus:outline-none focus:border-black transition-colors duration-200"
      >
        <span className="truncate">{currentOption.label}</span>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Custom Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`w-full px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm transition-colors duration-200 ${
                option.value === currentSort
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}