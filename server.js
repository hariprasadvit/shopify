const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const SHOPIFY_STORE = 'kubox-7291.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = '095ee2e8ebb84ea94284a19ca00c04c7';

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Test endpoint to check API connection
  if (req.url === '/api/test' && req.method === 'GET') {
    const testQuery = JSON.stringify({
      query: `{ shop { name } }`
    });
    
    const options = {
      hostname: SHOPIFY_STORE,
      path: '/api/2024-10/graphql.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
        'Content-Length': Buffer.byteLength(testQuery)
      }
    };

    const proxyReq = https.request(options, (proxyRes) => {
      let data = '';
      proxyRes.on('data', (chunk) => { data += chunk; });
      proxyRes.on('end', () => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          status: proxyRes.statusCode,
          response: JSON.parse(data)
        }));
      });
    });

    proxyReq.on('error', (error) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    });

    proxyReq.write(testQuery);
    proxyReq.end();
    return;
  }

  // Handle Shopify API proxy for products
  if (req.url === '/api/shopify/products' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      const requestData = JSON.stringify(JSON.parse(body));
      
      const options = {
        hostname: SHOPIFY_STORE,
        path: '/api/2024-10/graphql.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
          'Content-Length': Buffer.byteLength(requestData)
        }
      };

      const proxyReq = https.request(options, (proxyRes) => {
        let data = '';

        proxyRes.on('data', (chunk) => {
          data += chunk;
        });

        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(data);
        });
      });

      proxyReq.on('error', (error) => {
        console.error('Proxy error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      });

      proxyReq.write(requestData);
      proxyReq.end();
    });
    
    return;
  }

  // Handle Shopify API proxy for checkout
  if (req.url === '/api/shopify/checkout' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      const requestData = JSON.stringify(JSON.parse(body));
      
      const options = {
        hostname: SHOPIFY_STORE,
        path: '/api/2024-10/graphql.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
          'Content-Length': Buffer.byteLength(requestData)
        }
      };

      const proxyReq = https.request(options, (proxyRes) => {
        let data = '';

        proxyRes.on('data', (chunk) => {
          data += chunk;
        });

        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(data);
        });
      });

      proxyReq.on('error', (error) => {
        console.error('Checkout proxy error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      });

      proxyReq.write(requestData);
      proxyReq.end();
    });
    
    return;
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Serve static files
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './shopify-products.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}/`);
  console.log(`📦 Shopify products will be fetched from: ${SHOPIFY_STORE}`);
  console.log(`\n✨ Open http://localhost:${PORT}/shopify-products.html in your browser\n`);
});
