'use client'

import { useState } from 'react'
import Flag from 'react-world-flags'

// List of countries with their names and codes
const countryList = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'PT', name: 'Portugal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'IE', name: 'Ireland' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'GR', name: 'Greece' },
  { code: 'RU', name: 'Russia' },
  { code: 'CN', name: 'China' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'AR', name: 'Argentina' },
  { code: 'ZA', name: 'South Africa' },
  // Add more countries as needed
].sort((a, b) => a.name.localeCompare(b.name))

export default function CountrySelector({ onSelect, selectedCountry }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (country) => {
    onSelect(country)
    setIsOpen(false)
  }

  return (
    <div className="w-full">
      <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
        Select Your Country
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 rounded-lg text-left flex items-center gap-2"
          style={{
            backgroundColor: 'var(--card-background)',
            color: 'var(--text-primary)',
            border: '1px solid var(--card-border)'
          }}
        >
          {selectedCountry ? (
            <>
              <div className="w-6 h-4 relative overflow-hidden">
                <Flag code={selectedCountry.code} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <span>{selectedCountry.name}</span>
            </>
          ) : (
            <span>Select a country</span>
          )}
          <svg 
            className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div 
            className="absolute z-10 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-auto"
            style={{
              backgroundColor: 'var(--card-background)',
              border: '1px solid var(--card-border)'
            }}
          >
            {countryList.map((country) => (
              <button
                key={country.code}
                onClick={() => handleSelect(country)}
                className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-opacity-10 hover:bg-white"
                style={{ color: 'var(--text-primary)' }}
              >
                <div className="w-6 h-4 relative overflow-hidden">
                  <Flag code={country.code} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 