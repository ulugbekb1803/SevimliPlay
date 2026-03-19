import React from 'react'
import MovieCard from './MovieCard'

const SkeletonCard = () => (
  <div className="card-skeleton">
    <div className="skeleton skeleton-img" />
    <div className="skeleton skeleton-text" />
    <div className="skeleton skeleton-text-sm" />
  </div>
)

export default function MovieRow({ title, movies, loading, onPlay, badge, onSeeAll }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {onSeeAll && (
          <button className="see-all-btn" onClick={onSeeAll}>
            Barchasi →
          </button>
        )}
      </div>
      <div className="movies-row">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : movies?.map(m => (
            <MovieCard
              key={m.id}
              item={m}
              onPlay={onPlay}
              badge={badge}
            />
          ))
        }
      </div>
    </section>
  )
}
