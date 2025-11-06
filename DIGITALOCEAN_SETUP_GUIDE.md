# 🌐 DigitalOcean Deployment Guide

## Overview

DigitalOcean provides VPS (Virtual Private Servers) called Droplets. This guide shows how to deploy Toraka to DigitalOcean with automatic GitHub Actions deployments.

---

## Prerequisites

- ✅ DigitalOcean account
- ✅ SSH key pair
- ✅ GitHub repository with code
- ✅ Basic Linux/terminal knowledge

---

## Step 1: Create SSH Key Pair

### 1.1 Generate SSH Key Locally
```bash
ssh-keygen -t ed25519 -C "toraka-deploy"
```

When prompted:
- **File**: Press Enter (default location)
- **Passphrase**: Press Enter (no passphrase for automation)

### 1.2 Files Created
```
~/.ssh/id_ed25519          (private key - keep secret!)
~/.ssh/id_ed25519.pub      (public key - share with servers)
```

### 1.3 View Your Public Key
```bash
cat ~/.ssh/id_ed25519.pub
```

Copy this key - you'll need it for DigitalOcean.

---

## Step 2: Create DigitalOcean Droplet

### 2.1 Log in to DigitalOcean
1. Go to https://cloud.digitalocean.com
2. Log in to your account

### 2.2 Create Droplet
1. Click **Create** → **Droplets**
2. Choose settings:

**Image**
- Select: **Ubuntu 22.04 (LTS)**

**Size**
- Select: **$5/month** (Basic - 1GB RAM, 1 CPU, 25GB SSD)
- For production: **$12/month** or higher

**Region**
- Choose: Closest to your users

**Authentication**
- Select: **SSH key**
- Click **New SSH Key**
- Paste your public key (from `~/.ssh/id_ed25519.pub`)
- Name: `toraka-deploy`
- Click **Add SSH Key**

**Hostname**
- Name: `toraka-app` (or your preference)

3. Click **Create Droplet**

### 2.3 Wait for Creation
- Droplet creation takes 1-2 minutes
- You'll see your Droplet IP address once ready

---

## Step 3: Initial Server Setup

### 3.1 SSH into Your Droplet
```bash
ssh -i ~/.ssh/id_ed25519 root@YOUR_DROPLET_IP
```

Replace `YOUR_DROPLET_IP` with your actual IP.

### 3.2 Update System
```bash
apt update && apt upgrade -y
```

### 3.3 Create Non-Root User (Recommended)
```bash
# Create user
adduser deploy

# Add to sudo group
usermod -aG sudo deploy

# Switch to new user
su - deploy
```

### 3.4 Install Node.js
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 3.5 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2

# Enable PM2 to start on boot
pm2 startup
pm2 save
```

### 3.6 Install Nginx (Reverse Proxy)
```bash
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3.7 Install Git
```bash
sudo apt install -y git
```

---

## Step 4: Set Up Application Directory

### 4.1 Create App Directory
```bash
sudo mkdir -p /var/www/toraka
sudo chown deploy:deploy /var/www/toraka
cd /var/www/toraka
```

### 4.2 Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/toraka.git .
```

### 4.3 Install Dependencies
```bash
npm ci --production
```

### 4.4 Build Application
```bash
npm run build
```

### 4.5 Start with PM2
```bash
pm2 start npm --name "toraka" -- start

# Verify it's running
pm2 status

# Save PM2 configuration
pm2 save
```

---

## Step 5: Configure Nginx

### 5.1 Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/toraka
```

Paste this configuration:
```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
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

Save: `Ctrl+X` → `Y` → `Enter`

### 5.2 Enable Configuration
```bash
sudo ln -s /etc/nginx/sites-available/toraka /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 6: Set Up SSL Certificate (HTTPS)

### 6.1 Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 6.2 Get SSL Certificate
```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts:
- Enter email
- Agree to terms
- Choose to redirect HTTP to HTTPS

### 6.3 Verify SSL
Visit `https://your-domain.com` in your browser.

