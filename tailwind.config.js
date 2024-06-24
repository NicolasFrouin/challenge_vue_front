import { tailwindConfig } from '@storefront-ui/vue/tailwind-config';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  content: ['./index.html', './**/*.vue', './node_modules/@storefront-ui/vue/**/*.{js,mjs}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f9f0ff',
          200: '#f0d6ff',
          300: '#e4b8ff',
          400: '#d29bff',
          500: '#b47ae8',
          600: '#8a0e99',
          700: '#6c0277',
          800: '#4f015c',
          900: '#3f0147',
        },
        secondary: {
          100: '#f0f5ff',
          200: '#d8e2ff',
          300: '#b6ccff',
          400: '#8da5ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4d4cb5',
          800: '#433d8f',
          900: '#3730a3',
        },
        neutral: {
          100: '#f8f9f9',
          200: '#f1f3f4',
          300: '#e9ecf0',
          400: '#dfe3e8',
          500: '#d5dce2',
          600: '#c6d1db',
          700: '#b3c2ce',
          800: '#9aa9b6',
          900: '#7b8f9f',
        },
        base: {
          DEFAULT: '#333333',
        },
      },
    },
    typography: {
      ...tailwindConfig.theme.extend.colors.base,
    },
  },
  plugins: [],
};
