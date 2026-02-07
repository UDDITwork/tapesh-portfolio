import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#A8D8EA',
        'warm-white': '#FAFAFA',
        'text-heading': '#666666',
        'text-body': '#999999',
        'text-light': '#AAAAAA',
        'text-faint': '#CCCCCC',
        'border-light': '#E0E0E0',
        'wire-grey': '#D0D0D0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'cinematic': '0.3em',
        'wide-custom': '0.15em',
      },
    },
  },
  plugins: [],
}

export default config
