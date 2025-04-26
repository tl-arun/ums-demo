const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stagingapi.teamleaseedtech.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/api',
      },
    })
  );
};