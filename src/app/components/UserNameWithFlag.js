'use client'

import { useState, useEffect } from 'react'
import Flag from 'react-world-flags'

export default function UserNameWithFlag({ className = '' }) {
  const [userName, setUserName] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    const savedData = localStorage.getItem('userDataPythonWorkshop')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      if (parsedData.userName) {
        setUserName(parsedData.userName)
      }
      if (parsedData.userCountry) {
        setSelectedCountry(parsedData.userCountry)
      }
    }
  }, [])

  if (!userName) return null

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span>{userName}</span>
      {selectedCountry && (
        <span className="w-6 h-4 relative overflow-hidden inline-block">
          <Flag 
            code={selectedCountry.code} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </span>
      )}
    </span>
  )
} 