import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    define: {
        "process.env.BACKEND_ENDPOINT": JSON.stringify(process.env.BACKEND_ENDPOINT),
    }
});
