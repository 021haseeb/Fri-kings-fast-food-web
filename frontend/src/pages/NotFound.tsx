import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-black/20 p-10">
        <div className="text-5xl font-black">404</div>
        <div className="mt-3 text-lg font-extrabold">Page not found</div>
        <p className="mt-2 text-sm text-white/70">
          The page you’re looking for doesn’t exist.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
