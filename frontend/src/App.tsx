import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import PageTransition from './components/PageTransition'
import RootLayout from './layouts/RootLayout'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Menu from './pages/Menu'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="menu" element={<PageTransition><Menu /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
