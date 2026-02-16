import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-friking-charcoal/40">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <div className="text-lg font-extrabold">FriKing</div>
          <p className="mt-2 text-sm text-white/70">
            Premium fast-food experience with bold flavors, crispy bites, and
            lightning-fast service.
          </p>
        </div>

        <div>
          <div className="text-sm font-bold text-white/90">Quick Links</div>
          <div className="mt-3 grid gap-2 text-sm">
            <Link className="text-white/70 hover:text-white" to="/menu">
              View Menu
            </Link>
            <Link className="text-white/70 hover:text-white" to="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-bold text-white/90">Hours</div>
          <div className="mt-3 text-sm text-white/70">
            <div>Mon–Thu: 12:00 PM – 12:00 AM</div>
            <div>Fri–Sun: 12:00 PM – 2:00 AM</div>
            <div className="mt-3">Phone: +92 302 1444269</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Haseeb Rajput. All rights reserved.
      </div>
    </footer>
  )
}
