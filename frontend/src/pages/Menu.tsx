import { motion } from 'framer-motion'
import { Plus, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useCart } from '../context/cart'
import { MENU_CATEGORIES, MENU_ITEMS, type MenuCategory } from '../data/menu'
import { formatPKR } from '../utils/currency'

function CategoryPill({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full bg-friking-yellow px-4 py-2 text-xs font-black text-black'
          : 'rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10'
      }
    >
      {label}
    </button>
  )
}

export default function Menu() {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>(
    'All',
  )

  const items = useMemo(() => {
    if (activeCategory === 'All') return MENU_ITEMS
    return MENU_ITEMS.filter((x) => x.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="container-page pb-16 pt-8">
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
          <Sparkles className="h-4 w-4 text-friking-yellow" />
          Big menu. Huge cravings.
        </div>
        <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
          FriKing Menu
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
          Browse categories, tap “Add to Cart”, and build your order with smooth
          animations.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <CategoryPill
          active={activeCategory === 'All'}
          label="All"
          onClick={() => setActiveCategory('All')}
        />
        {MENU_CATEGORIES.map((c) => (
          <CategoryPill
            key={c}
            active={activeCategory === c}
            label={c}
            onClick={() => setActiveCategory(c)}
          />
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-friking-charcoal/30 shadow-glow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: idx * 0.03 }}
            whileHover={{ y: -8 }}
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {item.popular ? (
                <div className="absolute left-3 top-3 rounded-full bg-friking-yellow px-3 py-1 text-xs font-black text-black">
                  Popular
                </div>
              ) : null}
              {item.spicy ? (
                <div className="absolute right-3 top-3 rounded-full bg-friking-red px-3 py-1 text-xs font-black text-white">
                  Spicy
                </div>
              ) : null}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-base font-extrabold">
                    {item.name}
                  </div>
                  <div className="mt-1 line-clamp-2 text-sm text-white/70">
                    {item.description}
                  </div>
                </div>
                <div className="shrink-0 rounded-full bg-black/20 px-3 py-1 text-sm font-extrabold text-friking-yellow">
                  {formatPKR(item.price)}
                </div>
              </div>

              <button
                type="button"
                className="btn-primary mt-5 w-full"
                onClick={() =>
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
