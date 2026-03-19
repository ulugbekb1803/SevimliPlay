import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ onSearch }) {
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setShowUserMenu(false)
  }

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo">🎬 SEVIMLIPLAY</Link>

      <ul className="nav-links">
        <li><Link to="/" className={isActive('/')}>Bosh sahifa</Link></li>
        <li><Link to="/movies" className={isActive('/movies')}>Kinolar</Link></li>
        <li><Link to="/serials" className={isActive('/serials')}>Seriallar</Link></li>
        <li><Link to="/genres" className={isActive('/genres')}>Janrlar</Link></li>
        <li><Link to="/search" className={isActive('/search')}>Qidiruv</Link></li>
      </ul>

      <div className="nav-right">
        <button className="nav-search-btn" onClick={() => navigate('/search')} title="Qidirish">
          🔍
        </button>
        {user ? (
          <div style={{ position: 'relative' }}>
            <div className="nav-user" onClick={() => setShowUserMenu(!showUserMenu)}>
              <img src={user.avatar} alt={user.username} className="nav-avatar" />
              <span className="nav-username">{user.username}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>▼</span>
            </div>
            {showUserMenu && (
              <div style={{
                position: 'absolute', top: '110%', right: 0,
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '8px',
                minWidth: '160px', zIndex: 100,
                boxShadow: 'var(--shadow)',
                animation: 'fadeIn 0.2s ease'
              }}>
                <div style={{ padding: '8px 12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {user.email}
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '4px 0' }} />
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    color: 'var(--accent)', padding: '8px 12px', borderRadius: '8px',
                    cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                    textAlign: 'left', transition: 'var(--transition)'
                  }}
                  onMouseEnter={e => e.target.style.background = 'rgba(230,57,70,0.1)'}
                  onMouseLeave={e => e.target.style.background = 'none'}
                >
                  🚪 Chiqish
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="nav-login-btn" onClick={() => navigate('/auth')}>
            Kirish
          </button>
        )}
      </div>
    </nav>
  )
}
