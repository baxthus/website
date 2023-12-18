/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            fontFamily: {
                jetBrains: ['JetBrains Mono', 'monospace'],
                inter: ['Inter', 'sans-serif']
            }
        }
    },
    sort: true,
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@catppuccin/tailwindcss')({
            prefix: 'ctp',
            defaultFlavour: 'mocha'
        })
    ]
};
