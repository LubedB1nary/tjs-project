import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, Package, Layers, ShieldCheck, Truck, CheckCircle, Phone, Clock, Star, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

async function getProcedures() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tjs_procedures')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  return data || []
}

async function getFeaturedBundles() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tjs_products')
    .select('*, tjs_procedures(name)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .eq('product_type', 'bundle')
    .limit(3)
  return data || []
}

export default async function StorePage() {
  const [procedures, featuredBundles] = await Promise.all([
    getProcedures(),
    getFeaturedBundles()
  ])

  return (
    <div className="bg-white">
      <section className="relative min-h-[85vh] flex items-center bg-[#002244] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002244] via-[#004b87] to-[#002244]" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5b9bd5]/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-8 group">
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/d8e42906-4e73-406e-9826-a04ecad3736c/TJS_icon-resized-1768544085055.webp" 
                  alt="TJS Logo" 
                  className="w-14 h-14 object-contain -my-2 transition-transform group-hover:scale-110"
                />
                <div className="-ml-1">
                  <p className="font-black text-white text-lg leading-none">Total Joint Specialists</p>
                  <p className="text-[10px] text-[#5b9bd5] font-bold uppercase tracking-[0.2em] mt-1">Patient Recovery Store</p>
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                Recovery starts with the 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#5b9bd5] to-white"> right equipment.</span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-xl">
                Physician-curated recovery kits delivered directly to patients. Trusted by 500+ orthopedic practices nationwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/store/bundles">
                  <Button size="lg" className="bg-[#5b9bd5] hover:bg-[#4a8ac4] text-white font-bold h-14 px-8 text-sm tracking-wide w-full sm:w-auto shadow-lg shadow-[#5b9bd5]/20 transition-all hover:shadow-[#5b9bd5]/30 hover:-translate-y-0.5">
                    Browse Recovery Kits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/store/products">
                  <Button size="lg" className="bg-transparent border-2 border-slate-500 text-white hover:bg-white/10 hover:border-white font-semibold h-14 px-8 text-sm tracking-wide w-full sm:w-auto transition-all">
                    View All Products
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-slate-800">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-[#002244] flex items-center justify-center">
                      <Users className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">Trusted by <span className="text-slate-300 font-semibold">10,000+</span> patients</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#5b9bd5]/10 to-[#004b87]/10 blur-3xl" />
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur border border-slate-700/50 p-8">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#004b87] to-[#5b9bd5]" />
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '98%', label: 'Patient Satisfaction', icon: Star },
                    { value: '2-Day', label: 'Delivery Speed', icon: Truck },
                    { value: '500+', label: 'Partner Clinics', icon: Users },
                    { value: '24/7', label: 'Patient Support', icon: Phone },
                  ].map((stat, i) => (
                    <div key={i} className="text-center p-6 bg-slate-800/50 border border-slate-700/30">
                      <stat.icon className="w-6 h-6 text-[#5b9bd5] mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-[#002244] border-y border-[#004b87]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-slate-500">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> FDA-Cleared Products</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> HSA/FSA Eligible</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Free Shipping Over $75</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 30-Day Returns</span>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-[#004b87] text-sm font-semibold tracking-wide mb-4">WHY PATIENTS CHOOSE US</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Everything you need for a successful recovery, in one place.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We partner with orthopedic surgeons to curate the exact products patients need—eliminating guesswork and ensuring compliance with post-operative protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Package, 
                title: 'Surgeon-Curated Kits', 
                description: 'Every bundle is designed by orthopedic specialists to match specific surgical procedures and recovery needs.',
                highlight: 'Procedure-specific'
              },
              { 
                icon: Truck, 
                title: 'Fast, Free Delivery', 
                description: 'Orders ship within 24 hours. Free shipping on orders over $75 so you\'re ready before surgery day.',
                highlight: '24hr dispatch'
              },
              { 
                icon: ShieldCheck, 
                title: 'Quality Guaranteed', 
                description: 'All products are FDA-cleared and backed by our 30-day satisfaction guarantee. No questions asked.',
                highlight: '100% satisfaction'
              },
            ].map((item, i) => (
              <div key={i} className="group relative bg-slate-50 p-8 border border-slate-100 hover:border-[#5b9bd5] hover:bg-gradient-to-br hover:from-[#5b9bd5]/10 hover:to-white transition-all duration-300">
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#004b87] group-hover:h-full transition-all duration-300" />
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#004b87] uppercase tracking-wider mb-6 bg-[#5b9bd5]/10 px-3 py-1.5 border border-[#5b9bd5]/30">
                  <Zap className="w-3 h-3" />
                  {item.highlight}
                </div>
                <item.icon className="w-10 h-10 text-slate-900 mb-6" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {procedures.length > 0 && (
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <span className="inline-block text-[#004b87] text-sm font-semibold tracking-wide mb-4">SHOP BY PROCEDURE</span>
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                  Find products for your surgery type
                </h2>
                <p className="text-lg text-slate-600">
                  Select your procedure below to see the recommended recovery products and kits.
                </p>
              </div>
              <Link href="/store/products" className="text-[#004b87] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View all products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {procedures.map((procedure, index) => (
                <Link
                  key={procedure.id}
                  href={`/store/category/${procedure.slug}`}
                  className="group relative bg-white border border-slate-200 hover:border-[#5b9bd5] hover:shadow-xl hover:shadow-[#5b9bd5]/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#004b87] to-[#5b9bd5] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-[#004b87] group-hover:border-[#004b87] transition-all duration-300">
                        <Package className="h-7 w-7 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-5xl font-bold text-slate-100 group-hover:text-[#5b9bd5] transition-colors">0{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#004b87] transition-colors">{procedure.name}</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed line-clamp-2">{procedure.description}</p>
                    <div className="flex items-center text-[#004b87] font-semibold text-sm">
                      Shop products <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredBundles.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 mb-6 font-semibold text-sm border border-emerald-100">
                <Layers className="h-4 w-4" />
                Save up to 25% with bundles
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Featured Recovery Kits</h2>
              <p className="text-lg text-slate-600">
                Complete recovery kits with everything you need in one convenient package.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredBundles.map((bundle) => {
                const includedItems = bundle.included_items as Array<{name: string}> | null
                return (
                  <Link
                    key={bundle.id}
                    href={`/store/products/${bundle.slug}`}
                    className="group bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5b9bd5]/5 to-[#004b87]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Layers className="h-24 w-24 text-slate-200 group-hover:text-[#5b9bd5] group-hover:scale-110 transition-all duration-300" />
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 shadow-lg">
                        BEST VALUE
                      </div>
                      {includedItems && includedItems.length > 0 && (
                        <div className="absolute bottom-4 left-4 bg-slate-900/80 text-white text-xs font-medium px-3 py-1.5">
                          {includedItems.length} items included
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <p className="text-xs font-semibold text-[#004b87] uppercase tracking-wider mb-2">
                        {(bundle.tjs_procedures as { name: string } | null)?.name || 'Recovery Kit'}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#004b87] transition-colors">{bundle.name}</h3>
                      <p className="text-slate-500 mb-4 line-clamp-2 leading-relaxed">{bundle.description}</p>
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <div>
                          <span className="text-3xl font-bold text-slate-900">${Number(bundle.unit_price).toFixed(2)}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-[#004b87] font-semibold text-sm group-hover:gap-3 transition-all">
                          View kit <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Link href="/store/bundles">
                <Button size="lg" className="font-semibold bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 text-sm tracking-wide">
                  View All Recovery Kits
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-[#002244] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5b9bd5]/5 to-[#004b87]/5" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[#5b9bd5] text-sm font-semibold tracking-wide mb-4">PATIENT SUPPORT</span>
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                Questions about your recovery?
              </h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Our patient support team is here to help you find the right products for your procedure and answer any questions about your order.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-[#5b9bd5] shrink-0" />
                  <span>Free product consultations with trained specialists</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-[#5b9bd5] shrink-0" />
                  <span>Order tracking and delivery updates via text/email</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-[#5b9bd5] shrink-0" />
                  <span>Easy returns within 30 days of purchase</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href="tel:+14045551234" className="group bg-slate-800/50 border border-slate-700 p-8 hover:bg-slate-800 hover:border-[#5b9bd5]/30 transition-all duration-300">
                <Phone className="h-8 w-8 text-[#5b9bd5] mb-6" />
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Call Us</div>
                <div className="text-2xl font-bold text-white group-hover:text-[#5b9bd5] transition-colors">(404) 555-1234</div>
                <p className="text-slate-500 text-sm mt-2">Mon-Fri 8am-6pm EST</p>
              </a>
              <Link href="/contact" className="group bg-slate-800/50 border border-slate-700 p-8 hover:bg-slate-800 hover:border-[#5b9bd5]/30 transition-all duration-300">
                <Clock className="h-8 w-8 text-[#5b9bd5] mb-6" />
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Support</div>
                <div className="text-2xl font-bold text-white group-hover:text-[#5b9bd5] transition-colors">Get in Touch</div>
                <p className="text-slate-500 text-sm mt-2">Response within 24hrs</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
