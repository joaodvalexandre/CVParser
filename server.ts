import { APP_BASE_HREF } from '@angular/common';
import { AngularAppEngine } from '@angular/ssr';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');


  const angularApp = new AngularAppEngine();


  server.set('view engine', 'html');
  server.set('views', browserDistFolder);


  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });


  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }));


  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;


    // Convert Express Request to Web Request
    const webRequest = new Request(`${protocol}://${headers.host}${originalUrl}`, {
      method: req.method,
      headers: headers as Record<string, string>,
    });


    angularApp
      .handle(webRequest, {
        platformProviders: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        document: indexHtml,
      })
      .then((response: Response | null) => {
        if (response) {
          response.text().then((html: string) => res.send(html));
        } else {
          res.status(500).send('Server rendering failed');
        }
      })
      .catch((err: Error) => next(err));
  });


  return server;
}


function run(): void {
  const port = process.env['PORT'] || 4000;


  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}


run();
