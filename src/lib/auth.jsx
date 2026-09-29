import React, { createContext, useContext, useState } from 'react'

/**
 * Mock authentication layer.
 *
 * This simulates registration/login against localStorage so the flow is
 * fully demoable with no backend. Swap the three functions below for real
 * calls — e.g. Firebase Auth (createUserWithEmailAndPassword / signInWithEmailAndPassword)
 * or a Node/Express endpoint — without touching any component that calls them.
 */

const AuthContext = createContext(null)
const STORAGE_KEY = 'nokless_users'
const SESSION_KEY = 'nokless_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY))
    } catch {
      return null
    }
  })

  async function register({ fullName, businessName, email, phone, state, password }) {
    await new Promise((r) => setTimeout(r, 600)) // simulate network latency
    const users = readUsers()
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.phone === phone
    )
    if (exists) {
      throw new Error('An account with this email or phone number already exists.')
    }
    const newUser = { fullName, businessName, email, phone, state, password }
    writeUsers([...users, newUser])
    const session = { fullName, businessName, email, phone, state }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return session
  }

  async function login({ identifier, password }) {
    await new Promise((r) => setTimeout(r, 600))
    const users = readUsers()
    const match = users.find(
      (u) =>
        (u.email.toLowerCase() === identifier.toLowerCase() || u.phone === identifier) &&
        u.password === password
    )
    if (!match) {
      throw new Error('We could not verify those details. Check and try again.')
    }
    const session = {
      fullName: match.fullName,
      businessName: match.businessName,
      email: match.email,
      phone: match.phone,
      state: match.state,
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return session
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider')
  return ctx
}
