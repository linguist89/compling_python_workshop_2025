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
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${activeLevel === level 
              ? 'bg-[#00E6E6] text-[#0A192F] shadow-[0_0_15px_rgba(0,230,230,0.5)]' 
              : 'bg-[#112240] text-[#B8D4D4] hover:bg-[#1D3A6E] border border-[#00E6E620]'
            }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}

function ComponentSection({ title, children, description }) {
  return (
    <div className="border border-[#00E6E620] rounded-lg p-6 mb-8 bg-[#112240]">
      <h2 className="text-2xl font-bold mb-2 text-[#00E6E6]">{title}</h2>
      <p className="text-[#B8D4D4] mb-4">{description}</p>
      <div className="bg-[#0A192F] p-4 rounded-lg border border-[#00E6E620]">
        {children}
      </div>
    </div>
  );
}

function ComponentCard({ title, type, dependencies, description, children }) {
  return (
    <div className="border border-[#00E6E620] rounded-lg p-4 bg-[#112240]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-[#00E6E6]">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium
            ${type === 'Organism' ? 'bg-purple-900 text-purple-100' : 
              type === 'Molecule' ? 'bg-blue-900 text-blue-100' : 
              'bg-green-900 text-green-100'}`}>
            {type}
          </span>
          {dependencies.map((dep, index) => (
            <span key={index} className="px-2 py-1 rounded-full text-xs font-medium bg-[#0A192F] text-[#B8D4D4]">
              {dep}
            </span>
          ))}
        </div>
        <p className="text-sm text-[#B8D4D4]">{description}</p>
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
      <h3 className="text-lg font-semibold mb-4 text-[#00E6E6]">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {colors.map(({ name, value, description }) => (
          <div key={name} className="border border-[#00E6E620] rounded-lg p-4 bg-[#112240]">
            <div 
              className="h-16 rounded-lg mb-2 border border-[#00E6E620]" 
              style={{ backgroundColor: value }}
            />
            <div className="text-[#00E6E6] font-medium mb-1">{name}</div>
            <div className="text-[#B8D4D4] text-sm">{value}</div>
            <div className="text-[#8CA2A2] text-sm mt-1">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradientPalette({ gradients }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-[#00E6E6]">Gradients</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradients.map(({ name, value, description }) => (
          <div key={name} className="border border-[#00E6E620] rounded-lg p-4 bg-[#112240]">
            <div 
              className="h-24 rounded-lg mb-2 border border-[#00E6E620]" 
              style={{ background: value }}
            />
            <div className="text-[#00E6E6] font-medium mb-1">{name}</div>
            <div className="text-[#B8D4D4] text-sm">{value}</div>
            <div className="text-[#8CA2A2] text-sm mt-1">{description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StyleGuideSection({ title, children }) {
  return (
    <div className="border border-[#00E6E620] rounded-lg p-6 mb-8 bg-[#112240]">
      <h3 className="text-lg font-semibold mb-4 text-[#00E6E6]">{title}</h3>
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
            description="The smallest, indivisible components that serve as the foundational building blocks of your interface."
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
                  onClick={() => setShowFlagRain(true)}
                  className="px-4 py-2 bg-[#00E6E6] text-[#0A192F] rounded hover:bg-[#00FFFF]"
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
                  onClick={() => setShowWelcomePopup(true)}
                  className="px-4 py-2 bg-[#00E6E6] text-[#0A192F] rounded hover:bg-[#00FFFF]"
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
                  onClick={() => setShowLaptopPopup(true)}
                  className="px-4 py-2 bg-[#00E6E6] text-[#0A192F] rounded hover:bg-[#00FFFF]"
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
                <div className="border-2 border-dashed border-[#00E6E620] p-4 rounded-lg bg-[#0A192F]">
                  <div className="h-16 bg-[#112240] mb-4 rounded" title="Navigation Area"></div>
                  <div className="flex gap-4">
                    <div className="w-3/4">
                      <div className="h-8 bg-[#112240] w-1/2 mb-4 rounded" title="Title Area"></div>
                      <div className="h-32 bg-[#112240] mb-4 rounded" title="Content Area"></div>
                      <div className="h-24 bg-[#112240] rounded" title="Interactive Area"></div>
                    </div>
                    <div className="w-1/4">
                      <div className="h-64 bg-[#112240] rounded" title="Sidebar Area"></div>
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
                <div className="border-2 border-dashed border-[#00E6E620] p-4 rounded-lg bg-[#0A192F]">
                  <Navbar />
                  <div className="flex gap-4 mt-4">
                    <div className="w-3/4">
                      <h2 className="text-[#00E6E6] text-xl mb-4">Introduction to Python</h2>
                      <div className="prose prose-invert max-w-none">
                        <p className="text-[#B8D4D4] !mt-0">Welcome to the Python programming course. In this lesson, we'll cover the basics of Python syntax and programming concepts.</p>
                      </div>
                      <div className="mt-4">
                        <ProgressBar progress={75} />
                      </div>
                    </div>
                    <div className="w-1/4">
                      <div className="bg-[#112240] p-4 rounded">
                        <h3 className="text-[#00E6E6] mb-2">Course Progress</h3>
                        <p className="text-[#B8D4D4] text-sm">Lesson 3 of 10</p>
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
                  value: '#0A192F',
                  description: 'Main background color'
                },
                { 
                  name: 'Secondary Background', 
                  value: '#112240',
                  description: 'Card and section backgrounds'
                },
                { 
                  name: 'Accent', 
                  value: '#00E6E6',
                  description: 'Primary accent color'
                },
                { 
                  name: 'Secondary Accent', 
                  value: '#FFC107',
                  description: 'Secondary accent color'
                },
              ]}
            />

            <ColorPalette
              title="Text Colors"
              colors={[
                { 
                  name: 'Primary Text', 
                  value: '#E6FFFF',
                  description: 'Main text color'
                },
                { 
                  name: 'Secondary Text', 
                  value: '#B8D4D4',
                  description: 'Secondary text color'
                },
                { 
                  name: 'Muted Text', 
                  value: '#8CA2A2',
                  description: 'Muted and helper text'
                },
                { 
                  name: 'Accent Text', 
                  value: '#00E6E6',
                  description: 'Highlighted text color'
                },
              ]}
            />

            <GradientPalette
              gradients={[
                {
                  name: 'Background Gradient',
                  value: 'linear-gradient(to bottom, #0A192F, #050B18)',
                  description: 'Used for main background effects'
                },
                {
                  name: 'Heading Gradient',
                  value: 'linear-gradient(to right, #00E6E6, #FFC107)',
                  description: 'Used for gradient text effects'
                },
                {
                  name: 'Card Gradient',
                  value: 'linear-gradient(to bottom, #112240, #0A192F)',
                  description: 'Used for card hover effects'
                },
                {
                  name: 'Hover Gradient',
                  value: 'linear-gradient(to right, #00E6E6, #00FFFF)',
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
                  <h4 className="text-[#B8D4D4] font-medium mb-2">Primary Buttons</h4>
                  <button className="px-4 py-2 bg-[#00E6E6] text-[#0A192F] rounded hover:bg-[#00FFFF] transition-all">
                    Primary Button
                  </button>
                  <div className="text-[#8CA2A2] text-sm mt-2">
                    Used for main actions. Background: #00E6E6, Hover: #00FFFF
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-[#B8D4D4] font-medium mb-2">Secondary Buttons</h4>
                  <button className="px-4 py-2 border border-[#00E6E6] text-[#00E6E6] rounded hover:bg-[#112240] transition-all">
                    Secondary Button
                  </button>
                  <div className="text-[#8CA2A2] text-sm mt-2">
                    Used for alternative actions. Border color: #00E6E6
                  </div>
                </div>
              </div>
            </StyleGuideSection>

            <StyleGuideSection title="Card Styles">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-[#00E6E620] rounded-lg p-4 bg-[#112240]">
                  <h4 className="text-[#00E6E6] font-medium mb-2">Standard Card</h4>
                  <p className="text-[#B8D4D4] text-sm">
                    Default card style with subtle border and darker background.
                  </p>
                </div>
                <div className="border border-[#00E6E620] rounded-lg p-4 bg-[#112240] shadow-[0_8px_30px_rgba(0,230,230,0.2)]">
                  <h4 className="text-[#00E6E6] font-medium mb-2">Elevated Card</h4>
                  <p className="text-[#B8D4D4] text-sm">
                    Card with glow effect for highlighted content.
                  </p>
                </div>
              </div>
            </StyleGuideSection>

            <StyleGuideSection title="Typography">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#E6FFFF] mb-2">Heading 1</h1>
                  <div className="text-[#8CA2A2] text-sm">Font size: 30px (1.875rem), Weight: 700</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#00E6E6] mb-2">Heading 2</h2>
                  <div className="text-[#8CA2A2] text-sm">Font size: 24px (1.5rem), Weight: 700</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#00E6E6] mb-2">Heading 3</h3>
                  <div className="text-[#8CA2A2] text-sm">Font size: 20px (1.25rem), Weight: 600</div>
                </div>
                <div>
                  <p className="text-[#B8D4D4] mb-2">Body Text</p>
                  <div className="text-[#8CA2A2] text-sm">Font size: 16px (1rem), Weight: 400</div>
                </div>
                <div>
                  <p className="text-[#8CA2A2] text-sm mb-2">Small Text</p>
                  <div className="text-[#8CA2A2] text-sm">Font size: 14px (0.875rem), Weight: 400</div>
                </div>
              </div>
            </StyleGuideSection>

            <StyleGuideSection title="Spacing System">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-[#00E6E6] rounded"></div>
                  <span className="text-[#B8D4D4]">4px - Extra Small (0.25rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-[#00E6E6] rounded"></div>
                  <span className="text-[#B8D4D4]">6px - Small (0.375rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-[#00E6E6] rounded"></div>
                  <span className="text-[#B8D4D4]">8px - Base (0.5rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00E6E6] rounded"></div>
                  <span className="text-[#B8D4D4]">12px - Medium (0.75rem)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#00E6E6] rounded"></div>
                  <span className="text-[#B8D4D4]">16px - Large (1rem)</span>
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
    <div className="space-y-8 bg-[#0A192F] min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#E6FFFF] bg-gradient-to-r from-[#00E6E6] to-[#FFC107] bg-clip-text text-transparent">
        Components Library
      </h1>
      
      <DesignLevelToggle 
        levels={levels}
        activeLevel={activeLevel}
        onToggle={setActiveLevel}
      />

      {renderContent()}
    </div>
  );
} 