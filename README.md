# QuickTools Hub - Micro SaaS Platform

A comprehensive file processing platform offering various tools for video downloading, PDF conversion, and image optimization.

## Features

### Video Downloader
- Download videos from TikTok, YouTube, Instagram, and other platforms
- Extract without watermarks
- Multiple format support

### PDF Tools
- PDF to Word, Excel, Text conversion
- PDF merging and splitting
- PDF compression
- PDF to image conversion

### Image Tools
- Image compression with adjustable quality
- Format conversion (JPG, PNG, WebP, GIF, TIFF)
- Image resizing
- Batch processing

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- FilePond for file uploads

### Backend
- Node.js + Express + TypeScript
- Multer for file handling
- Sharp for image processing
- Puppeteer for web scraping (video extraction)
- Bull for job queuing
- Redis for caching and queues

### Infrastructure
- Docker & Docker Compose for containerization
- PostgreSQL for main database
- MinIO for file storage (S3 compatible)
- Nginx as reverse proxy

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Web前端       │◄──►│   API网关        │◄──►│   用户浏览器     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│   任务队列       │    │   文件处理服务    │
└─────────────────┘    └──────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│   文件存储       │    │   数据库         │
└─────────────────┘    └──────────────────┘
```

## Installation

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm or yarn

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/quicktools-hub.git
cd quicktools-hub
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Start the development servers
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

## Deployment

### GitHub Setup
Follow the instructions in [GITHUB_SETUP.md](./GITHUB_SETUP.md) to connect your local repository to GitHub.

### Vercel Deployment
This project is optimized for Vercel deployment. Follow these steps:

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your GitHub repository
4. Vercel will automatically detect the frontend and backend configurations
5. Configure environment variables as described in [DEPLOYMENT.md](./DEPLOYMENT.md)

For optimal performance, deploy frontend and backend separately:
- Frontend: Deploy from `/frontend` directory
- Backend API: Deploy from `/backend` directory

For detailed and secure deployment instructions, see [SECURE_DEPLOYMENT.md](./SECURE_DEPLOYMENT.md).

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Deployment

Use Docker Compose for production deployment:

```bash
docker-compose up -d
```

## API Endpoints

### Video Download
```
POST /api/video/download
{
  "url": "https://tiktok.com/...",
  "format": "mp4"
}
```

### PDF Conversion
```
POST /api/pdf/convert (multipart/form-data)
- file: [PDF file]
- targetFormat: "docx|txt|jpg|png"
```

### Image Compression
```
POST /api/image/compress (multipart/form-data)
- file: [image file]
- quality: 80
```

## Business Model

### Free Tier
- Limited daily conversions/downloads
- Basic features access

### Premium Plans
- Unlimited conversions
- Higher quality settings
- Priority processing
- API access

## Security & Privacy

- All files are automatically deleted after 24 hours
- No user data is stored permanently
- End-to-end encryption for file transfers
- GDPR compliant

## Future Enhancements

- User accounts and dashboard
- Advanced PDF editing tools
- More video platforms support
- API for developers
- Mobile applications
- White-label solutions

## Contributing

Contributions are welcome! Please read our contributing guidelines for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.