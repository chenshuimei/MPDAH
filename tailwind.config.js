/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: 'hsl(var(--canvas) / <alpha-value>)',
          deep: 'hsl(var(--canvas-deep) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          hover: 'hsl(var(--surface-hover) / <alpha-value>)',
          active: 'hsl(var(--surface-active) / <alpha-value>)',
          raised: 'hsl(var(--surface-raised) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'hsl(var(--border) / <alpha-value>)',
          subtle: 'hsl(var(--border-subtle) / <alpha-value>)',
        },
        text: {
          primary: 'hsl(var(--text-primary) / <alpha-value>)',
          secondary: 'hsl(var(--text-secondary) / <alpha-value>)',
          tertiary: 'hsl(var(--text-tertiary) / <alpha-value>)',
          inverse: 'hsl(var(--text-inverse) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          glow: 'hsl(var(--accent-glow) / <alpha-value>)',
          muted: 'hsl(var(--accent-muted) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'hsl(var(--success) / <alpha-value>)',
          muted: 'hsl(var(--success-muted) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning) / <alpha-value>)',
          muted: 'hsl(var(--warning-muted) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger) / <alpha-value>)',
          muted: 'hsl(var(--danger-muted) / <alpha-value>)',
        },
      },
      boxShadow: {
        'glow': '0 0 20px -5px hsl(var(--accent) / 0.3)',
        'glow-lg': '0 0 40px -10px hsl(var(--accent) / 0.4)',
        'card': '0 1px 3px hsl(var(--canvas-deep) / 0.5), 0 1px 2px hsl(var(--canvas-deep) / 0.3)',
        'elevated': '0 10px 30px -10px hsl(var(--canvas-deep) / 0.6)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      fontSize: {
        'xxs': ['0.65rem', { lineHeight: '1rem' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'typing': 'typing 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        typing: {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
}
