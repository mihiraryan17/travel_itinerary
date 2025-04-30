const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Your API endpoint prefix
    createProxyMiddleware({
      target: "http://localhost:8000", // Backend URL
      changeOrigin: true,
    })
  );
};
