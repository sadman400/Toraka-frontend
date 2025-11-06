# 🚀 Toraka Production Deployment Guide

## Overview

This guide explains how to deploy Toraka to production with GitHub and automatic CI/CD pipeline.

## Architecture

```
Developer Push
    ↓
GitHub Repository
    ↓
GitHub Actions (CI/CD)
    ├─ Run Tests
    ├─ Run Linting
    ├─ Build Project
    └─ Deploy to Production
    ↓
Vercel / Netlify (Live Site)
```

---

## Part 1: Initial Setup

### 1.1 GitHub Repository

Already done! Your code is on GitHub.

### 1.2 Hosting Platform

#### Option A: Vercel (Recommended)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Import Project"
4. Select your `toraka` repository
5. Click "Deploy"

**Result**: Your site is live at `toraka.vercel.app`

#### Option B: Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your `toraka` repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

---

## Part 2: GitHub Actions Setup

### What are GitHub Actions?

GitHub Actions are automated workflows that run when you push code or create PRs. They:
- ✅ Run tests and linting
- ✅ Build your project
- ✅ Deploy to production
- ✅ Notify you of failures

### Workflow Files

Three workflow files are already created in `.github/workflows/`:

1. **`vercel-deploy.yml`** - Deploys to production on push to main
2. **`pr-checks.yml`** - Runs checks on every PR
3. **`deploy.yml`** - Advanced setup with multiple options

### How They Work

#### When you push to `main`:
```
1. GitHub Actions triggers
2. Checks out your code
3. Installs dependencies
4. Runs linting
5. Builds the project
6. Deploys to Vercel/Netlify
7. Your site is updated! 🎉
```

#### When you create a PR:
```
1. GitHub Actions triggers
2. Runs all checks
3. Reports results on PR
4. Developers can review before merging
5. Only merge if checks pass
```

---

## Part 3: Setting Up Secrets

GitHub Actions needs credentials to deploy. These are stored as "Secrets".

### For Vercel Deployment

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

Add these secrets:

#### Secret 1: VERCEL_TOKEN
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Copy the token
4. In GitHub, paste it as `VERCEL_TOKEN`

#### Secret 2: VERCEL_ORG_ID
1. Go to https://vercel.com/account/settings
2. Find "Team ID" (if using team) or "User ID"
3. Copy and paste as `VERCEL_ORG_ID`

#### Secret 3: VERCEL_PROJECT_ID
1. Go to your Vercel project settings
2. Find "Project ID"
3. Copy and paste as `VERCEL_PROJECT_ID`

### For Netlify Deployment (Alternative)

Add these secrets:

#### NETLIFY_AUTH_TOKEN
1. Go to https://app.netlify.com/user/applications/personal-access-tokens
2. Click "New access token"
3. Copy and paste as `NETLIFY_AUTH_TOKEN`

#### NETLIFY_SITE_ID
1. Go to your Netlify site settings
2. Find "Site ID"
3. Copy and paste as `NETLIFY_SITE_ID`

---

## Part 4: Branch Protection Rules

This ensures code quality before merging to production.

### Setup Branch Protection

1. Go to GitHub repository
2. Click **Settings** → **Branches**
3. Click **"Add rule"** under "Branch protection rules"
4. Enter branch name: `main`
5. Enable these options:
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require code reviews before merging** (set to 1-2 reviewers)
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**

6. Click **"Create"**

### What This Means

- Developers **cannot push directly** to `main`
- All changes must go through **Pull Requests**
- **Automated checks must pass** before merging
- **Code reviews required** before merging
- **Automatic deployment** happens after merge

---

## Part 5: Developer Workflow

This is how your team will work:

### For a Developer Adding a Feature

```bash
# 1. Create a new branch
git checkout -b feature/add-bookmarks-filter

# 2. Make changes
# ... edit files ...

# 3. Commit changes
git add .
git commit -m "feat: add advanced bookmarks filter"

# 4. Push to GitHub
git push origin feature/add-bookmarks-filter

# 5. Create Pull Request on GitHub
# Go to GitHub → Click "Compare & pull request"
# Add description of changes
# Click "Create pull request"

# 6. GitHub Actions runs checks automatically
# If checks pass → Ready for review
# If checks fail → Fix issues and push again

# 7. Team reviews the PR
# Comments, suggestions, approvals

# 8. Merge to main
# Click "Merge pull request"

# 9. GitHub Actions deploys automatically
# Your changes are live! 🎉
```

