import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

const browserDistFolder = join(import.meta.dirname, '../browser');
const isBrowserBuildExists = existsSync(browserDistFolder);

const app = express();

let angularApp: AngularNodeAppEngine | null = null;

/**
 * Initialize Angular App Engine (solo si existe la build)
 */
async function initializeAngularApp() {
  if (!isBrowserBuildExists) {
    return null;
  }
  
  if (!angularApp) {
    try {
      angularApp = new AngularNodeAppEngine();
    } catch (error) {
      console.warn('SSR initialization warning:', error);
      return null;
    }
  }
  return angularApp;
}

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
if (isBrowserBuildExists) {
  app.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
      redirect: false,
    }),
  );
}

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use(async (req, res, next) => {
  const ssr = await initializeAngularApp();
  
  if (ssr && isBrowserBuildExists) {
    try {
      const response = await ssr.handle(req);
      if (response) {
        writeResponseToNodeResponse(response, res);
        return;
      }
    } catch (error) {
      console.error('Error handling request:', error);
    }
  }

  if (isBrowserBuildExists) {
    return res.sendFile(join(browserDistFolder, 'index.html'));
  }

  next();
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
