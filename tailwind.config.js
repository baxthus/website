/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				jetBrains: ['JetBrains Mono', 'monospace'],
				jpFont: ['Noto Sans JP', 'sans-serif'],
				inter: ['Inter', 'JetBrains Mono', 'sans-serif']
			}
		}
	},
	plugins: [
		require('@catppuccin/tailwindcss')({
			prefix: 'ctp',
			defaultFlavour: 'mocha'
		})
	]
};