### Branch Naming Convention

Use descriptive branch names:

```
feature/add-user-authentication
feature/improve-hero-carousel
fix/zoom-glitch-in-slider
fix/search-modal-keyboard-shortcut
docs/update-deployment-guide
refactor/optimize-bundle-size
```

---

## Part 6: Deployment Checklist

Before pushing to production:

- [ ] Code is tested locally
- [ ] No console errors or warnings
- [ ] ESLint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Changes are documented
- [ ] PR has been reviewed
- [ ] All checks pass on GitHub Actions

---

## Part 7: Monitoring Deployments

### Check Deployment Status

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. See all workflow runs
4. Click on a run to see details

### Check Live Site

- **Vercel**: https://toraka.vercel.app (or your custom domain)
- **Netlify**: https://toraka.netlify.app (or your custom domain)

### Rollback (If Something Goes Wrong)

```bash
# Revert the last commit
git revert HEAD

# Push to main
git push origin main

# GitHub Actions will deploy the previous version
```

---

## Part 8: Environment Variables

For API keys, database URLs, etc.

### Local Development

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Production (Vercel)

1. Go to Vercel project settings
2. Click **"Environment Variables"**
3. Add your production variables
4. Redeploy

### Production (Netlify)

1. Go to Netlify site settings
2. Click **"Build & deploy"** → **"Environment"**
3. Add your production variables
4. Redeploy

---

## Part 9: Custom Domain

### For Vercel

1. Go to Vercel project settings
2. Click **"Domains"**
3. Add your domain (e.g., `toraka.com`)
4. Follow DNS setup instructions

### For Netlify

1. Go to Netlify site settings
2. Click **"Domain management"**
3. Add your domain
4. Follow DNS setup instructions

---

## Part 10: Troubleshooting

### Build Fails on GitHub Actions

1. Check the error in GitHub Actions logs
2. Fix the issue locally
3. Run `npm run build` to verify
4. Push again

### Deployment Doesn't Trigger

1. Verify you pushed to `main` branch
2. Check GitHub Actions tab for errors
3. Verify secrets are set correctly
4. Check branch protection rules

### Site Shows Old Version

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check Vercel/Netlify deployment status
4. Trigger manual redeploy if needed

---

## Part 11: Team Collaboration Best Practices

### Code Review Process

1. **Create PR** with clear description
2. **Request reviewers** (1-2 team members)
3. **Address feedback** with new commits
4. **Approve and merge** when ready
5. **Automatic deployment** happens

### Communication

- Use PR descriptions to explain changes
- Comment on specific lines for feedback
- Use GitHub discussions for architecture decisions
- Document major changes in CHANGELOG.md

### Commit Message Format

```
feat: add new feature
fix: fix a bug
docs: update documentation
refactor: refactor code
style: fix formatting
test: add tests
chore: update dependencies
```

---

## Part 12: Performance Monitoring

### Vercel Analytics

1. Go to Vercel project
2. Click **"Analytics"**
3. Monitor Core Web Vitals
4. Check deployment performance

### Netlify Analytics

1. Go to Netlify site
2. Click **"Analytics"**
3. Monitor traffic and performance

---

## Quick Reference

### Commands

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/toraka.git

# Create new branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature"

# Push to GitHub
git push origin feature/your-feature

# View logs
git log --oneline

# Switch branches
git checkout main
git checkout feature/your-feature
```

### Useful Links

- GitHub: https://github.com/YOUR_USERNAME/toraka
- Vercel: https://vercel.com/dashboard
- Netlify: https://app.netlify.com
- GitHub Actions: https://docs.github.com/en/actions

---

## Support

For issues or questions:
1. Check GitHub Actions logs
2. Review GitHub documentation
3. Check Vercel/Netlify documentation
4. Ask team members in discussions

---

**Happy Deploying! 🚀**
