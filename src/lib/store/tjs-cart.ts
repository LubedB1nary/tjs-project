import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface TJSCartItem {
  id: string
  type: 'product' | 'bundle'
  name: string
  sku?: string
  price: number
  quantity: number
  image_url?: string | null
}

interface TJSCartStore {
  items: TJSCartItem[]
  addItem: (item: Omit<TJSCartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
}

export const useTJSCartStore = create<TJSCartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id && i.type === item.type)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.type === item.type
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return {
            items: [...state.items, { ...item, quantity }],
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'tjs-cart-storage',
    }
  )
)
