import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// GitHub Pages publishes project sites at /<repository>/, not the domain root.
// The repository is detected automatically when built by GitHub Actions.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isProjectPage = process.env.GITHUB_ACTIONS === 'true' &&
  !!repository && !repository.toLowerCase().endsWith('.github.io');

export default defineConfig({
  base: isProjectPage ? `/${repository}/` : '/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});
