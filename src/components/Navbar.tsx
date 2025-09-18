"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const categories = [
  "Basic", 
  "Baseball", 
  "Snapback", 
  "Trucker", 
  "Fitted Cap", 
  "Exclusive Collection"
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/order-tracking", label: "Track" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeadwearOpen, setIsHeadwearOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsHeadwearOpen(false);
  }, [pathname]);

  // Close menus on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsHeadwearOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" 
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            
            {/* Logo */}
            <Link 
              href="/" 
              className="flex-shrink-0 group"
              aria-label="Mr.Xy Home"
            >
              <span className="text-xl lg:text-2xl font-light tracking-widest text-black transition-opacity duration-300 group-hover:opacity-70">
                Mr.Xy
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-light tracking-wide transition-opacity duration-300 relative",
                    pathname === link.href 
                      ? "text-black opacity-100" 
                      : "text-gray-600 hover:text-black hover:opacity-100"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-black"></span>
                  )}
                </Link>
              ))}

              {/* Desktop Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsHeadwearOpen(!isHeadwearOpen)}
                  onMouseEnter={() => setIsHeadwearOpen(true)}
                  className={cn(
                    "text-sm font-light tracking-wide transition-opacity duration-300 flex items-center gap-1",
                    isHeadwearOpen ? "text-black opacity-100" : "text-gray-600 hover:text-black hover:opacity-100"
                  )}
                  aria-expanded={isHeadwearOpen}
                  aria-haspopup="true"
                >
                  Categories
                  <svg 
                    className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      isHeadwearOpen && "rotate-180"
                    )} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Desktop Dropdown Menu */}
                {isHeadwearOpen && (
                  <div 
                    className="absolute top-full left-0 mt-3 w-48 bg-white shadow-lg border border-gray-100 py-2"
                    onMouseLeave={() => setIsHeadwearOpen(false)}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="block px-4 py-2 text-xs font-light tracking-wide text-gray-600 hover:text-black transition-colors duration-200"
                        onClick={() => setIsHeadwearOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link
                        href="/products"
                        className="block px-4 py-2 text-xs font-light tracking-wide text-black transition-colors duration-200"
                        onClick={() => setIsHeadwearOpen(false)}
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-5 h-5 flex flex-col justify-center items-center group"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <span className={cn(
                "w-4 h-px bg-black transition-all duration-300 transform origin-center",
                isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1"
              )}></span>
              <span className={cn(
                "w-4 h-px bg-black transition-all duration-300",
                isMenuOpen ? "opacity-0" : "opacity-100"
              )}></span>
              <span className={cn(
                "w-4 h-px bg-black transition-all duration-300 transform origin-center",
                isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1"
              )}></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            
            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block text-sm font-light tracking-wide transition-opacity duration-200",
                  pathname === link.href
                    ? "text-black opacity-100"
                    : "text-gray-600 hover:text-black hover:opacity-100"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={() => setIsHeadwearOpen(!isHeadwearOpen)}
                className="w-full flex items-center justify-between text-sm font-light tracking-wide text-gray-600 hover:text-black transition-colors duration-200"
                aria-expanded={isHeadwearOpen}
              >
                <span>Categories</span>
                <svg 
                  className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    isHeadwearOpen && "rotate-180"
                  )} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mobile Categories List */}
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                isHeadwearOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
              )}>
                <div className="space-y-2 mt-3">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="block text-xs font-light tracking-wide text-gray-500 hover:text-black transition-colors duration-200"
                    >
                      {category}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="block text-xs font-light tracking-wide text-black transition-colors duration-200 mt-3"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-18" />
    </>
  );
}