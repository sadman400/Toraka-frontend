# 👥 Team Collaboration Guide for Toraka

## Team Workflow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    TORAKA TEAM WORKFLOW                         │
└─────────────────────────────────────────────────────────────────┘

Developer A                Developer B                Developer C
    │                          │                          │
    ├─ feature/auth           ├─ feature/filters        ├─ fix/zoom
    │                          │                          │
    └──→ Create PR             └──→ Create PR            └──→ Create PR
         │                          │                         │
         ├─ GitHub Actions         ├─ GitHub Actions        ├─ GitHub Actions
         │  (Lint, Build, Test)    │  (Lint, Build, Test)   │  (Lint, Build, Test)
         │                          │                         │
         ├─ Code Review            ├─ Code Review           ├─ Code Review
         │  (Team Approval)        │  (Team Approval)       │  (Team Approval)
         │                          │                         │
         └─ Merge to main          └─ Merge to main         └─ Merge to main
              │                         │                        │
              └─────────────────────────┴────────────────────────┘
                              │
                    GitHub Actions Deploy
                              │
                    ┌─────────┴─────────┐
                    │                   │
                  Build              Test
                    │                   │
                    └─────────┬─────────┘
                              │
                        Deploy to Vercel
                              │
                    ┌─────────┴─────────┐
                    │                   │
              Production          Analytics
              (toraka.vercel.app)   Monitoring
```

---

## Step-by-Step: How a Developer Contributes

### Phase 1: Setup (One-time)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_ORG/toraka.git
cd toraka

# 2. Install dependencies
npm install

# 3. Create local development branch
git checkout -b develop
git pull origin develop
```

### Phase 2: Work on Feature

```bash
# 1. Create feature branch from develop
git checkout -b feature/add-bookmarks-filter

# 2. Make changes
# ... edit files in your editor ...

# 3. Test locally
npm run dev
# Open http://localhost:3000 and test

# 4. Run linting
npm run lint

# 5. Build to verify
npm run build
```

### Phase 3: Commit & Push

```bash
# 1. Check what changed
git status

# 2. Stage changes
git add .

# 3. Commit with descriptive message
git commit -m "feat: add advanced bookmarks filter with genre support"

# 4. Push to GitHub
git push origin feature/add-bookmarks-filter
```

### Phase 4: Create Pull Request

1. Go to GitHub repository
2. Click **"Pull requests"** tab
3. Click **"New pull request"**
4. Select:
   - **Base**: `main` (or `develop`)
   - **Compare**: `feature/add-bookmarks-filter`
5. Add title: `Add advanced bookmarks filter`
6. Add description:
   ```
   ## What does this PR do?
   Adds advanced filtering for bookmarks by genre, status, and source.
   
   ## Changes
   - Added GenresFilter component
   - Updated BookmarksSection with new filter logic
   - Added filter state management
   
   ## Testing
   - Tested on desktop and mobile
   - All filters working correctly
   - No console errors
   
   ## Screenshots
   [Optional: Add screenshots]
   ```
7. Click **"Create pull request"**

### Phase 5: Automated Checks

GitHub Actions automatically:
- ✅ Installs dependencies
- ✅ Runs linting (`npm run lint`)
- ✅ Builds project (`npm run build`)
- ✅ Reports results

**If checks fail:**
1. Click on the failed check
2. Read the error message
3. Fix the issue locally
4. Push again: `git push origin feature/add-bookmarks-filter`
5. Checks run automatically again

### Phase 6: Code Review

Team members review your code:
- Click **"Files changed"** to see what you changed
- Leave comments on specific lines
- Request changes if needed
- Approve when satisfied

**If changes requested:**
1. Make the changes locally
2. Commit: `git commit -m "refactor: address review feedback"`
3. Push: `git push origin feature/add-bookmarks-filter`
4. Comments automatically update

### Phase 7: Merge & Deploy

1. Once approved, click **"Merge pull request"**
2. Choose merge strategy:
   - **Create a merge commit** (recommended for teams)
   - **Squash and merge** (cleaner history)
   - **Rebase and merge** (linear history)
3. Click **"Confirm merge"**

**Automatic deployment:**
- GitHub Actions triggers
- Builds and tests
- Deploys to Vercel
- Your changes are live! 🎉

---

## Branch Strategy

### Recommended: Git Flow

```
main (Production)
  ↑
  └─ develop (Staging)
      ↑
      ├─ feature/auth
      ├─ feature/filters
      ├─ fix/zoom-glitch
      └─ refactor/bundle-size
```

### How It Works

1. **main**: Always production-ready
2. **develop**: Integration branch for features
3. **feature/\***: Individual developer branches

### Workflow

```bash
# 1. Create feature from develop
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. Work and commit
git add .
git commit -m "feat: my feature"
git push origin feature/my-feature

# 3. Create PR to develop (not main!)
# ... code review ...
# ... merge to develop ...

# 4. When ready for production, create PR from develop to main
# ... final review ...
# ... merge to main ...
# ... automatic deployment! ...
```

