'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Phone } from 'lucide-react'
import { useTJSCartStore } from '@/lib/store/tjs-cart'

export function TJSHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const cartItemCount = useTJSCartStore((state) => state.getItemCount())

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="bg-[#004b87] text-white py-2 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <span>Need Help? Call <a href="tel:+18005551234" className="font-bold hover:underline">1-800-555-1234</a></span>
          </div>
          <span className="hidden sm:block">Physician-Recommended Recovery Products</span>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d8e42906-4e73-406e-9826-a04ecad3736c/TJS_icon-resized-1768544085055.webp" 
                  alt="TJS Logo" 
                  className="w-16 h-16 object-contain -my-4 transition-transform group-hover:scale-110"
                />
              </div>
              <div className="hidden sm:block -ml-1">
                <p className="font-black text-gray-900 text-xl leading-none">Total Joint Specialists</p>
                <p className="text-[11px] text-[#004b87] font-bold uppercase tracking-[0.2em] mt-1">Patient Recovery Store</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold text-gray-600 hover:text-[#004b87] transition-colors">
                Home
              </Link>
              <Link href="/store/products" className="text-sm font-bold text-gray-600 hover:text-[#004b87] transition-colors">
                Products
              </Link>
              <Link href="/store/bundles" className="text-sm font-bold text-gray-600 hover:text-[#004b87] transition-colors">
                Recovery Kits
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/store/cart" className="relative group">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#5b9bd5]/10 transition-colors">
                  <ShoppingCart className="h-5 w-5 text-gray-600 group-hover:text-[#004b87]" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#004b87] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>

              <button
                className="md:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
            <Link href="/" className="text-sm font-bold text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/store/products" className="text-sm font-bold text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>
              Products
            </Link>
            <Link href="/store/bundles" className="text-sm font-bold text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>
              Recovery Kits
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
