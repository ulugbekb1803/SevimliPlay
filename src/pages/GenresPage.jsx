import React, { useState } from 'react'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import { useMovies } from '../hooks/useTMDB'

const MOVIE_GENRES = [
  { id: 28, name: 'Jangari', emoji: '💥' },
  { id: 12, name: 'Sarguzasht', emoji: '🗺️' },
  { id: 16, name: 'Animatsiya', emoji: '🎨' },
  { id: 35, name: 'Komediya', emoji: '😂' },
  { id: 80, name: 'Jinoyat', emoji: '🔫' },
  { id: 99, name: 'Hujjatli', emoji: '📽️' },
  { id: 18, name: 'Drama', emoji: '🎭' },
  { id: 10751, name: 'Oilaviy', emoji: '👨‍👩‍👧' },
  { id: 14, name: 'Fantastik', emoji: '🧙' },
  { id: 36, name: 'Tarixiy', emoji: '⚔️' },
  { id: 27, name: 'Qo\'rqinchli', emoji: '👻' },
  { id: 10402, name: 'Musiqa', emoji: '🎵' },
  { id: 9648, name: 'Sirli', emoji: '🔍' },
  { id: 10749, name: 'Romantik', emoji: '💕' },
  { id: 878, name: 'Ilmiy-fantastik', emoji: '🚀' },
  { id: 53, name: 'Triller', emoji: '😱' },
  { id: 10752, name: 'Harbiy', emoji: '🪖' },
  { id: 37, name: 'G\'arb', emoji: '🤠' },
]

function GenreMovies({ genreId, onPlay }) {
  const { data, loading } = useMovies('/discover/movie', {
    with_genres: genreId,
    sort_by: 'popularity.desc'
  })

  if (loading) {
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card-skeleton" style={{ flex: '0 0 180px' }}>
            <div className="skeleton skeleton-img" style={{ aspectRatio: '2/3', borderRadius: 'var(--radius)' }} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="movies-row">
      {data?.results?.map(m => (
        <MovieCard key={m.id} item={m} onPlay={onPlay} />
      ))}
    </div>
  )
}

export default function GenresPage() {
  const [activeGenre, setActiveGenre] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [type, setType] = useState('movie')

  return (
    <div className="genres-page">
      <div className="search-header">
        <h1 className="search-title">🎭 JANRLAR</h1>
      </div>

      <div className="filter-tabs" style={{ marginBottom: '24px' }}>
        <button className={`filter-tab ${type === 'movie' ? 'active' : ''}`} onClick={() => setType('movie')}>
          🎬 Kinolar
        </button>
        <button className={`filter-tab ${type === 'tv' ? 'active' : ''}`} onClick={() => setType('tv')}>
          📺 Seriallar
        </button>
      </div>

      <div className="genres-grid">
        {MOVIE_GENRES.map(g => (
          <div
            key={g.id}
            className={`genre-card ${activeGenre === g.id ? 'active' : ''}`}
            onClick={() => setActiveGenre(activeGenre === g.id ? null : g.id)}
          >
            <div className="genre-emoji">{g.emoji}</div>
            <div className="genre-name">{g.name}</div>
          </div>
        ))}
      </div>

      {activeGenre && (
        <div style={{ marginTop: '40px' }}>
          <h2 className="section-title" style={{ marginBottom: '20px', paddingLeft: '14px' }}>
            {MOVIE_GENRES.find(g => g.id === activeGenre)?.emoji}{' '}
            {MOVIE_GENRES.find(g => g.id === activeGenre)?.name}
          </h2>
          <GenreMovies genreId={activeGenre} onPlay={setSelectedMovie} />
        </div>
      )}

      {!activeGenre && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          color: 'var(--text-muted)', marginTop: '20px'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>👆</div>
          <p>Janr tanlang va kinolarni ko'ring</p>
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          item={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlay={setSelectedMovie}
        />
      )}
    </div>
  )
}
