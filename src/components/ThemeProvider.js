'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { themes } from '@/app/theme-config'

const ThemeContext = createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(themes.neon)

  const applyTheme = (theme) => {
    const root = document.documentElement

    // Primary colors
    Object.entries(theme.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Text colors
    Object.entries(theme.text).forEach(([key, value]) => {
      root.style.setProperty(`--text-${key}`, value)
    })

    // Interactive colors
    Object.entries(theme.interactive).forEach(([key, value]) => {
      root.style.setProperty(`--interactive-${key}`, value)
    })

    // Component colors
    Object.entries(theme.components).forEach(([component, colors]) => {
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--${component}-${key}`, value)
      })
    })

    // Gradients
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value)
    })

    // Effects
    Object.entries(theme.effects).forEach(([key, value]) => {
      root.style.setProperty(`--effect-${key}`, value)
    })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('userTheme') || 'neon'
    const theme = themes[savedTheme]
    setCurrentTheme(theme)
    applyTheme(theme)
  }, [])

  const updateTheme = (themeKey) => {
    const theme = themes[themeKey]
    setCurrentTheme(theme)
    applyTheme(theme)
    localStorage.setItem('userTheme', themeKey)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, themes, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
} 