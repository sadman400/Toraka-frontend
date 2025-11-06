# 🏢 cPanel/Hostinger Deployment Guide

## Overview

cPanel is a control panel used by Hostinger, Bluehost, GoDaddy, and other hosting providers. This guide shows how to deploy Toraka to cPanel with automatic GitHub Actions deployments.

---

## Prerequisites

- ✅ cPanel hosting account with Node.js support
- ✅ SSH access enabled
- ✅ GitHub repository with code
- ✅ Basic terminal knowledge

---

## Step 1: Enable SSH Access in cPanel

### 1.1 Log in to cPanel
1. Go to your hosting provider's control panel
2. Log in with your credentials

### 1.2 Enable SSH
1. Go to **Advanced** → **SSH Access**
2. Click **Manage SSH Keys**
3. Click **Generate a New Key**
4. Fill in:
   - **Key Name**: `github-deploy`
   - **Key Type**: RSA
   - **Key Size**: 2048 or 4096
5. Click **Generate Key**
6. Download the **Private Key** (save it safely!)
7. Click **Authorize** to authorize the key

### 1.3 Get Your SSH Details
1. Go to **Advanced** → **SSH Access**
2. Note your SSH access details:
   - **Host**: Your domain or IP
   - **Username**: Your cPanel username
   - **Port**: Usually 22

---

## Step 2: Set Up Node.js in cPanel

### 2.1 Create Node.js Application
1. Go to **Software** → **Node.js Selector**
2. Click **Create Application**
3. Fill in:
   - **Node.js version**: 20.x (or latest)
   - **Application mode**: Production
   - **Application root**: `/public_html/toraka` (or your path)
   - **Application URL**: Your domain
   - **Application startup file**: `server.js` (or `npm start`)
4. Click **Create**

### 2.2 Verify Installation
SSH into your server:
```bash
ssh -i /path/to/private/key username@your-domain.com

# Check Node.js
node --version
npm --version

# Check PM2 (process manager)
pm2 --version
```

If PM2 is not installed:
```bash
npm install -g pm2
```

---

## Step 3: Clone Your Repository

### 3.1 SSH into Your Server
```bash
ssh -i /path/to/private/key username@your-domain.com
```

### 3.2 Navigate to App Directory
```bash
cd ~/public_html/toraka
# or wherever your app path is
```

### 3.3 Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/toraka.git .
```

### 3.4 Install Dependencies
```bash
npm ci --production
```

### 3.5 Build the App
```bash
npm run build
```

### 3.6 Start with PM2
```bash
pm2 start npm --name "toraka" -- start

# Make PM2 start on boot
pm2 startup
pm2 save
```

---

## Step 4: Store SSH Key in GitHub

### 4.1 Add SSH Key as Secret
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

### 4.2 Add Secrets

**Secret 1: CPANEL_SSH_KEY**
- Name: `CPANEL_SSH_KEY`
- Value: Paste the entire private key (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`)

**Secret 2: CPANEL_HOST**
- Name: `CPANEL_HOST`
- Value: Your domain or IP address (e.g., `example.com` or `123.45.67.89`)

**Secret 3: CPANEL_USERNAME**
- Name: `CPANEL_USERNAME`
- Value: Your cPanel username

**Secret 4: CPANEL_SSH_PORT**
- Name: `CPANEL_SSH_PORT`
- Value: `22` (usually)

**Secret 5: CPANEL_APP_PATH**
- Name: `CPANEL_APP_PATH`
- Value: Path to your app (e.g., `/home/username/public_html/toraka`)

---

## Step 5: Use GitHub Actions Workflow

### 5.1 Copy Workflow File
The workflow file `.github/workflows/cpanel-deploy.yml` is already created in your repository.

### 5.2 Verify Workflow
1. Go to GitHub repository
2. Click **Actions** tab
3. You should see **"Deploy to cPanel"** workflow

### 5.3 Test Deployment
1. Make a small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "test: verify cPanel deployment"
   git push origin main
   ```
3. Go to GitHub → **Actions** tab
4. Watch the workflow run
5. Check your site for the change

---

## Step 6: Configure Domain

### 6.1 Point Domain to cPanel
1. Go to your domain registrar
2. Update DNS records to point to your hosting provider
3. Wait for DNS propagation (can take 24-48 hours)

### 6.2 Add Domain in cPanel
1. Go to **Addon Domains** or **Domains**
2. Add your domain
3. Point to `/public_html/toraka`

---

## Step 7: Set Up SSL Certificate

### 7.1 Auto-SSL in cPanel
1. Go to **SSL/TLS Status**
2. Click **Manage**
3. Select your domain
4. Click **Install** (Auto-SSL)
5. Wait for certificate installation

### 7.2 Force HTTPS
1. Go to **SSL/TLS Status**
2. Enable **HTTPS Redirect**

---

## Step 8: Monitor Deployments

### 8.1 Check GitHub Actions
1. Go to GitHub repository
2. Click **Actions** tab
3. See all deployment runs
4. Click on a run to see details

### 8.2 SSH into Server to Check
```bash
ssh -i /path/to/private/key username@your-domain.com

