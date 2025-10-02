"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const categories = [
  "Basic",
  "Baseball",
  "Snapback",
  "Trucker",
  "Alpha Gen Kids",
  "Fitted Cap",
  "Exclusive Collection",
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
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeadwearOpen, setIsHeadwearOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { cart, refreshAuthStatus } = useCart();
  const totalItems = cart?.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  // 🔐 auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [pathname]);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Changed to lg breakpoint (1024px)
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    refreshAuthStatus();
    setIsAuthenticated(false);
    router.push("/");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsHeadwearOpen(false);
  }, [pathname]);

  // Close menus on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsHeadwearOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "top-0 bg-black/95 backdrop-blur-md shadow-lg border-b border-white/10"
            : "top-13 sm:top-13 md:top-13 lg:top-13 bg-black/90 backdrop-blur-sm"
        )}
      >
        <div className="max-w-[1450px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">

            {/* Logo */}
            <Link
  href="/"
  className="flex-shrink-0 group z-10 flex items-center h-full"
  aria-label="Mr.Xy Home"
>
  <div className="h-full flex items-center">
    <div className="overflow-hidden rounded-full w-14 h-14 flex items-center justify-center">
      <Image
        src="/logo-y.png"
        alt="logo image"
        width={56}   // equal width and height for perfect circle
        height={56}
        className="object-cover"
      />
    </div>
  </div>
</Link>




            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-light tracking-wide transition-all duration-300 relative hover:scale-105",
                    pathname === link.href
                      ? "text-white opacity-100"
                      : "text-white/80 hover:text-white hover:opacity-100"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-white animate-pulse"></span>
                  )}
                </Link>
              ))}

              {/* Desktop Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsHeadwearOpen(!isHeadwearOpen)}
                  onMouseEnter={() => setIsHeadwearOpen(true)}
                  className={cn(
                    "text-sm font-light tracking-wide transition-all duration-300 flex items-center gap-1 hover:scale-105",
                    isHeadwearOpen
                      ? "text-white opacity-100"
                      : "text-white/80 hover:text-white hover:opacity-100"
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
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Desktop Dropdown Menu */}
                {isHeadwearOpen && (
                  <div
                    className="absolute top-full left-0 mt-3 w-52 bg-black/95 backdrop-blur-md shadow-xl border border-white/10 py-2 rounded-lg"
                    onMouseLeave={() => setIsHeadwearOpen(false)}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/products?category=${encodeURIComponent(
                          category
                        )}`}
                        className="block px-4 py-2.5 text-sm font-light tracking-wide text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                        onClick={() => setIsHeadwearOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <Link
                        href="/products"
                        className="block px-4 py-2 text-xs font-light tracking-wide text-white/60 hover:text-white transition-colors duration-200"
                        onClick={() => setIsHeadwearOpen(false)}
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Cart */}
              <Link
                href="/cart"
                className="relative group transition-transform duration-200 hover:scale-110"
                aria-label={`Cart with ${totalItems || 0} items`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-xs font-medium animate-pulse">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Desktop Auth Links */}
              {!isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-sm text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500/20 hover:bg-red-500/30 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Right Section */}
            <div className="flex items-center space-x-3 lg:hidden">
              {/* Mobile Cart */}
              <Link
                href="/cart"
                className="relative group transition-transform duration-200 hover:scale-110 active:scale-95"
                aria-label={`Cart with ${totalItems || 0} items`}
              >
                <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors duration-200">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] flex items-center justify-center text-xs font-medium animate-pulse">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-8 h-8 sm:w-9 sm:h-9 flex flex-col justify-center items-center group bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                <span
                  className={cn(
                    "w-4 h-0.5 bg-white transition-all duration-300 transform origin-center",
                    isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1"
                  )}
                ></span>
                <span
                  className={cn(
                    "w-4 h-0.5 bg-white transition-all duration-300",
                    isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  )}
                ></span>
                <span
                  className={cn(
                    "w-4 h-0.5 bg-white transition-all duration-300 transform origin-center",
                    isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1"
                  )}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 bg-black/95 backdrop-blur-md border-t border-white/10",
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block text-base sm:text-lg font-light tracking-wide transition-all duration-200 py-2 px-2 rounded-lg hover:bg-white/5 active:bg-white/10",
                  pathname === link.href
                    ? "text-white opacity-100 bg-white/5"
                    : "text-white/80 hover:text-white hover:opacity-100"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <div className="w-full h-px bg-white/30 mt-1"></div>
                )}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="pt-3 sm:pt-4 border-t border-white/10">
              <button
                onClick={() => setIsHeadwearOpen(!isHeadwearOpen)}
                className="w-full flex items-center justify-between text-base sm:text-lg font-light tracking-wide text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 py-2 px-2 rounded-lg"
                aria-expanded={isHeadwearOpen}
              >
                <span>Categories</span>
                <svg
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isHeadwearOpen && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isHeadwearOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="space-y-1 mt-2 ml-4">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(
                        category
                      )}`}
                      className="block text-sm sm:text-base font-light tracking-wide text-white/60 hover:text-white transition-all duration-200 py-2 px-2 rounded hover:bg-white/5"
                    >
                      {category}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="block text-sm font-light tracking-wide text-white transition-all duration-200 mt-3 py-2 px-2 rounded hover:bg-white/5"
                  >
                    View All →
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Auth */}
            <div className="pt-3 sm:pt-4 border-t border-white/10">
              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/login"
                    className="text-base text-center py-3 px-4 text-white/80 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200 hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-base text-center py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 font-medium"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-base text-center py-3 px-4 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16 lg:h-18" />
    </>
  );
}