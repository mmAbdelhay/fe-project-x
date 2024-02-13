import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import dotenv from "dotenv";

export default defineConfig({
    plugins: [
        react(),
        VitePWA()
    ],
    define: {
        'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL)
    }
})
