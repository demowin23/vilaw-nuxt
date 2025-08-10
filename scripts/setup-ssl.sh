#!/bin/bash

# Script cài đặt SSL cho Vilaw Nuxt trên Ubuntu Server
# Chạy với quyền sudo: sudo bash scripts/setup-ssl.sh

echo "🔒 Bắt đầu cài đặt SSL cho Vilaw Nuxt..."

# Cập nhật hệ thống
echo "📦 Cập nhật hệ thống..."
sudo apt update && sudo apt upgrade -y

# Cài đặt các package cần thiết
echo "📦 Cài đặt các package cần thiết..."
sudo apt install -y nginx certbot python3-certbot-nginx openssl

# Tạo thư mục SSL
echo "📁 Tạo thư mục SSL..."
sudo mkdir -p /etc/ssl/private
sudo mkdir -p /etc/ssl/certs

# Tạo chứng chỉ SSL tự ký (cho development)
echo "🔑 Tạo chứng chỉ SSL tự ký..."
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/vilaw.key \
  -out /etc/ssl/certs/vilaw.crt \
  -subj "/C=VN/ST=Hanoi/L=Hanoi/O=Vilaw/OU=IT/CN=vilaw.net.vn"

# Cài đặt Let's Encrypt (cho production)
echo "🌐 Cài đặt Let's Encrypt..."
sudo certbot --nginx -d vilaw.net.vn -d www.vilaw.net.vn --non-interactive --agree-tos --email admin@vilaw.net.vn

# Cấu hình Nginx
echo "⚙️  Cấu hình Nginx..."
sudo tee /etc/nginx/sites-available/vilaw << EOF
server {
    listen 80;
    server_name vilaw.net.vn www.vilaw.net.vn;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vilaw.net.vn www.vilaw.net.vn;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/vilaw.net.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vilaw.net.vn/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/vilaw.net.vn/chain.pem;

    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy to Nuxt app
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Kích hoạt site
echo "🔗 Kích hoạt site Nginx..."
sudo ln -sf /etc/nginx/sites-available/vilaw /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Kiểm tra cấu hình Nginx
echo "✅ Kiểm tra cấu hình Nginx..."
sudo nginx -t

# Khởi động lại Nginx
echo "🔄 Khởi động lại Nginx..."
sudo systemctl restart nginx
sudo systemctl enable nginx

# Cài đặt PM2
echo "📦 Cài đặt PM2..."
sudo npm install -g pm2

# Tạo thư mục logs
echo "📁 Tạo thư mục logs..."
mkdir -p logs

# Cài đặt dependencies
echo "📦 Cài đặt dependencies..."
npm install

# Build ứng dụng
echo "🔨 Build ứng dụng..."
npm run build

# Khởi động ứng dụng với PM2
echo "🚀 Khởi động ứng dụng với PM2..."
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

echo "✅ Cài đặt SSL hoàn tất!"
echo "🌐 Website: https://vilaw.net.vn"
echo "📊 PM2 Status: pm2 status"
echo "📝 PM2 Logs: pm2 logs vilaw-nuxt"
echo "🔄 Restart: pm2 restart vilaw-nuxt"
