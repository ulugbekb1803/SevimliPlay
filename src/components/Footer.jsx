import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">🎬 SEVIMLIPLAY</div>
          <p className="footer-desc">
            O'zbekistondagi eng katta kino va serial platformasi. Yangi kinolar, seriallar va trailerlarni bepul tomosha qiling!
          </p>
        </div>
        <div className="footer-col">
          <h4>Navigatsiya</h4>
          <Link to="/">Bosh sahifa</Link>
          <Link to="/movies">Kinolar</Link>
          <Link to="/serials">Seriallar</Link>
          <Link to="/genres">Janrlar</Link>
          <Link to="/search">Qidiruv</Link>
        </div>
        <div className="footer-col">
          <h4>Janrlar</h4>
          <Link to="/genres">Jangari</Link>
          <Link to="/genres">Drama</Link>
          <Link to="/genres">Komediya</Link>
          <Link to="/genres">Triller</Link>
          <Link to="/genres">Romantik</Link>
        </div>
        <div className="footer-col">
          <h4>Tillar</h4>
          <a href="#">🇷🇺 Ruscha</a>
          <a href="#">🇺🇿 O'zbekcha</a>
          <a href="#">🇬🇧 Inglizcha</a>
          <a href="#">🌍 Boshqalar</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2024 SevimliPlay. Barcha huquqlar himoyalangan.</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          Powered by TMDB API 🎬
        </span>
      </div>
    </footer>
  )
}
