import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import SerialsPage from './pages/SerialsPage'
import SearchPage from './pages/SearchPage'
import GenresPage from './pages/GenresPage'
import AuthPage from './pages/AuthPage'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-logo">🎬 SEVIMLIPLAY</div>
      </div>
    )
  }
  if (!user) return <Navigate to="/auth" replace />
  return children
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppLayout() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-logo">🎬 SEVIMLIPLAY</div>
      </div>
    )
  }

  return (
    <>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main style={{ paddingTop: isAuthPage ? 0 : 'var(--nav-height)' }}>
        <Routes>
          <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
          <Route path="/serials" element={<ProtectedRoute><SerialsPage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
          <Route path="/genres" element={<ProtectedRoute><GenresPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAuthPage && user && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  )
}
