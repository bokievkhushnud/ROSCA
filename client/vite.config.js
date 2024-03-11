// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    checker({
      biome: {
        lintCommand: 'biome lint',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
})
