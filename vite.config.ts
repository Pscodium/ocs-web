import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: Number(process.env.PORT) || 2304,
        host: process.env.HOST || 'localhost',
        fs: {
            allow: ['.'],
        },
    },
    assetsInclude: ['**/*.md'],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
});
