'use client'

import { useState, useEffect } from 'react'
import CountrySelector from '@/app/components/CountrySelector'
import Flag from 'react-world-flags'
import FlagRain from '@/app/components/FlagRain'
import { db } from '@/lib/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = 'pythonWorkshop2025' // You should move this to an environment variable

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [showFlagRain, setShowFlagRain] = useState(false)
  const [mode, setMode] = useState('choice') // 'choice', 'register', or 'login'
  const [error, setError] = useState('')

  useEffect(() => {
    const savedData = localStorage.getItem('userDataPythonWorkshop')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      if (parsedData.userName) {
        setName(parsedData.userName)
      }
      if (parsedData.userCountry) {
        setSelectedCountry(parsedData.userCountry)
      }
    }
    
    if (!savedData || !JSON.parse(savedData)?.userName) {
      setIsOpen(true)
    }
  }, [])

  const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString()
  }

  const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (name.trim() && password && selectedCountry) {
      try {
        // Check if user already exists
        const userDoc = await getDoc(doc(db, 'users', name.trim()))
        if (userDoc.exists()) {
          setError('Username already exists. Please choose another name.')
          return
        }

        const userData = {
          userName: name.trim(),
          encryptedPassword: encryptPassword(password),
          userCountry: selectedCountry,
          fontSize: 16,
          user_type: 'student'
        }

        // Save to Firestore
        await setDoc(doc(db, 'users', name.trim()), userData)

        // Save minimal data to localStorage
        const localData = {
          userName: name.trim(),
          fontSize: 16,
          userCountry: selectedCountry,
          user_type: 'student'
        }
        localStorage.setItem('userDataPythonWorkshop', JSON.stringify(localData))
        
        setShowFlagRain(true)
        setTimeout(() => {
          setIsOpen(false)
        }, 4000)
      } catch (error) {
        console.error('Error registering:', error)
        setError('Registration failed. Please try again.')
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (name.trim() && password) {
      try {
        const userDoc = await getDoc(doc(db, 'users', name.trim()))
        if (!userDoc.exists()) {
          setError('User not found.')
          return
        }

        const userData = userDoc.data()
        const decryptedPassword = decryptPassword(userData.encryptedPassword)
        
        if (password !== decryptedPassword) {
          setError('Incorrect password.')
          return
        }

        // Save minimal data to localStorage
        const localData = {
          userName: name.trim(),
          fontSize: userData.fontSize || 16,
          userCountry: userData.userCountry,
          user_type: userData.user_type || 'student'
        }
        localStorage.setItem('userDataPythonWorkshop', JSON.stringify(localData))
        
        setShowFlagRain(true)
        setTimeout(() => {
          setIsOpen(false)
        }, 4000)
      } catch (error) {
        console.error('Error logging in:', error)
        setError('Login failed. Please try again.')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-dark)80' }}>
      {showFlagRain && selectedCountry && (
        <FlagRain
          countryCode={selectedCountry.code}
          onAnimationComplete={() => setShowFlagRain(false)}
        />
      )}
      <div 
        className="rounded-lg p-8 max-w-md w-full mx-4 border transition-all duration-300"
        style={{ 
          backgroundColor: 'var(--card-background)',
          borderColor: 'var(--card-border)',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <h2 
          className="text-2xl font-bold mb-4 flex items-center gap-3"
          style={{
            background: 'linear-gradient(to right, var(--text-accent), var(--color-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Welcome to PyCL Workshop!
          {selectedCountry && mode === 'register' && (
            <Flag code={selectedCountry.code} className="w-6 h-6 rounded shadow-sm" />
          )}
        </h2>

        {mode === 'choice' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('register')}
              className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: 'var(--text-accent)',
                color: 'var(--color-dark)'
              }}
            >
              First time here?
            </button>
            <button
              onClick={() => setMode('login')}
              className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-background)',
                borderColor: 'var(--text-accent)',
                color: 'var(--text-accent)',
                border: '1px solid'
              }}
            >
              Back to learn more?
            </button>
          </div>
        )}

        {(mode === 'register' || mode === 'login') && (
          <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-6">
            <div>
              <label 
                className="block mb-2 font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--card-background)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--card-border)'
                }}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label 
                className="block mb-2 font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--card-background)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--card-border)'
                }}
                placeholder="Enter your password"
                required
              />
            </div>

            {mode === 'register' && (
              <div>
                <label 
                  className="block mb-2 font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Your Country
                </label>
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onSelect={setSelectedCountry}
                />
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor: 'var(--text-accent)',
                  color: 'var(--color-dark)',
                  opacity: name.trim() && password && (mode === 'login' || selectedCountry) ? 1 : 0.7,
                  cursor: name.trim() && password && (mode === 'login' || selectedCountry) ? 'pointer' : 'not-allowed'
                }}
                disabled={!name.trim() || !password || (mode === 'register' && !selectedCountry)}
              >
                {mode === 'register' ? 'Register' : 'Login'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('choice')
                  setError('')
                  setPassword('')
                }}
                className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300"
                style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--text-accent)',
                  color: 'var(--text-accent)',
                  border: '1px solid'
                }}
              >
                Back to Options
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 