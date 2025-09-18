'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface SortDropdownProps {
  currentSort?: string;
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 text-sm px-4 py-2 pr-8 focus:outline-none focus:border-black cursor-pointer"
        onChange={handleSortChange}
        value={currentSort || ""}
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="newest">Newest</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}