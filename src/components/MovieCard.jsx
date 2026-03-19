import React from 'react'
import { getImageUrl } from '../hooks/useTMDB'

export default function MovieCard({ item, onPlay, badge }) {
  if (!item) return null
  const title = item.title || item.name || 'Nomsiz'
  const year = (item.release_date || item.first_air_date || '').slice(0, 4)
  const rating = item.vote_average?.toFixed(1) || '?'
  const poster = getImageUrl(item.poster_path, 'w342')
  const type = item.media_type || (item.title ? 'movie' : 'tv')

  return (
    <div className="movie-card" onClick={() => onPlay && onPlay(item)}>
      {badge && <div className="card-badge">{badge}</div>}
      <img
        src={poster}
        alt={title}
        className="card-poster"
        loading="lazy"
        onError={e => {
          e.target.src = `https://via.placeholder.com/342x513/1a1a28/e94560?text=${encodeURIComponent(title)}`
        }}
      />
      <div className="card-overlay">
        <button className="card-play" onClick={e => { e.stopPropagation(); onPlay && onPlay(item) }}>
          ▶
        </button>
        <div className="card-title">{title}</div>
        <div className="card-meta">
          <span className="card-rating">⭐ {rating}</span>
          <span>{year}</span>
          <span style={{ 
            fontSize: '0.65rem', 
            background: type === 'movie' ? 'rgba(230,57,70,0.3)' : 'rgba(247,127,0,0.3)',
            padding: '2px 6px', borderRadius: '3px',
            color: type === 'movie' ? 'var(--accent)' : 'var(--accent-2)'
          }}>
            {type === 'movie' ? 'KINO' : 'SERIAL'}
          </span>
        </div>
      </div>
      <div className="card-info">
        <div className="card-info-title">{title}</div>
        <div className="card-info-meta">
          <span style={{ color: 'var(--gold)' }}>⭐ {rating}</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  )
}
