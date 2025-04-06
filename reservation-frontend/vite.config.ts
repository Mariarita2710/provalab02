
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Rende il server accessibile da altri dispositivi
    port: 5173, // Facoltativo, per specificare la porta
  },
  base: '/ui/', // 👈 importante per routing corretto in produzione
  build: {
    emptyOutDir: true,
    outDir: '../ReservationService/src/main/resources/ui', // 👈 build direttamente nel backend
  },
})