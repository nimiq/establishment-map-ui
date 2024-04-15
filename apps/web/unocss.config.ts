import { presetNimiq } from 'nimiq-css'
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import { presetRemToPx } from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno({ attributifyPseudo: true }),
    presetNimiq({
      utilities: true,
      reset: 'tailwind'
    }),
    presetRemToPx({ baseFontSize: 4 }),
    presetAttributify(),
  ],
  theme: {
    breakpoints: {
      desktop: '768px',
    }
  }
})