### 6.4 Auto-Renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot auto-renews automatically
```

---

## Step 7: Configure Firewall

### 7.1 Enable UFW Firewall
```bash
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## Step 8: Store SSH Key in GitHub

### 8.1 Add SSH Key as Secret
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### 8.2 Add Secrets

**Secret 1: DO_SSH_KEY**
- Name: `DO_SSH_KEY`
- Value: Paste your private key (from `~/.ssh/id_ed25519`)

**Secret 2: DO_HOST**
- Name: `DO_HOST`
- Value: Your Droplet IP address

**Secret 3: DO_USERNAME**
- Name: `DO_USERNAME`
- Value: `deploy` (or your username)

**Secret 4: DO_SSH_PORT**
- Name: `DO_SSH_PORT`
- Value: `22`

**Secret 5: DO_APP_PATH**
- Name: `DO_APP_PATH`
- Value: `/var/www/toraka`

---

## Step 9: Use GitHub Actions Workflow

### 9.1 Copy Workflow File
The workflow file `.github/workflows/digitalocean-deploy.yml` is already created.

### 9.2 Test Deployment
1. Make a small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "test: verify DigitalOcean deployment"
   git push origin main
   ```
3. Go to GitHub → **Actions** tab
4. Watch the workflow run
5. Check your site for the change

---

## Step 10: Configure Domain

### 10.1 Point Domain to Droplet
1. Go to your domain registrar
2. Update DNS records:
   - **A Record**: Point to your Droplet IP
   - **CNAME**: www → your-domain.com
3. Wait for DNS propagation (can take 24-48 hours)

### 10.2 Update Nginx Configuration
If you changed the domain, update `/etc/nginx/sites-available/toraka`:
```bash
sudo nano /etc/nginx/sites-available/toraka

# Update server_name line
server_name your-new-domain.com www.your-new-domain.com;

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

---

## Monitoring & Maintenance

### 11.1 Check Application Status
```bash
# SSH into Droplet
ssh -i ~/.ssh/id_ed25519 deploy@YOUR_DROPLET_IP

# Check PM2 status
pm2 status

# View logs
pm2 logs toraka

# Restart if needed
pm2 restart toraka
```

### 11.2 Monitor Droplet Resources
In DigitalOcean dashboard:
1. Click your Droplet
2. Go to **Monitoring** tab
3. View CPU, memory, disk usage

### 11.3 Check Nginx Logs
```bash
# Error logs
sudo tail -f /var/log/nginx/error.log

# Access logs
sudo tail -f /var/log/nginx/access.log
```

---

## Troubleshooting

### SSH Connection Failed

**Problem**: "Permission denied" or "Connection refused"

**Solution**:
1. Verify SSH key path: `~/.ssh/id_ed25519`
2. Check file permissions: `chmod 600 ~/.ssh/id_ed25519`
3. Verify Droplet IP is correct
4. Check firewall allows port 22

### Build Fails in GitHub Actions

**Problem**: "Build failed"

**Solution**:
1. Check GitHub Actions logs
2. Run `npm run build` locally
3. Fix any errors
4. Push again

### Deployment Fails

**Problem**: "SSH connection failed" in GitHub Actions

**Solution**:
1. Verify `DO_SSH_KEY` secret is correct
2. Verify `DO_HOST` is correct IP
3. Verify `DO_USERNAME` is correct
4. Test SSH manually:
   ```bash
   ssh -i ~/.ssh/id_ed25519 deploy@YOUR_DROPLET_IP
   ```

### Site Shows Old Version

**Problem**: Changes not showing on live site

**Solution**:
```bash
# SSH into Droplet
ssh -i ~/.ssh/id_ed25519 deploy@YOUR_DROPLET_IP

# Check PM2 status
pm2 status

# View logs
pm2 logs toraka

# Restart
pm2 restart toraka
```

