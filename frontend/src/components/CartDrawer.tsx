import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2, X } from 'lucide-react'

import { useCart } from '../context/cart'
import { formatPKR } from '../utils/currency'

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { items, removeItem, setQty, totalPrice, clear } = useCart()

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-friking-black"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
              <div>
                <div className="text-sm font-extrabold">Your Cart</div>
                <div className="text-xs text-white/60">Ready to rule your hunger.</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex h-[calc(100%-5rem)] flex-col">
              <div className="flex-1 overflow-auto p-5">
                {items.length === 0 ? (
                  <div className="grid h-full place-items-center text-center">
                    <div>
                      <div className="text-lg font-extrabold">Cart is empty</div>
                      <div className="mt-1 text-sm text-white/60">
                        Add something spicy.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-extrabold">
                                {item.name}
                              </div>
                              <div className="mt-0.5 text-xs text-white/60">
                                {formatPKR(item.price)}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 p-1">
                            <button
                              type="button"
                              className="rounded-full p-2 hover:bg-white/10"
                              onClick={() => setQty(item.id, Math.max(1, item.qty - 1))}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              className="rounded-full p-2 hover:bg-white/10"
                              onClick={() => setQty(item.id, item.qty + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Total</span>
                  <span className="text-lg font-extrabold">
                    {formatPKR(totalPrice)}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={clear}
                    className="btn-secondary"
                    disabled={items.length === 0}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={items.length === 0}
                  >
                    Checkout
                  </button>
                </div>

                <div className="mt-3 text-xs text-white/50">
                  Checkout is UI-only for now; we’ll hook it to the Orders API next.
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
