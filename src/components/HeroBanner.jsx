import React, { useState, useEffect } from 'react'
import { getImageUrl } from '../hooks/useTMDB'

export default function HeroBanner({ movies, onPlay, onInfo }) {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const items = movies?.slice(0, 6) || []

  useEffect(() => {
    if (items.length === 0) return
    const timer = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrent(c => (c + 1) % items.length)
        setTransitioning(false)
      }, 400)
    }, 6000)
    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) {
    return (
      <div className="hero" style={{ background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎬</div>
          <div>Yuklanmoqda...</div>
        </div>
      </div>
    )
  }

  const movie = items[current]
  const title = movie.title || movie.name
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4)
  const rating = movie.vote_average?.toFixed(1)

  const goTo = (i) => {
    if (i === current) return
    setTransitioning(true)
    setTimeout(() => { setCurrent(i); setTransitioning(false) }, 300)
  }

  return (
    <div className="hero">
      <div
        className="hero-backdrop"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.4s ease'
        }}
      />
      <div className="hero-gradient" />

      <div className="hero-content" style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.4s ease' }}>
        <div className="hero-badge">
          {movie.media_type === 'tv' || movie.name ? '📺 SERIAL' : '🎬 KINO'}
        </div>
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta">
          {rating && <span className="hero-rating">⭐ {rating}</span>}
          {rating && <span className="hero-dot">•</span>}
          {year && <span className="hero-year">{year}</span>}
          {movie.vote_count && (
            <>
              <span className="hero-dot">•</span>
              <span className="hero-genres">{movie.vote_count.toLocaleString()} ovoz</span>
            </>
          )}
        </div>
        <p className="hero-desc">
          {movie.overview || 'Ajoyib kino sizni kutmoqda. Ko\'rish uchun bosing!'}
        </p>
        <div className="hero-buttons">
          <button className="btn-play" onClick={() => onPlay(movie)}>
            ▶ Ko'rish
          </button>
          <button className="btn-info" onClick={() => onInfo(movie)}>
            ℹ️ Batafsil
          </button>
        </div>
      </div>

      <div className="hero-indicators">
        {items.map((_, i) => (
          <button
            key={i}
            className={`hero-dot-btn ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
