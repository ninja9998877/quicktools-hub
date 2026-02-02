# QuickTools Hub - Deployment Guide

## GitHub Repository Setup

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name it "quicktools-hub" or your preferred name
   - Don't initialize with README, .gitignore, or license (we already have these)

2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/quicktools-hub.git
   ```

3. Push the code:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

### Prerequisites
- Sign up for a Vercel account at https://vercel.com/signup
- Install Vercel CLI (optional): `npm i -g vercel`

### Frontend Deployment (React App)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." -> "Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a React project
5. Configure the build settings:
   - Framework Preset: "Create React App" or "Vite"
   - Build Command: `npm run build`
   - Output Directory: `dist` (for Vite) or `build` (for CRA)
   - Root Directory: `/frontend`

6. Set environment variables if needed:
   - REACT_APP_API_URL: Your backend API URL

### Backend Deployment (Node.js API)

For the backend, you have several options:

#### Option 1: Deploy to Vercel Functions
1. Create a `vercel.json` file in the backend directory:
```json
{
  "version": 2,
  "functions": {
    "api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/server.js"
    }
  ]
}
```

2. Convert your Express server to a Vercel function format

#### Option 2: Deploy to Railway or Render
For a full Express server, consider using Railway or Render instead of Vercel.

## Alternative: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to frontend directory and deploy:
   ```bash
   cd frontend
   vercel --prod
   ```

## Environment Configuration

### Frontend Environment Variables
- `REACT_APP_API_URL`: Base URL for your backend API (e.g., https://your-backend.vercel.app/api)

### Backend Environment Variables
- `REDIS_URL`: Redis connection string
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASS`: Database password

## Docker Deployment

Alternatively, you can deploy using Docker:

```bash
# Build and run locally
docker-compose up -d

# Or deploy to cloud providers that support Docker
```

## Post-Deployment Tasks

1. Set up a custom domain (optional)
2. Configure SSL certificate
3. Set up monitoring and logging
4. Configure backup strategies
5. Set up CI/CD pipeline

## Troubleshooting

### Common Issues
- CORS errors: Ensure your frontend domain is added to backend CORS configuration
- API endpoints not working: Verify environment variables are set correctly
- Build failures: Check that all dependencies are properly declared in package.json

### Performance Optimization
- Enable gzip compression
- Use CDN for static assets
- Optimize images and assets
- Set up caching strategies

## Scaling Recommendations

- Use Redis for session management and caching
- Implement database connection pooling
- Use CDN for file downloads
- Implement load balancing for high traffic