# Check PM2 status
pm2 status

# View logs
pm2 logs toraka

# Restart if needed
pm2 restart toraka
```

---

## Troubleshooting

### Build Fails in GitHub Actions

**Problem**: "Build failed"

**Solution**:
1. Check GitHub Actions logs
2. Run `npm run build` locally
3. Fix any errors
4. Push again

### Deployment Fails

**Problem**: "SSH connection failed"

**Solution**:
1. Verify SSH key is correct
2. Check `CPANEL_HOST` is correct
3. Check `CPANEL_USERNAME` is correct
4. Test SSH connection manually:
   ```bash
   ssh -i /path/to/private/key username@your-domain.com
   ```

### Site Shows Old Version

**Problem**: Changes not showing on live site

**Solution**:
1. SSH into server
2. Check PM2 status: `pm2 status`
3. Check logs: `pm2 logs toraka`
4. Restart: `pm2 restart toraka`
5. Clear browser cache

### PM2 Not Running

**Problem**: App is not running

**Solution**:
```bash
# SSH into server
ssh -i /path/to/private/key username@your-domain.com

# Check status
pm2 status

# Restart
pm2 restart toraka

# View logs
pm2 logs toraka
```

---

## Performance Tips

### 1. Enable Gzip Compression
In cPanel:
1. Go to **Software** → **EasyApache 4**
2. Enable **mod_deflate**

### 2. Enable Caching
In cPanel:
1. Go to **Performance** → **Caching**
2. Enable **Caching**

### 3. Optimize Images
- Use Next.js Image optimization (already done)
- Compress images before uploading

### 4. Monitor Resources
In cPanel:
1. Go to **Metrics** → **Resource Usage**
2. Monitor CPU, memory, bandwidth
3. Upgrade if needed

---

## Security Tips

### 1. Keep SSH Key Safe
- ✅ Store in GitHub Secrets (not in code)
- ✅ Never share the private key
- ✅ Rotate keys regularly

### 2. Use Strong Passwords
- ✅ Use strong cPanel password
- ✅ Change default SSH port (optional)
- ✅ Disable root login (optional)

### 3. Enable Firewall
In cPanel:
1. Go to **Security** → **Firewall**
2. Enable firewall
3. Whitelist necessary ports

### 4. Regular Backups
In cPanel:
1. Go to **Backup** → **Backup Wizard**
2. Set up automatic backups
3. Download backups regularly

---

## Maintenance

### Weekly
- [ ] Check GitHub Actions logs
- [ ] Monitor site performance
- [ ] Check error logs

### Monthly
- [ ] Review cPanel resource usage
- [ ] Check for updates
- [ ] Verify backups

### Quarterly
- [ ] Update Node.js version
- [ ] Update dependencies (`npm update`)
- [ ] Review security settings

---

## Useful Commands

```bash
# SSH into server
ssh -i /path/to/private/key username@your-domain.com

# Navigate to app
cd ~/public_html/toraka

# Check PM2 status
pm2 status

# View logs
pm2 logs toraka

# Restart app
pm2 restart toraka

# Stop app
pm2 stop toraka

# Start app
pm2 start npm --name "toraka" -- start

# Pull latest code
git pull origin main

# Install dependencies
npm ci --production

# Build app
npm run build

# Check Node version
node --version

# Check npm version
npm --version
```

---

## Comparison with Other Options

| Feature | cPanel | Vercel | DigitalOcean |
|---------|--------|--------|--------------|
| **Cost** | $5-15/mo | Free/$20/mo | $5-40/mo |
| **Ease** | Easy | Very Easy | Medium |
| **Control** | Limited | Very Limited | Full |
| **Performance** | Good | Excellent | Excellent |
| **Scalability** | Limited | Auto | Manual |

---

## Next Steps

1. ✅ Enable SSH access
2. ✅ Set up Node.js
3. ✅ Clone repository
4. ✅ Add GitHub secrets
5. ✅ Test deployment
6. ✅ Configure domain
7. ✅ Set up SSL
8. ✅ Monitor deployments

**Your Toraka app is now deployed to cPanel! 🎉**

---

## Support

### cPanel Documentation
- https://docs.cpanel.net

### Hosting Provider Support
- Hostinger: https://support.hostinger.com
- Bluehost: https://www.bluehost.com/support
- GoDaddy: https://www.godaddy.com/help

### GitHub Actions
- https://docs.github.com/en/actions

---

**Happy deploying! 🚀**
