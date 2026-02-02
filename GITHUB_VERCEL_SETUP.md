# GitHub & Vercel Deployment Guide

Follow these steps to push your portfolio to GitHub and deploy it on Vercel.

## Step 1: Initialize Git Repository

Open your terminal in the Portfolio directory and run:

```bash
cd /Users/yungmanny/Desktop/Portfolio
git init
```

## Step 2: Add All Files to Git

```bash
git add .
```

## Step 3: Create Your First Commit

```bash
git commit -m "Initial commit: Portfolio website"
```

## Step 4: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `portfolio` (or any name you prefer)
   - **Description**: "My personal portfolio website"
   - **Visibility**: Choose **Public** (free) or **Private**
   - **DO NOT** check "Initialize with README" (we already have files)
5. Click **"Create repository"**

## Step 5: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Rename the branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note**: You'll be prompted for your GitHub username and password (or personal access token).

### If you need a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Give it a name and select `repo` scope
4. Copy the token and use it as your password when pushing

## Step 6: Deploy to Vercel

### Option A: Deploy via Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. You'll see your GitHub repositories. Find your portfolio repository and click **"Import"**
4. Vercel will auto-detect Next.js and configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
5. Click **"Deploy"**
6. Wait 1-2 minutes for deployment
7. Your site will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (select your account)
   - Link to existing project? **No**
   - Project name? (press Enter for default)
   - Directory? (press Enter for current directory)
   - Override settings? **No**

5. For production deployment:
```bash
vercel --prod
```

## Step 7: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain (e.g., `yourname.com`)
4. Follow DNS configuration instructions
5. Vercel will automatically set up SSL certificates

## Step 8: Future Updates

Whenever you make changes:

```bash
# Make your changes to files
# Then:

git add .
git commit -m "Description of your changes"
git push
```

Vercel will automatically detect the push and redeploy your site! 🎉

## Troubleshooting

### Build Fails on Vercel
- Make sure `package.json` has all dependencies
- Check Vercel build logs for specific errors
- Ensure your profile photo is in `public/images/profile-photo.jpg`

### Git Push Fails
- Make sure you're authenticated with GitHub
- Use a Personal Access Token instead of password
- Check that the remote URL is correct: `git remote -v`

### Site Not Updating
- Check Vercel deployment logs
- Make sure you pushed to the `main` branch
- Wait a few minutes for deployment to complete

## Quick Reference Commands

```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Your commit message"

# Connect to GitHub (first time only)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "Update description"
git push
```

## Need Help?

- **GitHub Docs**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
