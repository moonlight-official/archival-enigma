import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'garamond': ['EB Garamond', 'serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				museum: {
					parchment: 'hsl(var(--museum-parchment))',
					'aged-paper': 'hsl(var(--museum-aged-paper))',
					'dusty-brown': 'hsl(var(--museum-dusty-brown))',
					'aged-gold': 'hsl(var(--museum-aged-gold))',
					'deep-navy': 'hsl(var(--museum-deep-navy))',
					charcoal: 'hsl(var(--museum-charcoal))',
					glass: 'hsl(var(--museum-glass))',
					shadow: 'hsl(var(--museum-shadow))',
				}
			},
			backgroundImage: {
				'gradient-parchment': 'var(--gradient-parchment)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-golden': 'var(--gradient-golden)',
				'gradient-shadow': 'var(--gradient-shadow)',
			},
			boxShadow: {
				'exhibit': 'var(--shadow-exhibit)',
				'glass': 'var(--shadow-glass)',
				'hover': 'var(--shadow-hover)',
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'bloom': 'bloom 0.8s ease-out',
				'ripple': 'ripple 1.2s ease-out',
				'ink-flow': 'ink-flow 0.6s ease-out',
				'glass-shimmer': 'glass-shimmer 2s ease-in-out infinite',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bloom': {
					'0%': { 
						transform: 'scale(0) rotate(0deg)',
						opacity: '0'
					},
					'50%': { 
						transform: 'scale(1.1) rotate(90deg)',
						opacity: '0.8'
					},
					'100%': { 
						transform: 'scale(1) rotate(180deg)',
						opacity: '1'
					}
				},
				'ripple': {
					'0%': { 
						transform: 'scale(0)',
						opacity: '1'
					},
					'100%': { 
						transform: 'scale(4)',
						opacity: '0'
					}
				},
				'ink-flow': {
					'0%': { 
						width: '0%',
						opacity: '0'
					},
					'50%': { 
						opacity: '0.8'
					},
					'100%': { 
						width: '100%',
						opacity: '1'
					}
				},
				'glass-shimmer': {
					'0%, 100%': { 
						background: 'var(--gradient-glass)'
					},
					'50%': { 
						background: 'linear-gradient(145deg, hsla(var(--museum-glass), 0.9), hsla(var(--museum-glass), 0.4))'
					}
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
