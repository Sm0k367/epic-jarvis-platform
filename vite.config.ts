import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { Plugin } from 'vite';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Custom plugin to serve Vercel API functions in dev
function apiDevServer(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res) => {
        try {
          // Strip /api prefix
          const url = req.url || '/';
          const subpath = url.split('?')[0];

          // Route to handler
          if (subpath === '/chat' && req.method === 'POST') {
            const mod = await server.ssrLoadModule('/api/chat.ts');
            const handler = mod.default;

            // Read body
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', async () => {
              try {
                req.body = body ? JSON.parse(body) : {};
              } catch {
                req.body = {};
              }

              // Wrap res for Vercel compatibility
              const wrappedRes = res as any;
              const wrappedReq = req as any;
              wrappedReq.body = req.body;

              await handler(wrappedReq, wrappedRes);
            });
          } else {
            res.statusCode = 404;
            res.end('Not found');
          }
        } catch (err: any) {
          console.error('API error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message || String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiDevServer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
