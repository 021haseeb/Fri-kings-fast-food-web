import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import type { PropsWithChildren } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  qty: number
}

type CartState = {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'>; qty?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }

const STORAGE_KEY = 'friking.cart.v1'

function clampQty(qty: number) {
  if (!Number.isFinite(qty)) return 1
  return Math.max(1, Math.min(99, Math.floor(qty)))
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = clampQty(action.qty ?? 1)
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: clampQty(i.qty + qty) } : i,
          ),
        }
      }
      return { items: [...state.items, { ...action.item, qty }] }
    }
    case 'REMOVE': {
      return { items: state.items.filter((i) => i.id !== action.id) }
    }
    case 'SET_QTY': {
      const nextQty = clampQty(action.qty)
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: nextQty } : i,
        ),
      }
    }
    case 'CLEAR': {
      return { items: [] }
    }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeItem: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function loadInitialState(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw) as CartState
    if (!parsed?.items || !Array.isArray(parsed.items)) return { items: [] }
    return {
      items: parsed.items
        .filter((x) => x && typeof x.id === 'string')
        .map((x) => ({
          id: x.id,
          name: String(x.name ?? ''),
          price: Number(x.price ?? 0),
          image: String(x.image ?? ''),
          qty: clampQty(Number(x.qty ?? 1)),
        })),
    }
  } catch {
    return { items: [] }
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
    const totalPrice = state.items.reduce((sum, i) => sum + i.qty * i.price, 0)

    return {
      items: state.items,
      totalItems,
      totalPrice,
      addItem: (item, qty) => dispatch({ type: 'ADD', item, qty }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state.items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
