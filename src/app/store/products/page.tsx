import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Package, Filter, ArrowLeft } from 'lucide-react'

async function getProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tjs_products')
    .select('*')
    .eq('is_active', true)
    .order('name')
  return data || []
}

async function getProcedures() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('tjs_procedures')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  return data || []
}

export default async function ProductsPage() {
  const [products, procedures] = await Promise.all([
    getProducts(),
    getProcedures()
  ])

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-900 pt-16 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/store" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4" />
            Product Catalog
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Recovery Systems & Supplies</h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-light">
            Surgical-grade post-operative equipment and medical supplies for accelerated recovery.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="lg:w-64 shrink-0">
            <div className="border border-slate-200 p-0 sticky top-32">
              <div className="bg-slate-50 border-b border-slate-200 p-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Classification
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                <Link
                  href="/store/products"
                  className="block px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 uppercase tracking-tight"
                >
                  All Distribution
                </Link>
                {procedures.map((procedure) => (
                  <Link
                    key={procedure.id}
                    href={`/store/products?procedure=${procedure.slug}`}
                    className="block px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 uppercase tracking-tight"
                  >
                    {procedure.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{products.length} SKU(s) FOUND</p>
            </div>

            {products.length === 0 ? (
              <div className="bg-slate-50 p-16 text-center border border-slate-200">
                <Package className="h-16 w-16 text-slate-300 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Records Found</h3>
                <p className="text-slate-500">Contact distribution for availability.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/store/products/${product.slug}`}
                    className="group bg-white p-8 hover:bg-slate-50 transition-colors"
                  >
                    <div className="aspect-square bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                      <Package className="h-20 w-20 text-slate-200 group-hover:text-slate-300 transition-colors" />
                    </div>
                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-tighter">SKU: {product.sku}</p>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-tight">{product.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-snug">{product.description}</p>
                    <div className="flex items-end justify-between mt-auto">
                      <div className="flex flex-col">
                        {product.msrp && Number(product.msrp) > Number(product.unit_price) && (
                          <span className="text-xs text-slate-400 line-through font-light mb-1">${Number(product.msrp).toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-bold text-blue-900">${Number(product.unit_price).toFixed(2)}</span>
                      </div>
                      {product.stock_quantity > 0 ? (
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest border border-emerald-100 bg-emerald-50 px-2 py-1">
                          Available
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest border border-red-100 bg-red-50 px-2 py-1">
                          Backordered
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
