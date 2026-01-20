import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Layers, ArrowRight, CheckCircle, Star, ChevronRight, Zap, Package, Truck, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

async function getBundles() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tjs_products')
    .select('*, tjs_procedures(name)')
    .eq('is_active', true)
    .eq('product_type', 'bundle')
    .order('is_featured', { ascending: false })
  return data || []
}

export default async function BundlesPage() {
  const bundles = await getBundles()

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/store" className="text-slate-500 hover:text-cyan-600 transition-colors">
              TJS Store
            </Link>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className="text-slate-900 font-medium">Recovery Kits</span>
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#0a1628] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 text-sm font-bold border border-emerald-500/30">
              <Zap className="h-4 w-4" />
              SAVE UP TO 25%
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Layers className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <p className="text-cyan-400 text-sm font-semibold tracking-wide mb-1">CURATED BY SURGEONS</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">Recovery Kits</h1>
            </div>
          </div>
          <p className="text-xl text-slate-400 max-w-3xl mt-6 leading-relaxed">
            Complete recovery kits with everything you need in one convenient package.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-slate-700/50">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Surgeon-Curated Bundles</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Free Shipping on All Kits</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>30-Day Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {bundles.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 p-16 text-center">
            <Layers className="h-20 w-20 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Recovery Kits Available</h3>
            <p className="text-lg text-slate-500 mb-8">Check back soon for curated recovery bundles.</p>
            <Link href="/store/products">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                Browse Individual Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bundles.map((bundle) => {
                const includedItems = bundle.included_items as Array<{name: string}> | null
                return (
                  <Link
                    key={bundle.id}
                    href={`/store/products/${bundle.slug}`}
                    className="group bg-white border border-slate-200 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative overflow-hidden">
                      <Layers className="h-24 w-24 text-slate-200 group-hover:text-cyan-200 group-hover:scale-110 transition-all duration-300" />
                      {bundle.is_featured && (
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 shadow-lg">
                          BEST VALUE
                        </div>
                      )}
                      {includedItems && includedItems.length > 0 && (
                        <div className="absolute bottom-4 left-4 bg-slate-900/80 text-white text-xs font-medium px-3 py-1.5">
                          {includedItems.length} items included
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-2">
                        {(bundle.tjs_procedures as { name: string } | null)?.name || 'Recovery Kit'}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors">{bundle.name}</h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">{bundle.description}</p>
                      
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs text-slate-500 ml-2">(47 reviews)</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <span className="text-2xl font-bold text-slate-900">${Number(bundle.unit_price).toFixed(2)}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-cyan-600 font-semibold text-sm group-hover:gap-3 transition-all">
                          View Kit <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-8 bg-slate-50 border border-slate-100">
                <div className="w-14 h-14 bg-cyan-100 flex items-center justify-center mb-4">
                  <Package className="h-7 w-7 text-cyan-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Everything You Need</h3>
                <p className="text-sm text-slate-500">Each kit includes all essential items for your specific procedure recovery.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-slate-50 border border-slate-100">
                <div className="w-14 h-14 bg-cyan-100 flex items-center justify-center mb-4">
                  <Truck className="h-7 w-7 text-cyan-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Free 2-Day Shipping</h3>
                <p className="text-sm text-slate-500">All recovery kits ship free with expedited 2-day delivery.</p>
              </div>
              <div className="flex flex-col items-center text-center p-8 bg-slate-50 border border-slate-100">
                <div className="w-14 h-14 bg-cyan-100 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-7 w-7 text-cyan-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">30-Day Guarantee</h3>
                <p className="text-sm text-slate-500">Not satisfied? Return any unused items within 30 days for a full refund.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
