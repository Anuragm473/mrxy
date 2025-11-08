import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <h2 className="text-3xl font-bold tracking-tight">mrxycaps</h2>
              <p className="text-gray-400 text-sm mt-2">Premium Quality Caps</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your one-stop destination for stylish and high-quality caps. Express yourself with our exclusive collection.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a 
                href="https://facebook.com/mrxycaps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black p-2 hover:bg-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com/mrxycaps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black p-2 hover:bg-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com/mrxycaps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black p-2 hover:bg-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://youtube.com/@mrxycaps" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black p-2 hover:bg-gray-200 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b-2 border-white pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  mrxycaps<br />
                  ground floor, Saikrupa society, Building no 58, G1/2/3/4, Nehru Nagar, Kurla, Mumbai, Maharashtra 400024<br />
                  India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:support@mrxycaps.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  support@mrxycaps.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +91-XXXX-XXXXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive offers, new product updates, and style tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white text-black border-2 border-white focus:outline-none focus:border-gray-300"
              />
              <button className="px-6 py-2 bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-4 border-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} <span className="font-bold text-white">mrxycaps</span>. All rights reserved.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm mr-2">We Accept:</span>
              <div className="flex gap-2">
                <div className="bg-white px-3 py-1 text-xs font-bold text-black">VISA</div>
                <div className="bg-white px-3 py-1 text-xs font-bold text-black">MC</div>
                <div className="bg-white px-3 py-1 text-xs font-bold text-black">UPI</div>
                <div className="bg-white px-3 py-1 text-xs font-bold text-black">COD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};