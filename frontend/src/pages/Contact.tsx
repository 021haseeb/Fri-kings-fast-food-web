import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useMemo, useState } from 'react'

import { api } from '../lib/api'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!form.name.trim()) errors.name = 'Name is required'

  const email = form.email.trim()
  if (!email) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email'

  const phone = form.phone.trim()
  if (!phone) errors.phone = 'Phone is required'

  if (form.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters'

  return errors
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2 text-sm">
      <div className="font-semibold text-white/80">{label}</div>
      {children}
      {error ? <div className="text-xs text-friking-yellow">{error}</div> : null}
    </label>
  )
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>(
    {},
  )
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<
    | { type: 'idle' }
    | { type: 'ok'; message: string }
    | { type: 'err'; message: string }
  >({ type: 'idle' })

  const errors = useMemo(() => validate(form), [form])
  const show = (k: keyof FormState) => touched[k] && errors[k]

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, message: true })

    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setStatus({ type: 'idle' })
    try {
      await api.post('/api/contacts', form)
      setStatus({ type: 'ok', message: 'Message sent. We’ll reply soon!' })
      setForm({ name: '', email: '', phone: '', message: '' })
      setTouched({})
    } catch (err) {
      setStatus({
        type: 'err',
        message:
          'Could not send message. Make sure the backend is running and try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page pb-16 pt-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">Contact FriKing</h1>
          <p className="mt-3 text-sm text-white/70 md:text-base">
            Questions, feedback, franchise ideas? Send a message.
          </p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className="mt-10 rounded-3xl border border-white/10 bg-friking-charcoal/30 p-6 shadow-glow md:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" error={show('name') ?? undefined}>
              <input
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-friking-yellow"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Your name"
              />
            </Field>

            <Field label="Email" error={show('email') ?? undefined}>
              <input
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-friking-yellow"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Phone" error={show('phone') ?? undefined}>
              <input
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-friking-yellow"
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                placeholder="+92 3xx xxxxxxx"
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="Message" error={show('message') ?? undefined}>
                <textarea
                  className="min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-friking-yellow"
                  value={form.message}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, message: e.target.value }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  placeholder="Tell us what you need..."
                />
              </Field>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="text-sm">
              {status.type === 'ok' ? (
                <span className="text-friking-yellow">{status.message}</span>
              ) : status.type === 'err' ? (
                <span className="text-red-300">{status.message}</span>
              ) : (
                <span className="text-white/60">We usually reply within 24h.</span>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              <Send className="mr-2 h-4 w-4" />
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </motion.form>

        <div className="mt-6 text-center text-xs text-white/50">
          Backend endpoint expected: <code>/api/contacts</code>. Configure base URL
          via <code>VITE_API_BASE_URL</code>.
        </div>
      </div>
    </div>
  )
}
