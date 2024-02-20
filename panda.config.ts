import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles: {
        headline1: {
          description:
            'In the type scale, headlines span from a range of 1 through 6. Headlines are the largest text on the screen, reserved for short, important text or numerals.',
          value: {
            fontWeight: '300',
            // yes! you can change the font size based on the writing mode
            fontSize: '5.5625rem',
            lineHeight: '7rem',
            letterSpacing: '-0.015em',
          },
        },
        headline2: {
          description: 'Oversized headlines in website.',
          value: {
            fontWeight: '300',
            fontSize: '3.625rem',
            lineHeight: '4.5rem',
            letterSpacing: '-0.005em',
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
