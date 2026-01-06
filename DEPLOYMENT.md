# 🚀 Deployment Guide

This guide covers deploying the Luiza Portfolio website to various hosting platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Building for Production](#building-for-production)
- [Deployment Platforms](#deployment-platforms)
  - [Netlify](#netlify-recommended)
  - [Vercel](#vercel)
  - [GitHub Pages](#github-pages)
  - [Custom Server](#custom-server)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure:

1. All content is finalized (images, text, fonts)
2. Contact form backend is set up (if needed)
3. Analytics tracking code is added (optional)
4. SEO meta tags are configured
5. Production build works locally

## Building for Production

Always test the production build locally before deploying:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The build creates a `dist/` directory containing:
- Optimized HTML
- Minified CSS (~73KB, ~12KB gzipped)
- Minified JavaScript (~25KB, ~8KB gzipped)
- Compressed assets (.gz files)

## Deployment Platforms

### Netlify (Recommended)

Netlify offers excellent performance, automatic HTTPS, and easy deployment.

#### Option 1: Drag & Drop Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Visit [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag the `dist` folder onto the page

4. Your site is live! Netlify provides a random URL.

#### Option 2: CLI Deployment

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

3. Follow the prompts to authorize and configure

#### Option 3: Git-based Deployment

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [app.netlify.com](https://app.netlify.com)

3. Click "New site from Git"

4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher

5. Deploy!

#### Netlify Configuration

Create a `netlify.toml` file in the project root:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Vercel

Vercel provides fast global CDN and automatic deployments.

#### Option 1: CLI Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Build and deploy:
   ```bash
   npm run build
   vercel --prod
   ```

3. Follow the prompts

#### Option 2: Git-based Deployment

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com)

3. Import your repository

4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Deploy!

#### Vercel Configuration

Create a `vercel.json` file:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/(.*)\\.(js|css)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### GitHub Pages

GitHub Pages is free for public repositories.

#### Setup

1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add deploy script to `package.json`:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts` with your repo base:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Replace with your repo name
     // ... rest of config
   });
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`
   - Save

Your site will be available at: `https://username.github.io/repo-name/`

### Custom Server

For deployment to your own server (Apache, Nginx, etc.):

#### 1. Build the Project

```bash
npm run build
```

#### 2. Upload Files

Upload the entire `dist/` directory contents to your web server:

```bash
# Example using rsync
rsync -avz dist/ user@server:/var/www/html/
```

#### 3. Server Configuration

##### Nginx Configuration

Create or update your Nginx config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/html;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing - redirect all to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

##### Apache Configuration

Create or update `.htaccess` in your web root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Frame-Options "DENY"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## Environment Configuration

### No Environment Variables Required

The basic portfolio doesn't need environment variables. However, if you add features like:

- Analytics tracking ID
- API endpoints for contact form
- CMS integration

You can configure them in:

1. **Development**: Create `.env` file
2. **Production**: Set environment variables in your hosting platform

Example `.env`:

```env
VITE_API_URL=https://api.example.com
VITE_GA_ID=UA-XXXXX-X
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Post-Deployment

### Verification Checklist

After deploying, verify:

- [ ] Site loads correctly
- [ ] All images display properly
- [ ] Fonts load (no fallback fonts)
- [ ] Navigation works (smooth scroll)
- [ ] Category filtering works (Works section)
- [ ] Copy-to-clipboard works (Contacts)
- [ ] Contact form functions (if backend integrated)
- [ ] Mobile menu works on small screens
- [ ] Animations trigger on scroll
- [ ] All links work
- [ ] HTTPS is active
- [ ] No console errors

### Performance Testing

Test your deployed site:

1. **PageSpeed Insights**: [web.dev/measure](https://web.dev/measure)
2. **GTmetrix**: [gtmetrix.com](https://gtmetrix.com)
3. **WebPageTest**: [webpagetest.org](https://www.webpagetest.org)

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

### SEO Setup

1. Add a `robots.txt` file in `public/`:
   ```
   User-agent: *
   Allow: /
   
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

2. Add a `sitemap.xml` in `public/`:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://yourdomain.com/</loc>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

3. Update meta tags in `index.html`:
   - Title
   - Description
   - Open Graph tags
   - Twitter Card tags

### Analytics Integration

Add Google Analytics (or similar):

```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Issue: 404 on Page Refresh

**Cause**: Server doesn't redirect all routes to index.html

**Solution**: Configure server redirects (see server configuration above)

### Issue: Blank Page After Deployment

**Causes**:
1. Incorrect base path in `vite.config.ts`
2. JavaScript errors
3. Missing files

**Solutions**:
1. Check browser console for errors
2. Verify `base` path in `vite.config.ts`
3. Ensure all files in `dist/` were uploaded

### Issue: Images Not Loading

**Causes**:
1. Incorrect image paths
2. Case-sensitive file systems
3. Images not in `public/` directory

**Solutions**:
1. Check image paths are relative
2. Verify file names match exactly (case-sensitive)
3. Ensure images are in `public/images/`

### Issue: Fonts Not Loading

**Causes**:
1. Incorrect font paths
2. CORS issues
3. Missing font files

**Solutions**:
1. Verify fonts are in `public/fonts/`
2. Check font file URLs in CSS
3. Ensure server allows font file access

### Issue: Slow Performance

**Solutions**:
1. Enable gzip/brotli compression
2. Use CDN for asset delivery
3. Optimize images further
4. Enable browser caching
5. Minimize third-party scripts

## Custom Domain Setup

### Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow instructions to update DNS

### Vercel

1. Go to Project → Settings → Domains
2. Add your domain
3. Update DNS records as shown

### GitHub Pages

1. Go to repository Settings → Pages
2. Add custom domain
3. Create CNAME file in `public/`:
   ```
   yourdomain.com
   ```

## Continuous Deployment

### Automatic Deployments

Most platforms support automatic deployments:

1. **Netlify/Vercel**: Connects to your Git repository
2. **Deploy on push**: Automatic builds on new commits
3. **Preview deployments**: Separate URLs for pull requests

### Manual Deployments

For manual control:

```bash
# Build
npm run build

# Deploy to Netlify
netlify deploy --prod

# Or deploy to Vercel
vercel --prod
```

## Rollback

If something goes wrong:

**Netlify**: 
- Go to Deploys tab
- Click on a previous successful deploy
- Click "Publish deploy"

**Vercel**:
- Go to Deployments
- Find a previous deployment
- Click "Promote to Production"

**Manual**:
- Keep backups of `dist/` folders
- Restore previous version

---

## Support

For deployment issues:
- Check platform documentation
- Review server logs
- Test locally with `npm run build && npm run preview`
- Verify all files are uploaded correctly

Happy deploying! 🚀