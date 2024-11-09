import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			'te-papa-green': '#1D4E4E',
  			'chelsea-cucumber': '#069949',
  			xanadu: '#768A7E',
  			pampas: '#F5F2EF'
  		},
  		fontFamily: {
  			sans: ['var(--font-inter)', 'sans-serif'],
  			inter: ['var(--font-inter)', 'sans-serif']
  		},
  		letterSpacing: {
  			tight: '-0.02em',
  			tighter: '-0.04em'
  		},
  		screens: {
  			xs: '375px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'112': '28rem',
  			'128': '32rem'
  		},
  		maxWidth: {
  			'8xl': '88rem',
  			'9xl': '96rem'
  		},
  		zIndex: {
  			'60': '60',
  			'70': '70',
  			'80': '80',
  			'90': '90',
  			'100': '100'
  		},
  		transitionProperty: {
  			height: 'height',
  			spacing: 'margin, padding'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-in': 'slideIn 0.5s ease-in-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideIn: {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config