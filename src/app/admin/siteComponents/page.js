'use client';
import Navbar from '@/app/components/Navbar';
import WelcomePopup from '@/app/components/WelcomePopup';
import FlagRain from '@/app/components/FlagRain';
import LaptopPopup from '@/app/components/LaptopPopup';
import Celebration from '@/app/components/Celebration';
import UserSettings from '@/app/components/UserSettings';
import UserNameWithFlag from '@/app/components/UserNameWithFlag';
import Laptop from '@/app/components/Laptop';
import Footer from '@/app/components/Footer';
import Welcome from '@/app/components/Welcome';
import CountrySelector from '@/app/components/CountrySelector';
import ProgressBar from '@/app/components/ProgressBar';
import { useState, useCallback } from 'react';

function DesignLevelToggle({ levels, activeLevel, onToggle }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onToggle(level)}
          style={{
            backgroundColor: activeLevel === level ? 'var(--interactive-hover)' : 'var(--card-background)',
            color: activeLevel === level ? 'var(--text-inverse)' : 'var(--text-secondary)',
            borderColor: 'var(--card-border)',
            boxShadow: activeLevel === level ? 'var(--effect-buttonHover)' : 'none'
          }}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border hover:bg-opacity-90`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}

function ComponentSection({ title, children, description }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-background)',
      borderColor: 'var(--card-border)',
      border: '1px solid',
      boxShadow: 'var(--card-shadow)'
    }} className="rounded-lg p-6 mb-8">
      <h2 style={{ color: 'var(--text-accent)' }} className="text-2xl font-bold mb-2">{title}</h2>
      <p style={{ color: 'var(--text-secondary)' }} className="mb-4">{description}</p>
      <div style={{
        backgroundColor: 'var(--color-background)',
        borderColor: 'var(--card-border)',
        border: '1px solid',
        boxShadow: 'var(--card-shadow)'
      }} className="p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
}

function ComponentCard({ title, type, dependencies, description, children }) {
  const getTypeStyles = (type) => {
    switch(type) {
      case 'Organism':
        return { 
          backgroundColor: 'var(--color-purple)',
          color: 'var(--text-inverse)',
          border: '1px solid var(--color-purple-border)'
        };
      case 'Molecule':
        return { 
          backgroundColor: 'var(--color-blue)',
          color: 'var(--text-inverse)',
          border: '1px solid var(--color-blue-border)'
        };
      default:
        return { 
          backgroundColor: 'var(--color-green)',
          color: 'var(--text-inverse)',
          border: '1px solid var(--color-green-border)'
        };
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--card-background)',
      borderColor: 'var(--card-border)',
      border: '1px solid',
      boxShadow: 'var(--card-shadow)'
    }} className="rounded-lg p-4">
      <div className="mb-4">
        <h3 style={{ color: 'var(--text-accent)' }} className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium" style={getTypeStyles(type)}>
            {type}
          </span>
          {dependencies.map((dep, index) => (
            <span key={index} style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--text-accent)',
              border: '1px solid var(--card-border)'
            }} className="px-2 py-1 rounded-full text-xs font-medium hover:opacity-80 cursor-pointer transition-opacity">
              {dep}
            </span>
          ))}
        </div>
        <p style={{ color: 'var(--text-secondary)' }} className="text-sm">{description}</p>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

function ColorPalette({ colors, title }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-accent)' }}>{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colors.map(({ name, value, description }) => (
          <div 
            key={name} 
            style={{ 
              backgroundColor: 'var(--card-background)',
              borderColor: 'var(--card-border)',
              border: '1px solid'
            }}
            className="rounded-lg p-4"
          >
            <div 
              className="h-16 rounded-lg mb-2" 
              style={{ 
                backgroundColor: value,
                border: '1px solid var(--card-border)'
              }}
            />
            <div style={{ color: 'var(--text-accent)' }} className="font-medium mb-1">{name}</div>
            <div style={{ color: 'var(--text-secondary)' }} className="text-sm">{value}</div>
            <div style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradientPalette({ gradients }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-accent)' }}>Gradients</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradients.map(({ name, value, description }) => (
          <div 
            key={name} 
            style={{ 
              backgroundColor: 'var(--card-background)',
              borderColor: 'var(--card-border)',
              border: '1px solid'
            }}
            className="rounded-lg p-4"
          >
            <div 
              className="h-24 rounded-lg mb-2" 
              style={{ 
                background: value,
                border: '1px solid var(--card-border)'
              }}
            />
            <div style={{ color: 'var(--text-accent)' }} className="font-medium mb-1">{name}</div>
            <div style={{ color: 'var(--text-secondary)' }} className="text-sm">{value}</div>
            <div style={{ color: 'var(--text-muted)' }} className="text-sm mt-1">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StyleGuideSection({ title, children }) {
  return (
    <div style={{
      backgroundColor: 'var(--card-background)',
      borderColor: 'var(--card-border)',
      border: '1px solid'
    }} className="rounded-lg p-6 mb-8">
      <h3 style={{ color: 'var(--text-accent)' }} className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default function ComponentsPage() {
  const [showFlagRain, setShowFlagRain] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showLaptopPopup, setShowLaptopPopup] = useState(false);
  const [activeLevel, setActiveLevel] = useState('Atoms');

  const handleFlagRainComplete = useCallback(() => {
    setShowFlagRain(false);
  }, []);

  const levels = [
    'Atoms', 
    'Molecules', 
    'Organisms', 
    'Templates', 
    'Pages', 
    'Colors & Gradients',
    'Style Guide'
  ];

  const renderContent = () => {
    switch (activeLevel) {
      case 'Atoms':
        return (
          <ComponentSection 
            title="Atoms (Basic Building Blocks)" 
            description={
              <span>
                The smallest, indivisible components that serve as the{' '}
                <span style={{ color: 'var(--text-accent)' }}>foundational</span>{' '}
                building blocks of your{' '}
                <span style={{ color: 'var(--text-accent)' }}>interface</span>.
              </span>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentCard
                title="Progress Bar"
                type="Atom"
                dependencies={['TailwindCSS']}
                description="Simple progress indicator component."
              >
                <ProgressBar progress={75} />
              </ComponentCard>

              <ComponentCard
                title="Flag Rain"
                type="Atom"
                dependencies={['react-world-flags', 'React useEffect']}
                description="Animated flag falling effect component."
              >
                <button 
                  style={{
                    backgroundColor: 'var(--button-primary)',
                    color: 'var(--text-inverse)',
                  }}
                  className="px-4 py-2 rounded hover:opacity-90 transition-all"
                  onClick={() => setShowFlagRain(true)}
                >
                  Trigger Flag Rain
                </button>
                {showFlagRain && (
                  <FlagRain 
                    countryCode="DK" 
                    onAnimationComplete={handleFlagRainComplete}
                  />
                )}
              </ComponentCard>

              <ComponentCard
                title="Celebration"
                type="Atom"
                dependencies={['TailwindCSS', 'React useEffect']}
                description="Visual celebration animation component."
              >
                <Celebration />
              </ComponentCard>

              <ComponentCard
                title="Welcome"
                type="Atom"
                dependencies={['TailwindCSS']}
                description="Simple welcome message display component."
              >
                <Welcome />
              </ComponentCard>
            </div>
          </ComponentSection>
        );

      case 'Molecules':
        return (
          <ComponentSection 
            title="Molecules (Compound Components)" 
            description="Simple groups of UI elements functioning together as a unit."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComponentCard
                title="Welcome Popup"
                type="Molecule"
                dependencies={['TailwindCSS', 'React State']}
                description="Interactive modal component with user greeting and actions."
              >
                <button 
                  style={{
                    backgroundColor: 'var(--button-primary)',
                    color: 'var(--text-inverse)',
                  }}
                  className="px-4 py-2 rounded hover:opacity-90 transition-all"
                  onClick={() => setShowWelcomePopup(true)}
                >
                  Show Welcome Popup
                </button>
                {showWelcomePopup && (
                  <WelcomePopup onClose={() => setShowWelcomePopup(false)} />
                )}
              </ComponentCard>

              <ComponentCard
                title="Laptop Popup"
                type="Molecule"
                dependencies={['TailwindCSS', 'React State']}
                description="Interactive laptop display with animation and content."
              >
                <button 
                  style={{
                    backgroundColor: 'var(--button-primary)',
                    color: 'var(--text-inverse)',
                  }}
                  className="px-4 py-2 rounded hover:opacity-90 transition-all"
                  onClick={() => setShowLaptopPopup(true)}
                >
                  Show Laptop Popup
                </button>
                {showLaptopPopup && (
                  <LaptopPopup onClose={() => setShowLaptopPopup(false)} />
                )}
              </ComponentCard>

              <ComponentCard
                title="UserNameWithFlag"
                type="Molecule"
                dependencies={['react-world-flags', 'TailwindCSS']}
                description="Combined display of username and country flag."
              >
                <UserNameWithFlag username="Demo User" countryCode="DK" />
              </ComponentCard>

              <ComponentCard
                title="CountrySelector"
                type="Molecule"
                dependencies={['react-world-flags', 'TailwindCSS']}
                description="Interactive country selection dropdown with flags."
              >
                <CountrySelector />
              </ComponentCard>
            </div>
          </ComponentSection>
        );

      case 'Organisms':
        return (
          <ComponentSection 
            title="Organisms (Complex Components)" 
            description="Large, complex components that form meaningful user interface sections."
          >
            <div className="grid grid-cols-1 gap-6">
              <ComponentCard
                title="Navbar"
                type="Organism"
                dependencies={['next/link', 'next/navigation', 'TailwindCSS']}
                description="Main navigation component providing site-wide navigation and user controls."
              >
                <Navbar />
              </ComponentCard>
              
              <ComponentCard
                title="User Settings"
                type="Organism"
                dependencies={['React Context', 'TailwindCSS', 'react-world-flags']}
                description="Complex form handling user preferences and settings with multiple interactive elements."
              >
                <UserSettings />
              </ComponentCard>

              <ComponentCard
                title="Footer"
                type="Organism"
                dependencies={['next/link', 'TailwindCSS']}
                description="Site-wide footer containing navigation links and additional information."
              >
                <Footer />
              </ComponentCard>
            </div>
          </ComponentSection>
        );

      case 'Templates':
        return (
          <ComponentSection 
            title="Templates (Layout Patterns)" 
            description="Page-level objects that place components into a layout and define the underlying content structure."
          >
            <div className="grid grid-cols-1 gap-6">
              <ComponentCard
                title="Lesson Template"
                type="Template"
                dependencies={['Next.js Layout', 'TailwindCSS']}
                description="Base template for lesson pages showing navigation, content area, and interactive elements."
              >
                <div style={{
                  border: '2px dashed var(--card-border)',
                  backgroundColor: 'var(--color-background)',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{
                    height: '4rem',
                    backgroundColor: 'var(--card-background)',
                    marginBottom: '1rem',
                    borderRadius: '0.25rem'
                  }} title="Navigation Area"></div>
                  <div className="flex gap-4">
                    <div className="w-3/4">
                      <div style={{
                        height: '2rem',
                        backgroundColor: 'var(--card-background)',
                        marginBottom: '1rem',
                        borderRadius: '0.25rem',
                        width: '50%'
                      }} title="Title Area"></div>
                      <div style={{
                        height: '8rem',
                        backgroundColor: 'var(--card-background)',
                        marginBottom: '1rem',
                        borderRadius: '0.25rem'
                      }} title="Content Area"></div>
                      <div style={{
                        height: '6rem',
                        backgroundColor: 'var(--card-background)',
                        borderRadius: '0.25rem'
                      }} title="Interactive Area"></div>
                    </div>
                    <div className="w-1/4">
                      <div style={{
                        height: '16rem',
                        backgroundColor: 'var(--card-background)',
                        borderRadius: '0.25rem'
                      }} title="Sidebar Area"></div>
                    </div>
                  </div>
                </div>
              </ComponentCard>
            </div>
          </ComponentSection>
        );

      case 'Pages':
        return (
          <ComponentSection 
            title="Pages (Complete Interfaces)" 
            description="Specific instances of templates populated with real representative content."
          >
            <div className="grid grid-cols-1 gap-6">
              <ComponentCard
                title="Lesson Page"
                type="Page"
                dependencies={['Next.js Page', 'React Components', 'TailwindCSS']}
                description="Complete lesson page with actual content, navigation, and interactive elements."
              >
                <div style={{
                  border: '2px dashed var(--card-border)',
                  backgroundColor: 'var(--color-background)',
                  padding: '1rem',
                  borderRadius: '0.5rem'
                }}>
                  <Navbar />
                  <div className="flex gap-4 mt-4">
                    <div className="w-3/4">
                      <h2 style={{ color: 'var(--text-accent)' }} className="text-xl mb-4">Introduction to Python</h2>
                      <div className="prose max-w-none">
                        <p style={{ color: 'var(--text-secondary)' }} className="mt-0">
                          Welcome to the Python programming course. In this lesson, we'll cover the basics of Python syntax and programming concepts.
                        </p>
                      </div>
                      <div className="mt-4">
                        <ProgressBar progress={75} />
                      </div>
                    </div>
                    <div className="w-1/4">
                      <div style={{
                        backgroundColor: 'var(--card-background)',
                        padding: '1rem',
                        borderRadius: '0.5rem'
                      }}>
                        <h3 style={{ color: 'var(--text-accent)' }} className="mb-2">Course Progress</h3>
                        <p style={{ color: 'var(--text-secondary)' }} className="text-sm">Lesson 3 of 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ComponentCard>
            </div>
          </ComponentSection>
        );

      case 'Colors & Gradients':
        return (
          <ComponentSection
            title="Colors & Gradients"
            description="The complete color system and gradient patterns used throughout the website."
          >
            <ColorPalette
              title="Primary Colors"
              colors={[
                { 
                  name: 'Primary Background', 
                  value: 'var(--color-background)',
                  description: 'Main background color'
                },
                { 
                  name: 'Secondary Background', 
                  value: 'var(--card-background)',
                  description: 'Card and section backgrounds'
                },
                { 
                  name: 'Accent', 
                  value: 'var(--text-accent)',
                  description: 'Primary accent color'
                },
                { 
                  name: 'Secondary Accent', 
                  value: 'var(--color-secondary)',
                  description: 'Secondary accent color'
                },
              ]}
            />

            <ColorPalette
              title="Text Colors"
              colors={[
                { 
                  name: 'Primary Text', 
                  value: 'var(--text-primary)',
                  description: 'Main text color'
                },
                { 
                  name: 'Secondary Text', 
                  value: 'var(--text-secondary)',
                  description: 'Secondary text color'
                },
                { 
                  name: 'Muted Text', 
                  value: 'var(--text-muted)',
                  description: 'Muted and helper text'
                },
                { 
                  name: 'Accent Text', 
                  value: 'var(--text-accent)',
                  description: 'Highlighted text color'
                },
              ]}
            />

            <GradientPalette
              gradients={[
                {
                  name: 'Background Gradient',
                  value: 'var(--gradient-background)',
                  description: 'Used for main background effects'
                },
                {
                  name: 'Heading Gradient',
                  value: 'var(--gradient-heading)',
                  description: 'Used for gradient text effects'
                },
                {
                  name: 'Card Gradient',
                  value: 'var(--gradient-card)',
                  description: 'Used for card hover effects'
                },
                {
                  name: 'Hover Gradient',
                  value: 'var(--gradient-hover)',
                  description: 'Used for interactive element hovers'
                },
              ]}
            />
          </ComponentSection>
        );

      case 'Style Guide':
        return (
          <ComponentSection
            title="Style Guide"
            description="Common styling patterns and component design guidelines."
          >
            <StyleGuideSection title="Button Styles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-4">
                  <h4 style={{ color: 'var(--text-secondary)' }} className="font-medium mb-2">Primary Buttons</h4>
                  <button style={{
                    backgroundColor: 'var(--interactive-hover)',
                    color: 'var(--text-inverse)'
                  }} className="px-4 py-2 rounded hover:opacity-90 transition-all">
                    Primary Button
                  </button>
                  <div style={{ color: 'var(--text-muted)' }} className="text-sm mt-2">
                    Used for main actions. Uses interactive-hover color.
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 style={{ color: 'var(--text-secondary)' }} className="font-medium mb-2">Secondary Buttons</h4>
                  <button style={{
                    borderColor: 'var(--interactive-hover)',
                    color: 'var(--interactive-hover)',
                    borderWidth: '1px'
                  }} className="px-4 py-2 rounded hover:bg-opacity-10 transition-all">
                    Secondary Button
                  </button>
                  <div style={{ color: 'var(--text-muted)' }} className="text-sm mt-2">
                    Used for alternative actions. Uses interactive-hover color.
                  </div>
                </div>
              </div>
            </StyleGuideSection>

            <StyleGuideSection title="Card Styles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--card-border)',
                  border: '1px solid'
                }} className="rounded-lg p-4">
                  <h4 style={{ color: 'var(--text-accent)' }} className="font-medium mb-2">Standard Card</h4>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
                    Default card style with subtle border and background.
                  </p>
                </div>
                <div style={{
                  backgroundColor: 'var(--card-background)',
                  borderColor: 'var(--card-border)',
                  border: '1px solid',
                  boxShadow: 'var(--effect-cardHover)'
                }} className="rounded-lg p-4">
                  <h4 style={{ color: 'var(--text-accent)' }} className="font-medium mb-2">Elevated Card</h4>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
                    Card with glow effect for highlighted content.
                  </p>
                </div>
              </div>
            </StyleGuideSection>

            <StyleGuideSection title="Typography">
              <div className="space-y-6">
                <div>
                  <h1 style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold mb-2">Heading 1</h1>
                  <div style={{ color: 'var(--text-muted)' }} className="text-sm">Font size: 30px (1.875rem), Weight: 700</div>
                </div>
                <div>
                  <h2 style={{ color: 'var(--text-accent)' }} className="text-2xl font-bold mb-2">Heading 2</h2>
                  <div style={{ color: 'var(--text-muted)' }} className="text-sm">Font size: 24px (1.5rem), Weight: 700</div>
                </div>
                <div>
                  <h3 style={{ color: 'var(--text-accent)' }} className="text-xl font-semibold mb-2">Heading 3</h3>
                  <div style={{ color: 'var(--text-muted)' }} className="text-sm">Font size: 20px (1.25rem), Weight: 600</div>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)' }} className="mb-2">Body Text</p>
                  <div style={{ color: 'var(--text-muted)' }} className="text-sm">Font size: 16px (1rem), Weight: 400</div>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-2">Small Text</p>
                  <div style={{ color: 'var(--text-muted)' }} className="text-sm">Font size: 14px (0.875rem), Weight: 400</div>
                </div>
              </div>
            </StyleGuideSection>

            <StyleGuideSection title="Spacing System">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div style={{ backgroundColor: 'var(--text-accent)' }} className="w-4 h-4 rounded"></div>
                  <span style={{ color: 'var(--text-secondary)' }}>4px - Extra Small (0.25rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ backgroundColor: 'var(--text-accent)' }} className="w-6 h-6 rounded"></div>
                  <span style={{ color: 'var(--text-secondary)' }}>6px - Small (0.375rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ backgroundColor: 'var(--text-accent)' }} className="w-8 h-8 rounded"></div>
                  <span style={{ color: 'var(--text-secondary)' }}>8px - Base (0.5rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ backgroundColor: 'var(--text-accent)' }} className="w-12 h-12 rounded"></div>
                  <span style={{ color: 'var(--text-secondary)' }}>12px - Medium (0.75rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div style={{ backgroundColor: 'var(--text-accent)' }} className="w-16 h-16 rounded"></div>
                  <span style={{ color: 'var(--text-secondary)' }}>16px - Large (1rem)</span>
                </div>
              </div>
            </StyleGuideSection>
          </ComponentSection>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }} className="min-h-screen p-8">
      <div style={{ backgroundColor: 'var(--color-background)' }} className="max-w-7xl mx-auto">
        <h1 style={{
          background: 'var(--gradient-heading)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }} className="text-3xl font-bold mb-8">
          Components Library
        </h1>
        
        <DesignLevelToggle 
          levels={levels}
          activeLevel={activeLevel}
          onToggle={setActiveLevel}
        />

        {renderContent()}
      </div>
    </div>
  );
} 