/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#32ca6c',
                secondary: '#f5f5f8',
            }
        },
    },
    plugins: [],
}