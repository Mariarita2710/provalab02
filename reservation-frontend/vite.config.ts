
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ui/',
  build: {
    emptyOutDir: true,
    outDir: '../ReservationService/src/main/resources/ui', //  build direttamente nel backend
  },
})