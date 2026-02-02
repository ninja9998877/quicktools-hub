# QuickTools Hub - Secure Deployment Guide

## GitHub Repository

Your code is already hosted on GitHub at:
- Repository: https://github.com/ninja9998877/quicktools-hub
- Contains complete project with frontend, backend, and configuration files

## Vercel Deployment (Secure Method)

### Prerequisites
- Vercel account (sign up at https://vercel.com)
- GitHub account connected to Vercel

### Method 1: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Choose "Import Git Repository"
4. Select your GitHub account and the `quicktools-hub` repository
5. Vercel will automatically detect the project structure

### Method 2: Using Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:
   ```bash
   vercel login
   ```
   This will open a browser window to authenticate you securely.

3. Deploy the backend API:
   ```bash
   cd backend
   vercel --prod
   ```

4. Deploy the frontend application:
   ```bash
   cd ../frontend
   vercel --prod
   ```

## Project Structure for Deployment

### Frontend (React Application)
- Directory: `/frontend`
- Framework: React with TypeScript
- Build command: `npm run build`
- Output directory: `dist` (for Vite) or `build` (for CRA)
- Environment variables needed:
  - `REACT_APP_API_URL`: URL of your deployed backend API

### Backend (Node.js API)
- Directory: `/backend`
- Framework: Express with TypeScript
- Serves API endpoints for:
  - Video downloading: `/api/video/download`
  - PDF conversion: `/api/pdf/convert`
  - Image processing: `/api/image/compress`

## Configuration Files Included

### Frontend Vercel Config (`/frontend/vercel.json`)
```json
{
  "version": 2,
  "framework": "create-react-app",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "http://localhost:3000/api/$1",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Backend Vercel Config (`/backend/vercel.json`)
```json
{
  "version": 2,
  "name": "quicktools-hub-api",
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["dist/**"],
        "excludeFiles": ["node_modules/**", ".git/**"]
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/server.ts"
    }
  ]
}
```

## Security Best Practices

1. **Never commit tokens to the repository**
2. **Use environment variables for sensitive data**
3. **Configure CORS appropriately**
4. **Validate all inputs**
5. **Implement proper authentication when needed**

## Post-Deployment

After successful deployment:

1. Update the frontend's `REACT_APP_API_URL` to point to your deployed backend
2. Test all API endpoints
3. Verify file upload/download functionality
4. Check cross-origin resource sharing (CORS) settings

## Troubleshooting

### Common Issues:
1. **CORS errors**: Ensure your frontend domain is allowed in backend CORS settings
2. **API not responding**: Check that `REACT_APP_API_URL` points to the correct backend URL
3. **Build failures**: Verify all dependencies are properly defined in package.json
4. **File processing errors**: Check that serverless timeout settings are adequate for file processing tasks

Your project is fully prepared for secure deployment without exposing any sensitive credentials.