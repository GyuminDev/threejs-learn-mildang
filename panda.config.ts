import { defineConfig, definePreset } from '@pandacss/dev';
import { textStyles } from '@/app/theme/text-styles';
import { recipes } from '@/app/recipes';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: [
    '@pandacss/preset-base',
    definePreset({
      theme: {
        extend: {
          textStyles,
          recipes,
        },
      },
    }),
  ],

  // Where to look for your css declarations
  include: [
    './src/**/*.{tsx,ts,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/app/**/*.{ts,tsx,js,jsx}',
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles,
      recipes,
    },
  },

  jsxFramework: 'react',
  // jsxFactory: 'ds',

  // The output directory for your css system
  outdir: 'styled-system',
});
