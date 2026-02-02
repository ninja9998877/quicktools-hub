# GitHub Repository Setup Instructions

## Step 1: Create GitHub Personal Access Token (Required for CLI)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Select scopes: `repo`, `workflow`, `read:org`, `read:user`
4. Copy the generated token (save it securely)

## Step 2: Connect Local Repository to GitHub

If you haven't already added the remote origin:

```bash
cd D:\micro-saas-research\quicktools-hub
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/quicktools-hub.git
git branch -M main
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Step 3: Alternative - Create Repo via GitHub CLI

If you prefer using GitHub CLI:

1. Install GitHub CLI from https://cli.github.com/
2. Authenticate: `gh auth login`
3. Create and push:
```bash
gh repo create quicktools-hub --public --push
```

## Step 4: Verify Repository Setup

Ensure your repository has been created successfully:

```bash
git remote -v
```

You should see both fetch and push URLs pointing to your GitHub repository.

## Step 5: Set Up Vercel Deployment

Once your code is on GitHub, you can connect it to Vercel:

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Choose "Import Git Repository"
4. Find and select your "quicktools-hub" repository
5. Vercel will automatically detect the frontend and backend configurations

## Step 6: Configure Environment Variables

After importing, make sure to set these environment variables in Vercel:

### For Frontend:
- `REACT_APP_API_URL`: The URL of your deployed backend API

### For Backend:
- `REDIS_URL`: If using Redis
- `DATABASE_URL`: Connection string for your database
- `JWT_SECRET`: Secret for authentication (if implemented)

## Step 7: Configure Separate Deployments

Since we have both frontend and backend in the same repository, you might want to configure separate deployments:

### Frontend Deployment:
- Build Command: `npm run vercel-build`
- Output Directory: `dist`
- Root Directory: `/frontend`

### Backend API Deployment:
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `/backend`

## Troubleshooting

### Common Issues:

1. **Permission denied (publickey)**:
   - Ensure you've properly authenticated with GitHub
   - Try using HTTPS with token authentication instead of SSH

2. **Build fails on Vercel**:
   - Check that all dependencies are properly listed in package.json
   - Verify that build scripts work locally with `npm run build`

3. **API calls failing from frontend**:
   - Confirm CORS settings in your backend
   - Verify that REACT_APP_API_URL is correctly set

### Verification Commands:

```bash
# Check git remote
git remote -v

# Check current branch
git branch

# Check commit history
git log --oneline -5
```