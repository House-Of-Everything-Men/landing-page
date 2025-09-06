import React, { createContext, useContext, useMemo, useState } from 'react'
import type { Product } from '../data/products'

export type CartItem = { product: Product; quantity: number }

type CartState = {
  items: CartItem[]
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  totalQuantity: number
  totalPrice: number
}

const CartContext = createContext<CartState | null>(null)

const LS_KEY = 'em.cart.v1'

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function save(items: CartItem[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items))
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load())

  const addItem = (product: Product, qty = 1) => {
    setItems(prev => {
      const next = [...prev]
      const idx = next.findIndex(i => i.product.id === product.id)
      if (idx >= 0) next[idx] = { ...next[idx], quantity: next[idx].quantity + qty }
      else next.push({ product, quantity: qty })
      save(next)
      return next
    })
  }

  const updateQty = (productId: string, qty: number) => {
    setItems(prev => {
      const next = prev
        .map(i => (i.product.id === productId ? { ...i, quantity: qty } : i))
        .filter(i => i.quantity > 0)
      save(next)
      return next
    })
  }

  const removeItem = (productId: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.product.id !== productId)
      save(next)
      return next
    })
  }

  const clear = () => {
    setItems([])
    save([])
  }

  const totalQuantity = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((n, i) => n + i.quantity * i.product.price, 0), [items])

  const value: CartState = { items, addItem, removeItem, updateQty, clear, totalQuantity, totalPrice }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