### Out of Memory

**Problem**: App crashes due to memory

**Solution**:
1. Upgrade Droplet size in DigitalOcean dashboard
2. Optimize application
3. Enable swap:
   ```bash
   sudo fallocate -l 1G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

---

## Performance Optimization

### 1. Enable Gzip Compression
Add to `/etc/nginx/nginx.conf`:
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json;
gzip_min_length 1000;
```

### 2. Enable Caching
Add to Nginx configuration:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. Optimize Node.js
Set environment variables:
```bash
export NODE_ENV=production
export NODE_OPTIONS="--max-old-space-size=1024"
```

### 4. Monitor Performance
```bash
# Check system resources
free -h
df -h
top

# Check Node.js memory usage
ps aux | grep node
```

---

## Security Hardening

### 1. Disable Root Login
```bash
sudo nano /etc/ssh/sshd_config

# Change:
# PermitRootLogin no

sudo systemctl restart ssh
```

### 2. Change SSH Port (Optional)
```bash
sudo nano /etc/ssh/sshd_config

# Change:
# Port 2222

sudo ufw allow 2222/tcp
sudo systemctl restart ssh
```

### 3. Enable Fail2Ban
```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 4. Regular Updates
```bash
# Update system regularly
sudo apt update && sudo apt upgrade -y

# Update Node.js
sudo npm install -g npm@latest
```

---

## Backup Strategy

### 1. DigitalOcean Snapshots
In DigitalOcean dashboard:
1. Click your Droplet
2. Go to **Snapshots**
3. Click **Take Snapshot**
4. Wait for completion

### 2. Automated Backups
```bash
# Create backup script
sudo nano /usr/local/bin/backup-toraka.sh

#!/bin/bash
tar -czf /backups/toraka-$(date +%Y%m%d).tar.gz /var/www/toraka

# Make executable
sudo chmod +x /usr/local/bin/backup-toraka.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-toraka.sh
```

---

## Useful Commands

```bash
# SSH into Droplet
ssh -i ~/.ssh/id_ed25519 deploy@YOUR_DROPLET_IP

# Navigate to app
cd /var/www/toraka

# Check PM2 status
pm2 status

# View logs
pm2 logs toraka

# Restart app
pm2 restart toraka

# Pull latest code
git pull origin main

# Install dependencies
npm ci --production

# Build app
npm run build

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log

# Check system resources
free -h
df -h
top
```

---

## Scaling Your Application

### 1. Upgrade Droplet Size
In DigitalOcean dashboard:
1. Click your Droplet
2. Go to **Resize**
3. Choose larger size
4. Click **Resize**

### 2. Add More Droplets (Load Balancing)
1. Create additional Droplets
2. Set up load balancer in DigitalOcean
3. Point domain to load balancer

### 3. Use Managed Databases
1. Create managed PostgreSQL/MySQL
2. Update connection strings
3. Better performance and backups

---

## Comparison with Other Options

| Feature | DigitalOcean | Vercel | cPanel |
|---------|--------------|--------|--------|
| **Cost** | $5-40/mo | Free/$20/mo | $5-15/mo |
| **Ease** | Medium | Very Easy | Easy |
| **Control** | Full | Limited | Limited |
| **Performance** | Excellent | Excellent | Good |
| **Scalability** | Manual | Auto | Limited |

---

## Next Steps

1. ✅ Create Droplet
2. ✅ Set up Node.js
3. ✅ Clone repository
4. ✅ Configure Nginx
5. ✅ Set up SSL
6. ✅ Add GitHub secrets
7. ✅ Test deployment
8. ✅ Configure domain

**Your Toraka app is now deployed to DigitalOcean! 🎉**

---

## Support

### DigitalOcean Documentation
- https://docs.digitalocean.com

### DigitalOcean Community
- https://www.digitalocean.com/community/tutorials

### GitHub Actions
- https://docs.github.com/en/actions

---

**Happy deploying! 🚀**
