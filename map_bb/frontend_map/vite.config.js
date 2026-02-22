import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
  
    }
  }
})
// https://vite.dev/config/
<<<<<<< HEAD

=======
>>>>>>> 07c2008094358cc1969e4291c25b1c25e880ef8d
