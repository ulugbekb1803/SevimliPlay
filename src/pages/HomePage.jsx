import React, { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import MovieModal from '../components/MovieModal'
import { useMovies } from '../hooks/useTMDB'

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [heroMovie, setHeroMovie] = useState(null)

  const { data: trending, loading: l1 } = useMovies('/trending/all/week')
  const { data: popularMovies, loading: l2 } = useMovies('/movie/popular')
  const { data: popularTV, loading: l3 } = useMovies('/tv/popular')
  const { data: topRated, loading: l4 } = useMovies('/movie/top_rated')
  const { data: topTV, loading: l5 } = useMovies('/tv/top_rated')
  const { data: nowPlaying, loading: l6 } = useMovies('/movie/now_playing')
  const { data: upcoming, loading: l7 } = useMovies('/movie/upcoming')
  const { data: airingToday, loading: l8 } = useMovies('/tv/airing_today')
  const { data: russianMovies, loading: l9 } = useMovies('/discover/movie', { with_original_language: 'ru', sort_by: 'popularity.desc' })
  const { data: russianTV, loading: l10 } = useMovies('/discover/tv', { with_original_language: 'ru', sort_by: 'popularity.desc' })
  const { data: actionMovies, loading: l11 } = useMovies('/discover/movie', { with_genres: '28', sort_by: 'popularity.desc' })
  const { data: comedyMovies, loading: l12 } = useMovies('/discover/movie', { with_genres: '35', sort_by: 'popularity.desc' })

  const heroItems = trending?.results?.slice(0, 6) || []

  const handlePlay = (movie) => setSelectedMovie(movie)
  const handleInfo = (movie) => setSelectedMovie(movie)

  return (
    <div className="home-page">
      <HeroBanner
        movies={heroItems}
        onPlay={handlePlay}
        onInfo={handleInfo}
      />

      <MovieRow
        title="🔥 Trendda"
        movies={trending?.results}
        loading={l1}
        onPlay={handlePlay}
        badge="TREND"
      />

      <MovieRow
        title="🎬 Mashhur kinolar"
        movies={popularMovies?.results}
        loading={l2}
        onPlay={handlePlay}
      />

      <MovieRow
        title="📺 Mashhur seriallar"
        movies={popularTV?.results}
        loading={l3}
        onPlay={handlePlay}
        badge="SERIAL"
      />

      {/* Promo Banner */}
      <div style={{
        margin: '0 40px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(230,57,70,0.2), rgba(247,127,0,0.2))',
        border: '1px solid rgba(230,57,70,0.3)',
        padding: '32px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '8px' }}>
            🎬 4K SIFATDA TOMOSHA QILING
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>Eng yangi kinolar va seriallar bitta joyda. Bepul!</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '2rem' }}>
          <span title="4K">🎥</span>
          <span title="Trailerlar">🎞️</span>
          <span title="Seriallar">📺</span>
          <span title="Kinolar">🍿</span>
        </div>
      </div>

      <MovieRow
        title="⭐ Eng yuqori baholangan kinolar"
        movies={topRated?.results}
        loading={l4}
        onPlay={handlePlay}
        badge="TOP"
      />

      <MovieRow
        title="⭐ Eng yaxshi seriallar"
        movies={topTV?.results}
        loading={l5}
        onPlay={handlePlay}
        badge="TOP"
      />

      <MovieRow
        title="🇷🇺 Rus kinolari"
        movies={russianMovies?.results}
        loading={l9}
        onPlay={handlePlay}
        badge="RU"
      />

      <MovieRow
        title="🇷🇺 Rus seriallari"
        movies={russianTV?.results}
        loading={l10}
        onPlay={handlePlay}
        badge="RU"
      />

      <MovieRow
        title="🆕 Yangi kinolar"
        movies={nowPlaying?.results}
        loading={l6}
        onPlay={handlePlay}
        badge="YANGI"
      />

      <MovieRow
        title="📅 Tez kunda"
        movies={upcoming?.results}
        loading={l7}
        onPlay={handlePlay}
        badge="BREVE"
      />

      <MovieRow
        title="📡 Bugun efirda"
        movies={airingToday?.results}
        loading={l8}
        onPlay={handlePlay}
      />

      <MovieRow
        title="💥 Jangari kinolar"
        movies={actionMovies?.results}
        loading={l11}
        onPlay={handlePlay}
      />

      <MovieRow
        title="😂 Komediya"
        movies={comedyMovies?.results}
        loading={l12}
        onPlay={handlePlay}
      />

      {selectedMovie && (
        <MovieModal
          item={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onPlay={handlePlay}
        />
      )}
    </div>
  )
}
