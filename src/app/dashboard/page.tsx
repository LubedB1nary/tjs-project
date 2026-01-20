'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  ShoppingBag,
  Layers,
  Activity,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Eye,
  ChevronRight,
  Box,
  AlertCircle,
  BarChart3,
  Users,
  Truck
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface TJSProduct {
  id: string
  sku: string
  name: string
  slug: string
  description: string | null
  unit_price: number
  msrp: number | null
  stock_quantity: number
  is_active: boolean
  created_at: string
  product_type?: string | null
  is_featured?: boolean | null
  included_items?: Array<{name: string}> | null
}

interface TJSProcedure {
  id: string
  name: string
  slug: string
  is_active: boolean
  sort_order: number
}

interface TJSOrder {
  id: string
  order_number: string
  customer_name: string
  total: number
  status: string
  created_at: string
}

export default function DashboardPage() {
  const [products, setProducts] = useState<TJSProduct[]>([])
  const [procedures, setProcedures] = useState<TJSProcedure[]>([])
  const [orders, setOrders] = useState<TJSOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const supabase = createClient()
    setLoading(true)

    const [productsRes, proceduresRes, ordersRes] = await Promise.all([
      supabase.from('tjs_products').select('*').order('created_at', { ascending: false }),
      supabase.from('tjs_procedures').select('*').order('sort_order'),
      supabase.from('tjs_orders').select('*').order('created_at', { ascending: false }).limit(50)
    ])

    setProducts(productsRes.data || [])
    setProcedures(proceduresRes.data || [])
    setOrders(ordersRes.data || [])
    setLoading(false)
  }

  async function deleteProduct(id: string) {
    if (!confirm('Are you sure you want to delete this product?')) return
    const supabase = createClient()
    await supabase.from('tjs_products').delete().eq('id', id)
    fetchData()
  }

  async function toggleProductStatus(id: string, currentStatus: boolean) {
    const supabase = createClient()
    await supabase.from('tjs_products').update({ is_active: !currentStatus }).eq('id', id)
    fetchData()
  }

  const filteredProducts = products.filter(p =>
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())) &&
    p.product_type !== 'bundle'
  )

  const filteredBundles = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    p.product_type === 'bundle'
  )

  const totalRevenue = orders.reduce((acc, o) => acc + Number(o.total), 0)
  const individualProducts = products.filter(p => p.product_type !== 'bundle')
  const bundleProducts = products.filter(p => p.product_type === 'bundle')
  const lowStockProducts = individualProducts.filter(p => p.stock_quantity < 20)
  const outOfStockProducts = individualProducts.filter(p => p.stock_quantity === 0)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">TJS Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Link href="/store" target="_blank">
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-0 text-[10px]">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12%
                </Badge>
              </div>
              <p className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-slate-500 mt-1">Total Revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{orders.length}</p>
              <p className="text-xs text-slate-500 mt-1">Total Orders</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-cyan-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{individualProducts.length}</p>
              <p className="text-xs text-slate-500 mt-1">Products</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Layers className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{bundleProducts.length}</p>
              <p className="text-xs text-slate-500 mt-1">Recovery Kits</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1">
            <TabsTrigger value="products" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="bundles" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              <Layers className="h-4 w-4 mr-2" />
              Bundles
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="procedures" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Procedures
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-white"
                />
              </div>
              <Link href="/dashboard/products/new">
                <Button size="sm" className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </Link>
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-12 text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto text-slate-400" />
                    <p className="text-sm text-slate-500 mt-2">Loading products...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-12 text-center">
                    <Package className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">No products found</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Product</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">SKU</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Price</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Stock</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Status</th>
                        <th className="text-right text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{product.sku}</code>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-900">${Number(product.unit_price).toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-semibold ${
                              product.stock_quantity === 0 ? 'text-rose-600' :
                              product.stock_quantity < 20 ? 'text-amber-600' :
                              'text-slate-900'
                            }`}>{product.stock_quantity}</span>
                          </td>
                          <td className="px-6 py-4">
                            <button onClick={() => toggleProductStatus(product.id, product.is_active)}>
                              <Badge variant={product.is_active ? 'default' : 'secondary'} className={`cursor-pointer ${
                                product.is_active ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600'
                              }`}>
                                {product.is_active ? 'Active' : 'Draft'}
                              </Badge>
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              <Link href={`/store/products/${product.slug}`} target="_blank">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link href={`/dashboard/products/${product.id}`}>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50" onClick={() => deleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bundles" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search bundles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-white"
                />
              </div>
              <Link href="/dashboard/products/new">
                <Button size="sm" className="gap-2 bg-cyan-600 hover:bg-cyan-700">
                  <Plus className="h-4 w-4" />
                  Create Bundle
                </Button>
              </Link>
            </div>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-0">
                {filteredBundles.length === 0 ? (
                  <div className="p-12 text-center">
                    <Layers className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">No bundles found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredBundles.map((bundle) => (
                      <div key={bundle.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Layers className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{bundle.name}</p>
                            <p className="text-sm text-slate-500">/{bundle.slug}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="font-bold text-slate-900 text-lg">${Number(bundle.unit_price).toFixed(2)}</p>
                          <Badge variant={bundle.is_active ? 'default' : 'secondary'} className={
                            bundle.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                          }>
                            {bundle.is_active ? 'Active' : 'Draft'}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Link href={`/store/products/${bundle.slug}`} target="_blank">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/products/${bundle.id}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50" onClick={() => deleteProduct(bundle.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-0">
                {orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <ShoppingBag className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">No orders found</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Order</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Customer</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Date</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Total</th>
                        <th className="text-left text-xs font-semibold text-slate-600 uppercase tracking-wider px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-900">#{order.order_number}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600">{order.customer_name || 'Guest'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600">{new Date(order.created_at).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">${Number(order.total).toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={`${
                              order.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                              order.status === 'processing' ? 'bg-blue-50 text-blue-700' :
                              order.status === 'shipped' ? 'bg-purple-50 text-purple-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procedures" className="space-y-4">
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-0">
                {procedures.length === 0 ? (
                  <div className="p-12 text-center">
                    <Activity className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">No procedures found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {procedures.map((procedure, index) => (
                      <div key={procedure.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-sm font-bold text-slate-500">
                            {index + 1}
                          </div>
                          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                            <Activity className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{procedure.name}</p>
                            <p className="text-sm text-slate-500">/{procedure.slug}</p>
                          </div>
                        </div>
                        <Badge variant={procedure.is_active ? 'default' : 'secondary'} className={
                          procedure.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }>
                          {procedure.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
