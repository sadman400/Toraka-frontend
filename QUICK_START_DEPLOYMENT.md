# ⚡ Quick Start: Deploy Toraka in 10 Minutes

## Step-by-Step (Copy & Paste)

### Step 1: Push Code to GitHub (5 minutes)

```bash
# Navigate to your project
cd /Users/sadmanhossain/Upwork\ Projects/toraka/Torakatailwind

# Initialize git (if not done)
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Toraka entertainment hub"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/toraka.git

# Rename to main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel (3 minutes)

1. Go to https://vercel.com
2. Click **"Sign Up"** → Choose **"GitHub"**
3. Authorize Vercel
4. Click **"Import Project"**
5. Select your `toraka` repository
6. Click **"Deploy"**

**Wait 2-3 minutes... Your site is live!** 🎉

### Step 3: Set Up GitHub Actions (2 minutes)

1. Go to your GitHub repository
2. Click **"Settings"** → **"Secrets and variables"** → **"Actions"**
3. Click **"New repository secret"**

Add these 3 secrets:

**Secret 1: VERCEL_TOKEN**
- Go to https://vercel.com/account/tokens
- Create token, copy it
- Paste in GitHub as `VERCEL_TOKEN`

**Secret 2: VERCEL_ORG_ID**
- Go to https://vercel.com/account/settings
- Copy "User ID" or "Team ID"
- Paste in GitHub as `VERCEL_ORG_ID`

**Secret 3: VERCEL_PROJECT_ID**
- Go to your Vercel project settings
- Copy "Project ID"
- Paste in GitHub as `VERCEL_PROJECT_ID`

**Done!** Now every push to `main` automatically deploys! 🚀

---

## How It Works Now

### When You Push Code:

```
You: git push origin main
    ↓
GitHub: Receives your code
    ↓
GitHub Actions: Runs automatically
    ├─ Installs dependencies
    ├─ Runs linting
    ├─ Builds project
    └─ Deploys to Vercel
    ↓
Your Site: Updated automatically! ✅
```

### When Your Team Creates a PR:

```
Developer: Creates Pull Request
    ↓
GitHub Actions: Runs checks
    ├─ Linting ✓
    ├─ Build ✓
    └─ Reports results
    ↓
Team: Reviews code
    ↓
Merge: Approved
    ↓
GitHub Actions: Deploys to production
    ↓
Site: Updated! 🎉
```

---

## Team Workflow

### Developer Adds a Feature

```bash
# 1. Create feature branch
git checkout -b feature/add-filters

# 2. Make changes
# ... edit files ...

# 3. Commit
git add .
git commit -m "feat: add advanced filters"

# 4. Push
git push origin feature/add-filters

# 5. Go to GitHub → Create Pull Request
# 6. Wait for checks to pass
# 7. Team reviews and approves
# 8. Merge to main
# 9. Automatic deployment! 🚀
```

---

## Verify Everything Works

### Test Deployment

1. Make a small change (e.g., update README)
2. Push to main:
   ```bash
   git add .
   git commit -m "test: verify deployment"
   git push origin main
   ```
3. Go to GitHub → **"Actions"** tab
4. Watch the workflow run
5. Check your Vercel site for the change

---

## Troubleshooting

### "Build failed" in GitHub Actions

1. Check the error message in GitHub Actions
2. Fix the issue locally
3. Run `npm run build` to test
4. Push again

### Secrets not working

1. Verify all 3 secrets are added
2. Check secret names are exactly:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
3. Re-add if needed

### Site not updating

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check Vercel deployment status
4. Check GitHub Actions logs

---

## What You've Accomplished

✅ Code on GitHub
✅ Live site on Vercel
✅ Automatic deployments
✅ CI/CD pipeline
✅ Team-ready workflow

---

## Next Steps

1. **Set up branch protection** (prevents direct pushes to main)
2. **Add team members** to GitHub repository
3. **Create development branch** for ongoing work
4. **Set up custom domain** on Vercel
5. **Monitor analytics** on Vercel dashboard

---

## Useful Links

- Your GitHub Repo: https://github.com/YOUR_USERNAME/toraka
- Your Live Site: https://toraka.vercel.app
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub Actions: https://github.com/YOUR_USERNAME/toraka/actions

---

**You're now production-ready! 🚀**
