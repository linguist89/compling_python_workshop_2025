'use client'

import { useState, useEffect } from 'react'
import { defaultTheme } from '@/app/theme-config'

export default function PersonalizePage() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const savedName = localStorage.getItem('userName')
    if (savedName) {
      setUserName(savedName)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-[#00E6E6] mb-8">
        Personalize Your Experience, {userName}!
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-[#E6FFFF] mb-4">Current Color Scheme</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Colors */}
            <div className="bg-[#112240] rounded-lg p-6 border border-[#00E6E6]/20">
              <h3 className="text-xl font-medium text-[#00E6E6] mb-4">Primary Colors</h3>
              <div className="space-y-4">
                {Object.entries(defaultTheme.primary).map(([name, color]) => (
                  <div key={name} className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg border border-[#00E6E6]/20"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <p className="text-[#E6FFFF]/90 font-medium capitalize">{name}</p>
                      <p className="text-[#E6FFFF]/60 font-mono text-sm">{color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Component Colors */}
            <div className="bg-[#112240] rounded-lg p-6 border border-[#00E6E6]/20">
              <h3 className="text-xl font-medium text-[#00E6E6] mb-4">Component Colors</h3>
              <div className="space-y-6">
                {Object.entries(defaultTheme.components).map(([component, colors]) => (
                  <div key={component}>
                    <h4 className="text-[#E6FFFF]/90 font-medium capitalize mb-2">{component}</h4>
                    <div className="space-y-3 pl-4">
                      {Object.entries(colors).map(([name, color]) => (
                        <div key={name} className="flex items-center space-x-4">
                          <div 
                            className="w-8 h-8 rounded-lg border border-[#00E6E6]/20"
                            style={{ backgroundColor: color.replace(/\d+$/, '') }}
                          />
                          <div>
                            <p className="text-[#E6FFFF]/90 capitalize">{name}</p>
                            <p className="text-[#E6FFFF]/60 font-mono text-sm">{color}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gradients */}
          <div className="mt-6 bg-[#112240] rounded-lg p-6 border border-[#00E6E6]/20">
            <h3 className="text-xl font-medium text-[#00E6E6] mb-4">Gradients</h3>
            <div className="space-y-4">
              {Object.entries(defaultTheme.gradients).map(([name, gradient]) => (
                <div key={name} className="space-y-2">
                  <p className="text-[#E6FFFF]/90 font-medium capitalize">{name}</p>
                  <div 
                    className={`h-16 rounded-lg bg-gradient-to-r ${gradient}`}
                  />
                  <p className="text-[#E6FFFF]/60 font-mono text-sm">{gradient}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#112240] rounded-lg p-6 border border-[#00E6E6]/20">
          <h2 className="text-2xl font-semibold text-[#E6FFFF] mb-4">Theme Customization</h2>
          <p className="text-[#E6FFFF]/70">
            Theme customization feature coming soon! You'll be able to personalize colors and create your own themes.
          </p>
        </section>
      </div>
    </div>
  )
} 