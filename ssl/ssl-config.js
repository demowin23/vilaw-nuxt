const fs = require("fs");
const path = require("path");

// Đường dẫn đến chứng chỉ SSL
const sslConfig = {
  key: process.env.SSL_KEY_PATH || path.join(__dirname, "private.key"),
  cert: process.env.SSL_CERT_PATH || path.join(__dirname, "certificate.crt"),
  ca: process.env.SSL_CA_PATH || null,
};

// Kiểm tra file tồn tại
const checkSSLFiles = () => {
  const keyExists = fs.existsSync(sslConfig.key);
  const certExists = fs.existsSync(sslConfig.cert);

    console.log("SSL Configuration:");
    console.log(`Private Key: ${sslConfig.key} - ${keyExists ? "✓" : "✗"}`);
    console.log(`Certificate: ${sslConfig.cert} - ${certExists ? "✓" : "✗"}`);

  return keyExists && certExists;
};

module.exports = {
  sslConfig,
  checkSSLFiles,
};
