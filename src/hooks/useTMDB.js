import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_BASE = 'https://image.tmdb.org/t/p'

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750/1a1a2e/e94560?text=No+Image'
  return `${IMG_BASE}/${size}${path}`
}

export const useMovies = (endpoint, params = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${BASE_URL}${endpoint}`, {
          params: { api_key: API_KEY, language: 'ru-RU', ...params }
        })
        setData(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [endpoint, JSON.stringify(params)])

  return { data, loading, error }
}

export const fetchMovieDetails = async (id, type = 'movie') => {
  const res = await axios.get(`${BASE_URL}/${type}/${id}`, {
    params: { api_key: API_KEY, language: 'ru-RU', append_to_response: 'videos,credits,similar' }
  })
  return res.data
}

export const searchContent = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/multi`, {
    params: { api_key: API_KEY, language: 'ru-RU', query }
  })
  return res.data.results
}

export { BASE_URL, API_KEY }
