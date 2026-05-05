import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
<<<<<<< HEAD
// import tailwindcss from 'tailwindcss/vite'
=======
>>>>>>> 22ab485

// https://vite.dev/config/
export default defineConfig({
  plugins: [
<<<<<<< HEAD
    // tailwindcss(),
=======
>>>>>>> 22ab485
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
