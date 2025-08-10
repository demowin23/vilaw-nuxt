#!/bin/bash

# Script kiểm tra trạng thái SSL
# Chạy: bash scripts/check-ssl.sh

echo "🔍 Kiểm tra trạng thái SSL cho Vilaw..."

# Kiểm tra chứng chỉ Let's Encrypt
echo "📋 Kiểm tra chứng chỉ Let's Encrypt:"
if [ -d "/etc/letsencrypt/live/vilaw.net.vn" ]; then
    echo "✅ Chứng chỉ Let's Encrypt tồn tại"
    echo "📅 Ngày hết hạn:"
    sudo openssl x509 -in /etc/letsencrypt/live/vilaw.net.vn/cert.pem -noout -dates
else
    echo "❌ Chứng chỉ Let's Encrypt không tồn tại"
fi

# Kiểm tra chứng chỉ tự ký
echo -e "\n🔑 Kiểm tra chứng chỉ tự ký:"
if [ -f "/etc/ssl/certs/vilaw.crt" ]; then
    echo "✅ Chứng chỉ tự ký tồn tại"
    echo "📅 Ngày hết hạn:"
    sudo openssl x509 -in /etc/ssl/certs/vilaw.crt -noout -dates
else
    echo "❌ Chứng chỉ tự ký không tồn tại"
fi

# Kiểm tra Nginx
echo -e "\n🌐 Kiểm tra Nginx:"
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx đang chạy"
    echo "📊 Trạng thái:"
    sudo systemctl status nginx --no-pager -l
else
    echo "❌ Nginx không chạy"
fi

# Kiểm tra PM2
echo -e "\n📱 Kiểm tra PM2:"
if command -v pm2 &> /dev/null; then
    echo "✅ PM2 đã cài đặt"
    echo "📊 Trạng thái ứng dụng:"
    pm2 status
else
    echo "❌ PM2 chưa cài đặt"
fi

# Kiểm tra kết nối HTTPS
echo -e "\n🔒 Kiểm tra kết nối HTTPS:"
if command -v curl &> /dev/null; then
    echo "🌐 Kiểm tra vilaw.net.vn:"
    curl -I https://vilaw.net.vn 2>/dev/null | head -5
    
    echo -e "\n🌐 Kiểm tra www.vilaw.net.vn:"
    curl -I https://www.vilaw.net.vn 2>/dev/null | head -5
else
    echo "⚠️  curl không có sẵn, không thể kiểm tra kết nối"
fi

# Kiểm tra port
echo -e "\n🔌 Kiểm tra port:"
echo "Port 80 (HTTP):"
sudo netstat -tlnp | grep :80 || echo "Port 80 không mở"

echo -e "\nPort 443 (HTTPS):"
sudo netstat -tlnp | grep :443 || echo "Port 443 không mở"

echo -e "\nPort 3000 (Nuxt):"
sudo netstat -tlnp | grep :3000 || echo "Port 3000 không mở"

echo -e "\n✅ Kiểm tra hoàn tất!"
