import React, { useState, useEffect, useCallback } from 'react'
import MovieCard from '../components/MovieCard'
import MovieModal from '../components/MovieModal'
import { searchContent } from '../hooks/useTMDB'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [filter, setFilter] = useState('all')

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const data = await searchContent(q)
      setResults(data.filter(r => r.media_type !== 'person' && (r.poster_path || r.backdrop_path)))
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 500)
    return () => clearTimeout(timer)
  }, [query, doSearch])

  const filtered = filter === 'all' ? results
    : filter === 'movie' ? results.filter(r => r.media_type === 'movie' || r.title)
    : results.filter(r => r.media_type === 'tv' || r.name)

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">🔍 QIDIRUV</h1>
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Kino yoki serial nomini kiriting..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        {results.length > 0 && (
          <p className="search-results-count">
            {filtered.length} ta natija topildi "{query}" uchun
          </p>
        )}
      </div>

      {query && (
        <div className="filter-tabs">
          <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            Hammasi
          </button>
          <button className={`filter-tab ${filter === 'movie' ? 'active' : ''}`} onClick={() => setFilter('movie')}>
            🎬 Kinolar
          </button>
          <button className={`filter-tab ${filter === 'tv' ? 'active' : ''}`} onClick={() => setFilter('tv')}>
            📺 Seriallar
          </button>
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px', animation: 'pulse-glow 1s infinite' }}>🔍</div>
          <div>Qidirilmoqda...</div>
        </div>
      )}

      {!loading && query && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>😔</div>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Hech narsa topilmadi</h3>
          <p>"{query}" bo'yicha natija yo'q. Boshqa kalit so'z kiriting.</p>
        </div>
      )}

      {!loading && !query && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎬</div>
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '2px' }}>
            KINO QIDIRING
          </h3>
          <p>Kino yoki serial nomini yuqoriga yozing</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="movies-grid">
          {filtered.map(m => (
            <MovieCard key={`${m.id}-${m.media_type}`} item={m} onPlay={setSelectedMovie} />
          ))}
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
