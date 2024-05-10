// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
const handlebars = require('handlebars')

export default defineConfig({
  plugins: [handlebars()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/server/server.js'),
      },
    },
  },
})