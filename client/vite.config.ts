/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const { HOST: host = 'localhost', CLIENT_PORT = 3000, FORCE_HTTPS = false } = process.env;
const openUrl = (port = CLIENT_PORT) => `http://localhost:${port}`;

export default defineConfig(({ mode }) => {
  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    server: {
      host,
      port: +CLIENT_PORT,
      open: openUrl(),
    },
    preview: {
      host,
      port: +CLIENT_PORT + 1,
      https: !!FORCE_HTTPS,
      open: host === 'localhost' ? openUrl(+CLIENT_PORT + 1) : false,
    },
    build: {
      sourcemap: true,
      minify: true,
      outDir: 'build',
      chunkSizeWarningLimit: 160000000000000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            return id.includes('node_modules')
              ? id.toString().split('node_modules/')[1].split('/')[0].toString()
              : null;
          },
        },
      },
    },
    resolve: {
      alias: {
        '@public': join(__dirname, 'public'),
        '@Assets': join(__dirname, 'src/Assets'),
        '@Pages': join(__dirname, 'src/Pages'),
        '@Components': join(__dirname, 'src/Components'),
        '@ApiService': join(__dirname, 'src/ApiService'),
        '@Interfaces': join(__dirname, 'src/ApiService/Interfaces'),
        '@RequestApi': join(__dirname, 'src/ApiService/RequestApi'),
        '@Tests': join(__dirname, 'src/ApiService/Tests'),
        '@Hooks': join(__dirname, 'src/Hooks'),
        '@Utils': join(__dirname, 'src/Utils'),
        '@Common': join(__dirname, 'src/Common'),
        '@Atoms': join(__dirname, 'src/Atoms'),
        '@CommonFunctions': join(__dirname, 'src/Common/CommonFunctions'),
        '@CommonInterfaces': join(__dirname, 'src/Common/CommonInterfaces'),
        '@CommonConstants': join(__dirname, 'src/Common/CommonConstants'),
      },
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/ApiService/Tests/MockServer/mockServerSetup.tsx',
      exclude: ['node_modules', 'build'],
    },
  };
});
