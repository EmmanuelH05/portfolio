# Deployment Guide

This guide will help you deploy your portfolio website to either Netlify or Vercel.

## Prerequisites

1. **Add Your Profile Photo**
   - Place your profile photo in `public/images/profile-photo.jpg`
   - Recommended size: 800x800px or larger (square aspect ratio)
   - Supported formats: JPG, PNG, WebP

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Test Locally**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 to preview your site

4. **Test Build**
   ```bash
   npm run build
   npm start
   ```
   This ensures your site builds successfully before deployment

## Deploy to Netlify

### Option 1: Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

### Option 2: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Netlify will auto-detect Next.js and configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"
7. Your site will be live at `https://your-site-name.netlify.app`

### Netlify Configuration
The `netlify.toml` file is already configured. Netlify will automatically:
- Use the Next.js plugin for optimal performance
- Handle serverless functions
- Optimize images and assets

## Deploy to Vercel

### Option 1: Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```
   Follow the prompts to complete deployment

3. For production:
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js
6. Click "Deploy"
7. Your site will be live at `https://your-site-name.vercel.app`

### Vercel Configuration
The `vercel.json` file is already configured with:
- Build command
- Development command
- Framework detection
- Region settings

## Custom Domain

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

### Vercel
1. Go to Project settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

## Environment Variables

If you need to add environment variables (e.g., for contact form):

### Netlify
1. Go to Site settings → Environment variables
2. Add your variables
3. Redeploy

### Vercel
1. Go to Project settings → Environment Variables
2. Add your variables
3. Redeploy

## Post-Deployment Checklist

- [ ] Profile photo displays correctly
- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Contact form functions (if configured)
- [ ] Mobile responsiveness verified
- [ ] All links work correctly
- [ ] SEO metadata is correct
- [ ] Custom domain configured (if applicable)

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript compiles without errors: `npm run build`
- Check Netlify/Vercel build logs for specific errors

### Images Not Loading
- Verify image is in `public/images/` directory
- Check file name matches exactly (case-sensitive)
- Ensure image format is supported (JPG, PNG, WebP)

### Styling Issues
- Clear browser cache
- Verify Tailwind CSS is properly configured
- Check that `globals.css` is imported in `layout.tsx`

## Support

For issues specific to:
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Netlify**: [Netlify Documentation](https://docs.netlify.com)
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
