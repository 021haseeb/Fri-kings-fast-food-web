import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useCart } from '../context/cart'

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'rounded-full px-4 py-2 text-sm font-semibold transition',
          isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalItems } = useCart()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8)
  })

  // Reduced-motion friendly: still works without motion since it's mostly CSS.
  const containerClass = useMemo(() => {
    return [
      'fixed inset-x-0 top-0 z-50 transition',
      scrolled
        ? 'bg-friking-black/70 backdrop-blur border-b border-white/10'
        : 'bg-transparent',
    ].join(' ')
  }, [scrolled])

  // Ensure correct initial state when landing on a deep link.
  useEffect(() => {
    setScrolled(window.scrollY > 8)
  }, [])

  return (
    <motion.header
      className={containerClass}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-friking-red shadow-glow">
            <span className="text-lg font-black">F</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wide">FriKing</div>
            <div className="text-[11px] text-white/60">King of Taste</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavItem to="/" label="Home" />
          <NavItem to="/menu" label="Menu" />
          <NavItem to="/contact" label="Contact" />
        </nav>

        <button
          type="button"
          onClick={onOpenCart}
          className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-friking-yellow px-1 text-[11px] font-black text-black">
              {totalItems}
            </span>
          ) : null}
        </button>
      </div>

      <div className="container-page pb-3 md:hidden">
        <div className="flex items-center gap-2">
          <NavItem to="/" label="Home" />
          <NavItem to="/menu" label="Menu" />
          <NavItem to="/contact" label="Contact" />
        </div>
      </div>
    </motion.header>
  )
}
