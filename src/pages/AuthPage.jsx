import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginWithCredentials, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (tab === 'login') {
      if (!form.email || !form.password) { setError('Email va parolni kiriting!'); setLoading(false); return }
      const res = loginWithCredentials(form.email, form.password)
      if (res.error) { setError(res.error); setLoading(false); return }
    } else {
      if (!form.username || !form.email || !form.password) { setError('Barcha maydonlarni to\'ldiring!'); setLoading(false); return }
      if (form.password.length < 6) { setError('Parol kamida 6 ta belgidan iborat bo\'lsin!'); setLoading(false); return }
      const res = register(form)
      if (res.error) { setError(res.error); setLoading(false); return }
    }

    setTimeout(() => { setLoading(false); navigate('/') }, 500)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-overlay" />

      {/* Animated particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            borderRadius: '50%',
            background: 'rgba(230,57,70,0.4)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pulse-glow ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`
          }} />
        ))}
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <span>🎬 SEVIMLIPLAY</span>
          </div>
          <p className="auth-subtitle">
            {tab === 'login' ? 'Hisobingizga kiring' : 'Yangi hisob yarating'}
          </p>

          <div className="auth-tabs">
            <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError('') }}>
              Kirish
            </button>
            <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError('') }}>
              Ro'yxatdan o'tish
            </button>
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {tab === 'register' && (
              <div className="form-group">
                <label>👤 Foydalanuvchi nomi</label>
                <input
                  type="text"
                  name="username"
                  placeholder="ismingiz"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            )}
            <div className="form-group">
              <label>📧 Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@misol.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label>🔒 Parol</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? '⏳ Yuklanmoqda...' : tab === 'login' ? '🚀 Kirish' : '✨ Ro\'yxatdan o\'tish'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '20px' }}>
            {tab === 'login' ? 'Hisob yo\'qmi? ' : 'Hisob bormi? '}
            <button
              onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setError('') }}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              {tab === 'login' ? 'Ro\'yxatdan o\'ting' : 'Kiring'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
