import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Make the server accessible on all network interfaces
    port: process.env.PORT || 5173, // Use the port from the environment or default to 5173
  },
})
