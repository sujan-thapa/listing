import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },


  // server: {
  //   proxy: {
  //     '/api': {
  //       target: import.meta.env.VITE_API_URL, // Use environment variable
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
})
