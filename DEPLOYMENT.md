# 🚀 Hướng dẫn triển khai Vilaw Nuxt lên Ubuntu Server

## 📋 Chuẩn bị

### 1. Trên máy local (Windows)

```bash
# Build ứng dụng
npm run build

# Commit và push code
git add .
git commit -m "Add SSL configuration"
git push origin main
```

### 2. Trên Ubuntu Server

```bash
# Clone repository
git clone <your-repo-url>
cd vilaw-nuxt

# Cài đặt Node.js và npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cài đặt yarn
npm install -g yarn

# Cài đặt dependencies
yarn install
```

## 🔒 Cài đặt SSL

### 1. Chạy script tự động

```bash
# Cấp quyền thực thi
chmod +x scripts/setup-ssl.sh

# Chạy script cài đặt
sudo bash scripts/setup-ssl.sh
```

### 2. Hoặc cài đặt thủ công

```bash
# Cài đặt packages
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx openssl

# Tạo chứng chỉ SSL
sudo mkdir -p /etc/ssl/private /etc/ssl/certs
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/vilaw.key \
  -out /etc/ssl/certs/vilaw.crt \
  -subj "/C=VN/ST=Hanoi/L=Hanoi/O=Vilaw/OU=IT/CN=vilaw.net.vn"

# Cài đặt Let's Encrypt
sudo certbot --nginx -d vilaw.net.vn -d www.vilaw.net.vn \
  --non-interactive --agree-tos --email admin@vilaw.net.vn
```

## 🌐 Cấu hình Nginx

### 1. Tạo file cấu hình

```bash
sudo nano /etc/nginx/sites-available/vilaw
```

### 2. Nội dung file cấu hình

```nginx
server {
    listen 80;
    server_name vilaw.net.vn www.vilaw.net.vn;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name vilaw.net.vn www.vilaw.net.vn;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/vilaw.net.vn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vilaw.net.vn/privkey.pem;

    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Nuxt app
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Kích hoạt site

```bash
sudo ln -sf /etc/nginx/sites-available/vilaw /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## 📱 Cài đặt PM2

### 1. Cài đặt PM2

```bash
sudo npm install -g pm2
```

### 2. Khởi động ứng dụng

```bash
# Build ứng dụng
npm run build

# Khởi động với PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## 🔍 Kiểm tra

### 1. Kiểm tra trạng thái

```bash
# PM2 status
pm2 status

# Nginx status
sudo systemctl status nginx

# SSL check
bash scripts/check-ssl.sh
```

### 2. Kiểm tra website

- Mở https://vilaw.net.vn
- Kiểm tra SSL certificate
- Kiểm tra redirect HTTP → HTTPS

## 🛠️ Quản lý

### PM2 Commands

```bash
pm2 status          # Xem trạng thái
pm2 restart all     # Khởi động lại tất cả
pm2 logs vilaw-nuxt # Xem logs
pm2 monit           # Monitor real-time
```

### Nginx Commands

```bash
sudo nginx -t              # Kiểm tra cấu hình
sudo systemctl reload nginx # Reload cấu hình
sudo systemctl restart nginx # Khởi động lại
```

### SSL Renewal

```bash
# Gia hạn Let's Encrypt
sudo certbot renew

# Kiểm tra auto-renewal
sudo crontab -l
```

## 🚨 Xử lý sự cố

### 1. PM2 process crash

```bash
pm2 logs vilaw-nuxt
pm2 restart vilaw-nuxt
```

### 2. Nginx error

```bash
sudo nginx -t
sudo journalctl -u nginx -f
```

### 3. SSL issues

```bash
sudo certbot certificates
sudo certbot --nginx -d vilaw.net.vn
```

## 📊 Monitoring

### 1. Logs

```bash
# Application logs
tail -f logs/combined.log

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# PM2 logs
pm2 logs vilaw-nuxt
```

### 2. Performance

```bash
# PM2 monitoring
pm2 monit

# System resources
htop
df -h
free -h
```

## 🔒 Bảo mật

### 1. Firewall

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 2. Fail2ban

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 📝 Ghi chú

- **Domain**: Đảm bảo vilaw.net.vn đã trỏ đến IP server
- **SSL**: Let's Encrypt tự động gia hạn mỗi 90 ngày
- **Backup**: Backup cấu hình Nginx và chứng chỉ SSL
- **Updates**: Cập nhật hệ thống và packages thường xuyên

---

**Lưu ý**: Scripts cài đặt sẽ tự động thực hiện tất cả các bước trên.
