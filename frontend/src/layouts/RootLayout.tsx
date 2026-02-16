import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import CartDrawer from '../components/CartDrawer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function RootLayout() {
  const [cartOpen, setCartOpen] = useState(false)

  // Prevent background scroll when drawer is open.
  useEffect(() => {
    if (!cartOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [cartOpen])

  return (
    <div className="min-h-screen bg-hero-radial">
      <Navbar onOpenCart={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
