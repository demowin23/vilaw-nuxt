module.exports = {
  apps: [
    {
      name: "vilaw-nuxt",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "0.0.0.0",
        BASE_URL: "https://vilaw.net.vn/api/v1",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "0.0.0.0",
        BASE_URL: "https://vilaw.net.vn/api/v1",
        SSL_KEY_PATH: "/etc/ssl/private/vilaw.key",
        SSL_CERT_PATH: "/etc/ssl/certs/vilaw.crt",
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      max_memory_restart: "1G",
      restart_delay: 4000,
      max_restarts: 10,
    },
  ],
};