---

## Commit Message Convention

Use clear, descriptive commit messages:

```
feat: add new feature
fix: fix a bug
docs: update documentation
refactor: refactor code without changing behavior
style: fix formatting or linting issues
test: add or update tests
chore: update dependencies or build tools
perf: improve performance
ci: update CI/CD configuration
```

### Examples

```
✅ Good:
feat: add advanced bookmarks filter with genre support
fix: resolve zoom glitch in hero carousel
docs: update deployment guide with team workflow

❌ Bad:
update stuff
fix bug
changes
```

---

## Code Review Checklist

When reviewing a PR, check:

- [ ] Code follows project style
- [ ] No console errors or warnings
- [ ] Changes are well-documented
- [ ] Tests are included (if applicable)
- [ ] Performance impact is acceptable
- [ ] No breaking changes
- [ ] Commit messages are clear
- [ ] PR description is complete

---

## Handling Conflicts

### If Two Developers Edit Same File

```bash
# 1. Pull latest develop
git fetch origin
git rebase origin/develop

# 2. Resolve conflicts in your editor
# Look for:
# <<<<<<< HEAD
# Your changes
# =======
# Their changes
# >>>>>>> branch-name

# 3. Fix the conflicts manually

# 4. Stage and commit
git add .
git commit -m "resolve merge conflicts"

# 5. Push
git push origin feature/your-feature
```

---

## Team Communication

### Use GitHub Features

1. **Issues**: For bugs, features, and discussions
2. **Discussions**: For architecture decisions
3. **PR Comments**: For code-specific feedback
4. **Milestones**: For release planning

### Example Issue Template

```markdown
## Bug Report

**Description**
Describe the bug clearly

**Steps to Reproduce**
1. Do this
2. Then this
3. Bug happens

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- Browser: Chrome 120
- Device: MacBook Pro
- OS: macOS 14.2
```

---

## Release Process

### When Ready for Production

1. **Create Release Branch**
   ```bash
   git checkout -b release/v1.0.0
   ```

2. **Update Version**
   - Update `package.json` version
   - Update `CHANGELOG.md`

3. **Create PR to main**
   - Title: `Release v1.0.0`
   - Description: List all changes

4. **Final Review & Merge**
   - Team reviews
   - Merge to main
   - Automatic deployment!

5. **Tag Release**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

---

## Troubleshooting Common Issues

### "Your branch is behind origin/develop"

```bash
git fetch origin
git rebase origin/develop
git push origin feature/your-feature --force-with-lease
```

### "Merge conflict"

```bash
# Open conflicted files and manually resolve
# Then:
git add .
git commit -m "resolve conflicts"
git push origin feature/your-feature
```

### "Accidentally committed to main"

```bash
# Revert the commit
git revert HEAD
git push origin main

# Or reset (if not pushed yet)
git reset --soft HEAD~1
```

### "Need to update PR with latest changes"

```bash
git fetch origin
git rebase origin/develop
git push origin feature/your-feature --force-with-lease
```

---

## Best Practices

### Do's ✅

- ✅ Create small, focused PRs (easier to review)
- ✅ Write clear commit messages
- ✅ Test locally before pushing
- ✅ Run linting before committing
- ✅ Keep branches up to date with main
- ✅ Communicate in PR descriptions
- ✅ Review others' PRs promptly
- ✅ Use meaningful branch names

### Don'ts ❌

- ❌ Push directly to main
- ❌ Create huge PRs with many changes
- ❌ Ignore failing CI checks
- ❌ Merge without review
- ❌ Commit sensitive data (API keys, passwords)
- ❌ Force push to shared branches
- ❌ Ignore code review feedback
- ❌ Leave PRs open for too long

---

## Team Roles

### Repository Owner
- Manages repository settings
- Adds/removes team members
- Approves major releases
- Handles security issues

### Maintainers
- Review and merge PRs
- Manage issues and milestones
- Enforce code standards
- Plan releases

### Contributors
- Create feature branches
- Submit PRs
- Participate in code reviews
- Report issues

---

## Quick Commands Reference

```bash
# Clone repo
git clone https://github.com/ORG/toraka.git

# Create feature branch
git checkout -b feature/my-feature

# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "feat: description"

# Push
git push origin feature/my-feature

# Pull latest
git pull origin develop

# Update branch with latest main
git fetch origin
git rebase origin/main

# View branches
git branch -a

# Switch branch
git checkout develop

# Delete branch
git branch -d feature/my-feature

# View commit history
git log --oneline

# Undo last commit (not pushed)
git reset --soft HEAD~1
```

---

## Getting Help

1. **GitHub Docs**: https://docs.github.com
2. **Git Docs**: https://git-scm.com/doc
3. **Team Slack/Discord**: Ask team members
4. **GitHub Issues**: Create an issue for help

---

**Happy collaborating! 🚀**
