import React, { useState, useEffect } from 'react'
import { fetchMovieDetails, getImageUrl } from '../hooks/useTMDB'
import MovieCard from './MovieCard'

export default function MovieModal({ item, onClose, onPlay }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!item) return
    const type = item.media_type || (item.title ? 'movie' : 'tv')
    setLoading(true)
    fetchMovieDetails(item.id, type)
      .then(d => { setDetails(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [item])

  if (!item) return null

  const title = item.title || item.name || 'Nomsiz'
  const overview = details?.overview || item.overview || 'Ma\'lumot mavjud emas'
  const rating = item.vote_average?.toFixed(1) || '?'
  const year = (item.release_date || item.first_air_date || '').slice(0, 4)
  const genres = details?.genres?.map(g => g.name).join(', ') || ''
  const runtime = details?.runtime ? `${details.runtime} daq` : (details?.episode_run_time?.[0] ? `${details.episode_run_time[0]} daq/qism` : '')

  // Find best trailer
  const videos = details?.videos?.results || []
  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    || videos.find(v => v.site === 'YouTube')
    || null

  const cast = details?.credits?.cast?.slice(0, 10) || []
  const similar = details?.similar?.results?.slice(0, 8) || []

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        {/* Close button */}
        <button className="modal-close" onClick={onClose} style={{ position: 'sticky', top: 20, float: 'right', zIndex: 10 }}>✕</button>

        {/* Video Player */}
        <div className="video-container">
          {trailer ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="no-trailer">
              <img
                src={getImageUrl(item.backdrop_path || item.poster_path, 'w780')}
                alt={title}
                className="no-trailer-img"
              />
              <div className="no-trailer-text">
                <h3>🎬 Trailer mavjud emas</h3>
                <p style={{ fontSize: '0.9rem' }}>Kino haqida ma'lumot quyida</p>
              </div>
            </div>
          )}
        </div>

        {/* Movie Info */}
        <div className="modal-info">
          <h2 className="modal-title">{title}</h2>

          <div className="modal-meta">
            <span className="meta-tag rating">⭐ {rating} / 10</span>
            {year && <span className="meta-tag">{year}</span>}
            {runtime && <span className="meta-tag">⏱ {runtime}</span>}
            {details?.status && <span className="meta-tag">{details.status}</span>}
            {details?.original_language && (
              <span className="meta-tag">
                {details.original_language === 'ru' ? '🇷🇺 Rus' :
                  details.original_language === 'uz' ? '🇺🇿 O\'zbek' :
                  details.original_language === 'en' ? '🇬🇧 Ingliz' : 
                  details.original_language.toUpperCase()}
              </span>
            )}
            {details?.genres?.map(g => (
              <span key={g.id} className="meta-tag genre">{g.name}</span>
            ))}
          </div>

          <p className="modal-overview">{overview}</p>

          {/* Cast */}
          {cast.length > 0 && (
            <div className="modal-cast">
              <h4>👥 Aktyorlar</h4>
              <div className="cast-list">
                {cast.map(actor => (
                  <div key={actor.id} className="cast-item">
                    <img
                      src={actor.profile_path
                        ? getImageUrl(actor.profile_path, 'w185')
                        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${actor.name}`}
                      alt={actor.name}
                      className="cast-avatar"
                    />
                    <div className="cast-name">{actor.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Similar */}
          {similar.length > 0 && (
            <div className="similar-section">
              <h4>🎯 O'xshash kinolar</h4>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {similar.map(m => (
                  <MovieCard key={m.id} item={m} onPlay={onPlay} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
