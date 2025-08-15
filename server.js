const { loadNuxt, build } = require("nuxt");
const fs = require("fs");
const https = require("https");
const http = require("http");

// Cấu hình SSL - ưu tiên Let's Encrypt certificates
const sslOptions = {
  key: process.env.SSL_KEY_PATH
    ? fs.readFileSync(process.env.SSL_KEY_PATH)
    : null,
  cert: process.env.SSL_CERT_PATH
    ? fs.readFileSync(process.env.SSL_CERT_PATH)
    : null,
  ca: process.env.SSL_CA_PATH ? fs.readFileSync(process.env.SSL_CA_PATH) : null,
};

// Kiểm tra SSL files
const hasSSL = sslOptions.key && sslOptions.cert;

async function startServer() {
  try {
    // Build ứng dụng nếu chưa build
    const nuxt = await loadNuxt({
      for: process.env.NODE_ENV === "production" ? "start" : "dev",
    });

    if (process.env.NODE_ENV === "production") {
      await build(nuxt);
    }

    const port = process.env.PORT || 3000;
    const host = process.env.HOST || "0.0.0.0";

    if (hasSSL) {
      // Tạo HTTPS server
      const httpsServer = https.createServer(sslOptions, nuxt.handler);
      httpsServer.listen(port, host, () => {
      });
    } else {
      // Tạo HTTP server (fallback)
      const httpServer = http.createServer(nuxt.handler);
      httpServer.listen(port, host, () => {
        console.log(
          "💡 Set SSL_KEY_PATH and SSL_CERT_PATH environment variables"
        );
      });
    }
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

startServer();
