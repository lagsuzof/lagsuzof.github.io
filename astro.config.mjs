import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
if (existsSync('.env')) process.loadEnvFile('.env');
export default defineConfig({
 site: process.env.SITE_URL || 'https://example.com',
 base: process.env.BASE_PATH || '/',
 output: 'static',
 trailingSlash: 'always',
 vite: { plugins: [tailwindcss()] },
});