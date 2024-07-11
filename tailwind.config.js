/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Aldrich", "sans-serif"],
            },
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    border: "var(--primary-border)",
                },
            },
        },
    },
    plugins: [],
};
