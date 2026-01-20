import Link from 'next/link'
import { Phone, Mail, Heart } from 'lucide-react'

export function TJSFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="relative">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d8e42906-4e73-406e-9826-a04ecad3736c/TJS_icon-resized-1768544085055.webp" 
                  alt="TJS Logo" 
                  className="w-16 h-16 object-contain -my-4 transition-transform group-hover:scale-110"
                />
              </div>
              <div className="-ml-1">
                <p className="font-black text-white text-xl leading-none">Total Joint Specialists</p>
                <p className="text-[11px] text-[#5b9bd5] font-bold uppercase tracking-[0.2em] mt-1">Patient Recovery Store</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-6 max-w-sm leading-relaxed">
              Physician-recommended recovery products for post-operative patients. Trusted by orthopedic surgeons nationwide.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Heart className="h-3 w-3 text-[#5b9bd5]" />
              <span>Total Joint Specialists Patient Recovery Store</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/store/products" className="text-sm hover:text-[#5b9bd5] transition-colors">All Products</Link></li>
              <li><Link href="/store/bundles" className="text-sm hover:text-[#5b9bd5] transition-colors">Recovery Kits</Link></li>
              <li><Link href="/store/cart" className="text-sm hover:text-[#5b9bd5] transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">Contact Support</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#5b9bd5]" />
                <a href="tel:+18005551234" className="text-sm hover:text-[#5b9bd5] transition-colors">1-800-555-1234</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#5b9bd5]" />
                <a href="mailto:support@tjstore.com" className="text-sm hover:text-[#5b9bd5] transition-colors">support@tjstore.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Total Joint Specialists. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#5b9bd5] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#5b9bd5] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
