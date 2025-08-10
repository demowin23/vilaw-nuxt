# 🔒 Hướng dẫn cài đặt SSL cho Vilaw Nuxt

## 📋 Yêu cầu hệ thống

- Ubuntu Server 18.04+ hoặc 20.04+
- Domain name trỏ đến server (vilaw.net.vn)
- Quyền sudo

## 🚀 Cài đặt nhanh

### 1. Clone và cài đặt

```bash
# Clone repository
git clone <your-repo>
cd vilaw-nuxt

# Cài đặt dependencies
npm install

# Build ứng dụng
npm run build
```

### 2. Chạy script cài đặt SSL

```bash
# Cấp quyền thực thi
chmod +x scripts/setup-ssl.sh

# Chạy script cài đặt
sudo bash scripts/setup-ssl.sh
```

## 🔧 Cài đặt thủ công

### 1. Cài đặt các package cần thiết

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx certbot python3-certbot-nginx openssl
```

### 2. Tạo chứng chỉ SSL

```bash
# Tạo thư mục SSL
sudo mkdir -p /etc/ssl/private /etc/ssl/certs

# Tạo chứng chỉ tự ký (development)
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/vilaw.key \
  -out /etc/ssl/certs/vilaw.crt \
  -subj "/C=VN/ST=Hanoi/L=Hanoi/O=Vilaw/OU=IT/CN=vilaw.net.vn"

# Hoặc sử dụng Let's Encrypt (production)
sudo certbot --nginx -d vilaw.net.vn -d www.vilaw.net.vn \
  --non-interactive --agree-tos --email admin@vilaw.net.vn
```

### 3. Cấu hình Nginx

```bash
# Tạo file cấu hình
sudo nano /etc/nginx/sites-available/vilaw

# Kích hoạt site
sudo ln -sf /etc/nginx/sites-available/vilaw /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Kiểm tra và khởi động lại
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 4. Cài đặt PM2

```bash
sudo npm install -g pm2

# Khởi động ứng dụng
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## 📊 Quản lý ứng dụng

### PM2 Commands

```bash
# Xem trạng thái
npm run pm2:status

# Khởi động
npm run pm2:start

# Dừng
npm run pm2:stop

# Khởi động lại
npm run pm2:restart

# Xem logs
npm run pm2:logs
```

### Kiểm tra SSL

```bash
# Kiểm tra trạng thái
npm run ssl:check

# Hoặc chạy trực tiếp
bash scripts/check-ssl.sh
```

## 🔍 Kiểm tra cài đặt

### 1. Kiểm tra website

- Mở https://vilaw.net.vn
- Kiểm tra biểu tượng khóa SSL
- Kiểm tra redirect từ HTTP sang HTTPS

### 2. Kiểm tra logs

```bash
# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# PM2 logs
pm2 logs vilaw-nuxt

# Application logs
tail -f logs/combined.log
```

### 3. Kiểm tra ports

```bash
sudo netstat -tlnp | grep -E ':(80|443|3000)'
```

## 🛠️ Xử lý sự cố

### SSL Certificate expired

```bash
# Gia hạn Let's Encrypt
sudo certbot renew

# Hoặc tạo mới
sudo certbot --nginx -d vilaw.net.vn -d www.vilaw.net.vn
```

### Nginx không khởi động

```bash
# Kiểm tra cấu hình
sudo nginx -t

# Kiểm tra logs
sudo journalctl -u nginx -f
```

### PM2 process crash

```bash
# Xem logs
pm2 logs vilaw-nuxt

# Khởi động lại
pm2 restart vilaw-nuxt

# Kiểm tra memory
pm2 monit
```

## 🔒 Bảo mật bổ sung

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

### 3. Auto-renewal SSL

```bash
# Thêm vào crontab
sudo crontab -e

# Thêm dòng này
0 12 * * * /usr/bin/certbot renew --quiet
```

## 📝 Ghi chú quan trọng

- **Let's Encrypt**: Chứng chỉ miễn phí, hết hạn sau 90 ngày
- **Auto-renewal**: Cần cấu hình cron job để tự động gia hạn
- **Backup**: Luôn backup chứng chỉ SSL và cấu hình Nginx
- **Monitoring**: Sử dụng PM2 và Nginx monitoring để theo dõi hiệu suất

## 🆘 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:

1. Logs của Nginx: `/var/log/nginx/`
2. Logs của PM2: `pm2 logs`
3. Logs của ứng dụng: `logs/` folder
4. Trạng thái services: `systemctl status nginx`

---

**Lưu ý**: Đảm bảo domain name đã trỏ đúng đến IP server trước khi cài đặt SSL.
