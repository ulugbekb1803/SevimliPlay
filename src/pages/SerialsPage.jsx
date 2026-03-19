import React, { useState } from 'react'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import { useMovies } from '../hooks/useTMDB'

const FILTERS = [
  { label: 'Mashhur', value: '/tv/popular' },
  { label: 'Top baholangan', value: '/tv/top_rated' },
  { label: 'Bugun efirda', value: '/tv/airing_today' },
  { label: 'Hozir efirda', value: '/tv/on_the_air' },
  { label: '🇷🇺 Rus', params: { with_original_language: 'ru' } },
  { label: 'Drama', params: { with_genres: '18' } },
  { label: 'Komediya', params: { with_genres: '35' } },
  { label: 'Jangovar', params: { with_genres: '10759' } },
  { label: 'Detektiv', params: { with_genres: '80' } },
  { label: 'Animatsiya', params: { with_genres: '16' } },
]

export default function SerialsPage() {
  const [activeFilter, setActiveFilter] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [page, setPage] = useState(1)

  const filter = FILTERS[activeFilter]
  const endpoint = filter.value || '/discover/tv'
  const extraParams = filter.params || {}

  const { data, loading } = useMovies(endpoint, { sort_by: 'popularity.desc', page, ...extraParams })

  const handleFilterChange = (i) => {
    setActiveFilter(i)
    setPage(1)
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">📺 SERIALLAR</h1>
      </div>

      <div className="filter-tabs">
        {FILTERS.map((f, i) => (
          <button
            key={i}
            className={`filter-tab ${activeFilter === i ? 'active' : ''}`}
            onClick={() => handleFilterChange(i)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="movies-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="card-skeleton">
              <div className="skeleton skeleton-img" style={{ aspectRatio: '2/3', borderRadius: 'var(--radius)' }} />
              <div className="skeleton skeleton-text" style={{ height: 12, margin: '8px', borderRadius: 4 }} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="movies-grid">
            {data?.results?.map(m => (
              <MovieCard key={m.id} item={{ ...m, media_type: 'tv' }} onPlay={setSelectedMovie} badge="SERIAL" />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
            <button
              className="filter-tab"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{ opacity: page === 1 ? 0.4 : 1 }}
            >
              ← Oldingi
            </button>
            <span style={{ padding: '8px 20px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {page} / {data?.total_pages > 500 ? 500 : data?.total_pages}
            </span>
            <button className="filter-tab" onClick={() => setPage(p => p + 1)}>
              Keyingi →
            </button>
          </div>
        </>
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
