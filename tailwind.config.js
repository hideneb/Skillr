/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                redhat: ['RedHatDisplay', 'SF Pro Text', 'sans-serif'],
                poppins: ['Poppins', 'SF Pro Text', 'sans-serif'],
            },
            boxShadow: {
                'skillr-lg': '0px 4px 16px rgba(0, 0, 0, 0.12)',
            },
            borderRadius: {
                lg2: 10,
            },
            colors: {
                'skillr-pink': '#ff165f',
                'rich-blue-8': '#0c1f3f',
                'rich-blue-7': '#374761',
            },
        },
    },
    plugins: [],
};
