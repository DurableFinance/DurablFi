import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { registerOAuthRoutes } from '../server/_core/oauth';
import { registerStorageProxy } from '../server/_core/storageProxy';
import { appRouter } from '../server/routers';
import { createContext } from '../server/_core/context';
import { serveStatic } from '../server/_core/vite';

const app = express();

// Configure body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Register routes
registerStorageProxy(app);
registerOAuthRoutes(app);

// tRPC API
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve static files
serveStatic(app);

// Export handler for Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
