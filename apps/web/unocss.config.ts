import { presetNimiq } from 'nimiq-css'
import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'
import { presetRemToPx } from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno({ attributifyPseudo: true }),
    presetNimiq({
      utilities: true,
      reset: 'tailwind'
    }),
    presetIcons(),
    presetRemToPx({ baseFontSize: 4 }),
    presetAttributify(),
  ],
  theme: {
    breakpoints: {
      desktop: '768px',
    }
  },
  // TODO Remove
  variants: [
    (matcher) => {
      if (!matcher.startsWith('hocus:'))
        return matcher
      return {
        matcher: matcher.replace(/^hocus:/, ''),
        selector: s => `${s}:hover, ${s}:focus-visible`,
      }
    },
  ],
 
})
