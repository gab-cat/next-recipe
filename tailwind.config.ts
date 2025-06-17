import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'inter': ['Inter', 'sans-serif'],
  			'heading': ['Playfair Display', 'serif'],
  			'body': ['Inter', 'sans-serif'],
  			'mono': ['JetBrains Mono', 'monospace'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			"fade-in": "fade-in 0.5s ease-in-out forwards",
  			"slide-up": "slide-up 0.3s ease-out forwards",
  			"scale-in": "scale-in 0.3s ease-out forwards",
  			"bounce-gentle": "bounce-gentle 0.6s ease-in-out",
  		},
  		keyframes: {
  			"fade-in": {
  				"0%": { opacity: "0" },
  				"100%": { opacity: "1" },
  			},
  			"slide-up": {
  				"0%": { transform: "translateY(20px)", opacity: "0" },
  				"100%": { transform: "translateY(0)", opacity: "1" },
  			},
  			"scale-in": {
  				"0%": { transform: "scale(0.8)", opacity: "0" },
  				"100%": { transform: "scale(1)", opacity: "1" },
  			},
  			"bounce-gentle": {
  				"0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
  				"40%": { transform: "translateY(-10px)" },
  				"60%": { transform: "translateY(-5px)" },
  			},
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
