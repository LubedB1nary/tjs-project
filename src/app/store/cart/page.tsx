'use client'

import Link from 'next/link'
import { ShoppingCart, Package, Layers, Plus, Minus, Trash2, ArrowLeft, ArrowRight, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTJSCartStore } from '@/lib/store/tjs-cart'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useTJSCartStore()
  const subtotal = getSubtotal()
  const shipping = subtotal >= 75 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
            <ShoppingCart className="h-20 w-20 text-gray-200 mx-auto mb-6" />
            <h1 className="text-2xl font-black text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-8">Browse our recovery products and kits to find what you need for your healing journey.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/store/products">
                <Button className="bg-teal-600 hover:bg-teal-700 rounded-xl font-bold h-12 px-6">
                  <Package className="h-5 w-5 mr-2" />
                  Browse Products
                </Button>
              </Link>
              <Link href="/store/bundles">
                <Button variant="outline" className="rounded-xl font-bold h-12 px-6 border-teal-200 text-teal-700 hover:bg-teal-50">
                  <Layers className="h-5 w-5 mr-2" />
                  View Recovery Kits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/store" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                      {item.type === 'bundle' ? (
                        <Layers className="h-10 w-10 text-teal-300" />
                      ) : (
                        <Package className="h-10 w-10 text-gray-300" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {item.type === 'bundle' && (
                            <span className="inline-block text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded mb-1">
                              Recovery Kit
                            </span>
                          )}
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          {item.sku && <p className="text-sm text-gray-500">{item.sku}</p>}
                        </div>
                        <p className="font-black text-gray-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 h-10 flex items-center justify-center font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={clearCart}
              className="mt-4 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-32">
              <h2 className="font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Tax</span>
                  <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-black text-xl text-teal-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 75 && (
                <div className="mt-4 p-3 bg-teal-50 rounded-xl text-sm text-teal-700">
                  <Truck className="h-4 w-4 inline mr-2" />
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <Link href="/store/checkout" className="block mt-6">
                <Button className="w-full h-14 bg-teal-600 hover:bg-teal-700 rounded-xl font-bold text-lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-teal-500" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck className="h-4 w-4 text-teal-500" />
                  <span>Free shipping on orders over $75</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
