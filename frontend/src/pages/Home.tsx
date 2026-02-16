import { motion } from 'framer-motion'
import { ArrowRight, Flame, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { MENU_ITEMS } from '../data/menu'
import { TESTIMONIALS } from '../data/testimonials'

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-xs font-black tracking-[0.25em] text-friking-yellow">
        {kicker}
      </div>
      <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{title}</h2>
    </div>
  )
}

export default function Home() {
  const featured = MENU_ITEMS.filter((x) => x.popular).slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="container-page pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80"
            >
              <Flame className="h-4 w-4 text-friking-yellow" />
              Premium fast-food vibes. Fast. Crispy. Legendary.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
              className="mt-6 text-4xl font-black leading-tight md:text-6xl"
            >
              FriKing – <span className="text-friking-yellow">King of Taste</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
              className="mt-5 max-w-xl text-base text-white/70 md:text-lg"
            >
              Burgers, pizzas, broast, rolls, fries — built for cravings and
              delivered with attitude.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/menu" className="btn-primary">
                Order Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/menu" className="btn-secondary">
                View Menu
              </Link>
            </motion.div>

            <div className="mt-8 flex items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/5">
                  <Star className="h-4 w-4 text-friking-yellow" />
                </span>
                <span>4.8 average rating</span>
              </div>
              <div className="h-5 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/5">
                  <MapPin className="h-4 w-4 text-friking-yellow" />
                </span>
                <span>Lahore (Bedian Road)</span>
              </div>
            </div>
          </div>

          {/* Showcase */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-white/5 blur-2xl" />
            <motion.div
              className="relative rounded-[2rem] border border-white/10 bg-friking-charcoal/40 p-5 shadow-glow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold">Featured</div>
                  <div className="text-xs text-white/60">Drag to explore</div>
                </div>
              </div>

              <motion.div
                className="mt-5 flex gap-4 overflow-hidden"
                whileTap={{ cursor: 'grabbing' }}
              >
                <motion.div
                  className="flex gap-4"
                  drag="x"
                  dragConstraints={{ left: -420, right: 0 }}
                >
                  {featured.map((item) => (
                    <motion.div
                      key={item.id}
                      className="w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <div className="text-sm font-extrabold">{item.name}</div>
                        <div className="mt-1 line-clamp-2 text-xs text-white/60">
                          {item.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Happy Customers */}
      <section className="border-y border-white/10 bg-friking-charcoal/30 py-16">
        <div className="container-page">
          <SectionTitle kicker="HAPPY CUSTOMERS" title="People love FriKing" />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold">{t.name}</div>
                  <div className="flex items-center gap-1 text-friking-yellow">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < t.rating
                            ? 'h-4 w-4 fill-friking-yellow'
                            : 'h-4 w-4 opacity-40'
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/70">{t.review}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="container-page py-16">
        <SectionTitle kicker="LOCATION" title="Find us fast" />

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-black/20 p-6"
          >
            <div className="text-sm font-extrabold">FriKing — Main Branch</div>
            <div className="mt-2 text-sm text-white/70">
               Bedian road, Lahore, Pakistan
            </div>
            <div className="mt-4 grid gap-2 text-sm text-white/70">
              <div>
                <span className="font-semibold text-white">Phone:</span> +92 302
                1444269
              </div>
              <div>
                <span className="font-semibold text-white">Hours:</span> 12:00
                PM – 12:00 AM
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="overflow-hidden rounded-2xl border border-white/10"
          >
            {/* Google Maps embed (demo). Replace src with your exact location as needed. */}
            <iframe
              title="FriKing location"
              src="https://www.google.com/maps?q=Lahore%20Pakistan&output=embed"
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
