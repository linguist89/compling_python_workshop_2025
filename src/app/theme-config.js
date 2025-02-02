export const themes = {
  // Dark Themes
  neon: {
    name: 'Neon Night',
    isDark: true,
    primary: {
      background: '#0A192F',
      text: '#E6FFFF',
      accent: '#00E6E6',
      secondary: '#FFC107',
      dark: '#050B18',
    },
    text: {
      primary: '#E6FFFF',
      secondary: '#B8D4D4',
      muted: '#8CA2A2',
      accent: '#00E6E6',
      inverse: '#0A192F',
    },
    interactive: {
      hover: '#00E6E6',
      active: '#00FFFF',
      focus: '#FFC107',
      disabled: '#4D5B5B',
    },
    components: {
      navbar: {
        background: '#0A192F90',
        border: '#00E6E620',
        text: '#E6FFFF',
        activeLink: '#00E6E6',
        hoverLink: '#FFC107',
      },
      footer: {
        background: '#050B18',
        border: '#00E6E620',
        text: '#B8D4D4',
        link: '#00E6E6',
        hoverLink: '#FFC107',
      },
      card: {
        background: '#0D1B2A',
        border: '#00E6E620',
        title: '#00E6E6',
        text: '#B8D4D4',
        shadow: '0 4px 20px rgba(0, 230, 230, 0.1)',
      },
      button: {
        primary: '#00E6E6',
        secondary: '#FFC107',
        text: '#0A192F',
        hover: '#00FFFF',
        disabled: '#4D5B5B',
      },
      input: {
        background: '#0A192F',
        border: '#00E6E640',
        text: '#E6FFFF',
        placeholder: '#8CA2A2',
        focus: '#00E6E6',
      }
    },
    gradients: {
      background: 'from-[#0A192F] to-[#050B18]',
      heading: 'from-[#00E6E6] to-[#FFC107]',
      card: 'from-[#0D1B2A] to-[#0A192F]',
      hover: 'from-[#00E6E6] to-[#00FFFF]',
    },
    effects: {
      glow: '0 0 20px rgba(0, 230, 230, 0.3)',
      cardHover: '0 8px 30px rgba(0, 230, 230, 0.2)',
      buttonHover: '0 0 15px rgba(0, 230, 230, 0.5)',
    }
  },
  // Light Themes
  daylight: {
    name: 'Daylight',
    isDark: false,
    primary: {
      background: '#FFFFFF',
      text: '#2D3748',
      accent: '#3182CE',
      secondary: '#ED8936',
      dark: '#F7FAFC',
    },
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
      muted: '#718096',
      accent: '#3182CE',
      inverse: '#FFFFFF',
    },
    interactive: {
      hover: '#3182CE',
      active: '#2B6CB0',
      focus: '#4299E1',
      disabled: '#A0AEC0',
    },
    components: {
      navbar: {
        background: '#FFFFFF90',
        border: '#E2E8F0',
        text: '#2D3748',
        activeLink: '#3182CE',
        hoverLink: '#ED8936',
      },
      footer: {
        background: '#F7FAFC',
        border: '#E2E8F0',
        text: '#4A5568',
        link: '#3182CE',
        hoverLink: '#ED8936',
      },
      card: {
        background: '#F8FAFC',
        border: '#E2E8F0',
        title: '#3182CE',
        text: '#4A5568',
        shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      button: {
        primary: '#3182CE',
        secondary: '#ED8936',
        text: '#FFFFFF',
        hover: '#2B6CB0',
        disabled: '#A0AEC0',
      },
      input: {
        background: '#FFFFFF',
        border: '#E2E8F0',
        text: '#2D3748',
        placeholder: '#A0AEC0',
        focus: '#3182CE',
      }
    },
    gradients: {
      background: 'from-[#FFFFFF] to-[#F7FAFC]',
      heading: 'from-[#3182CE] to-[#ED8936]',
      card: 'from-[#F8FAFC] to-[#F1F5F9]',
      hover: 'from-[#3182CE] to-[#2B6CB0]',
    },
    effects: {
      glow: '0 0 20px rgba(49, 130, 206, 0.3)',
      cardHover: '0 8px 30px rgba(0, 0, 0, 0.1)',
      buttonHover: '0 0 15px rgba(49, 130, 206, 0.3)',
    }
  }
}

export const defaultTheme = themes.neon 