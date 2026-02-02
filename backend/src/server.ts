import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import dotenv from 'dotenv';

import { VideoDownloadController } from './controllers/VideoDownloadController';
import { PdfConverterController } from './controllers/PdfConverterController';
import { ImageCompressorController } from './controllers/ImageCompressorController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Create uploads directory
const uploadDir = path.join(__dirname, '../uploads');
const downloadDir = path.join(__dirname, '../downloads');
fs.ensureDirSync(uploadDir);
fs.ensureDirSync(downloadDir);

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Welcome to QuickTools Hub API',
    version: '1.0.0',
    endpoints: {
      video: '/api/video/download',
      pdf: '/api/pdf/convert',
      image: '/api/image/compress'
    }
  });
});

// Video download route
app.post('/api/video/download', VideoDownloadController.download);

// PDF conversion routes
app.post('/api/pdf/convert', upload.single('file'), PdfConverterController.convert);
app.post('/api/pdf/merge', upload.array('files', 10), PdfConverterController.merge);

// Image compression routes
app.post('/api/image/compress', upload.single('file'), ImageCompressorController.compress);
app.post('/api/image/convert', upload.single('file'), ImageCompressorController.convertFormat);

// Serve downloaded files
app.use('/downloads', express.static(downloadDir));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`QuickTools Hub server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see the API`);
});