import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('sevimliplay_user')
    if (savedUser) setUser(JSON.parse(savedUser))
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('sevimliplay_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sevimliplay_user')
  }

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('sevimliplay_users') || '[]')
    const exists = users.find(u => u.email === userData.email)
    if (exists) return { error: 'Bu email allaqachon ro\'yxatdan o\'tgan!' }
    const newUser = { ...userData, id: Date.now(), avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}` }
    users.push(newUser)
    localStorage.setItem('sevimliplay_users', JSON.stringify(users))
    login(newUser)
    return { success: true }
  }

  const loginWithCredentials = (email, password) => {
    const users = JSON.parse(localStorage.getItem('sevimliplay_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { error: 'Email yoki parol noto\'g\'ri!' }
    login(found)
    return { success: true }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loginWithCredentials, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
