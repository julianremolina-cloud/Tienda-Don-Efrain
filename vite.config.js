import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { join } from 'node:path'

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls
      }
    }),

    quasar({
      sassVariables: join(import.meta.dirname, 'src/quasar-variables.sass')
    })
  ]
})
