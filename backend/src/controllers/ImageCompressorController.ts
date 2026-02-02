import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs-extra';

export class ImageCompressorController {
  static async compress(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          error: 'File is required' 
        });
      }

      const { quality = 80 } = req.body;
      const qualityNum = parseInt(quality) || 80;
      
      // Validate quality range
      if (qualityNum < 10 || qualityNum > 95) {
        return res.status(400).json({ 
          error: 'Quality must be between 10 and 95' 
        });
      }

      const inputPath = req.file.path;
      const originalSize = req.file.size;
      
      // Create output filename
      const parsedPath = path.parse(req.file.path);
      const compressedFileName = `${parsedPath.name}_compressed${parsedPath.ext}`;
      const outputPath = path.join(__dirname, '../../../downloads', compressedFileName);
      
      // Compress image using Sharp
      await sharp(inputPath)
        .jpeg({ quality: qualityNum })
        .png({ quality: qualityNum })
        .webp({ quality: qualityNum })
        .toFile(outputPath);

      // Get compressed file size
      const compressedStats = await fs.stat(outputPath);
      const compressionRate = Math.round(((originalSize - compressedStats.size) / originalSize) * 100);

      res.json({
        success: true,
        downloadUrl: `/downloads/${compressedFileName}`,
        filename: compressedFileName,
        originalFilename: req.file.originalname,
        originalSize: originalSize,
        compressedSize: compressedStats.size,
        compressionRate: compressionRate,
        quality: qualityNum
      });
    } catch (error) {
      console.error('Image compression error:', error);
      res.status(500).json({ 
        error: 'Failed to compress image',
        message: (error as Error).message 
      });
    }
  }

  static async convertFormat(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          error: 'File is required' 
        });
      }

      const { targetFormat = 'jpg' } = req.body;
      
      // Validate target format
      const validFormats = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif'];
      if (!validFormats.includes(targetFormat.toLowerCase())) {
        return res.status(400).json({ 
          error: `Invalid target format. Supported formats: ${validFormats.join(', ')}` 
        });
      }

      const inputPath = req.file.path;
      const parsedPath = path.parse(req.file.path);
      const convertedFileName = `${parsedPath.name}.${targetFormat}`;
      const outputPath = path.join(__dirname, '../../../downloads', convertedFileName);

      // Convert image format using Sharp
      await sharp(inputPath)
        .toFormat(targetFormat as any)
        .toFile(outputPath);

      // Get converted file stats
      const convertedStats = await fs.stat(outputPath);

      res.json({
        success: true,
        downloadUrl: `/downloads/${convertedFileName}`,
        filename: convertedFileName,
        originalFilename: req.file.originalname,
        originalFormat: parsedPath.ext.substring(1),
        targetFormat: targetFormat,
        size: convertedStats.size
      });
    } catch (error) {
      console.error('Image format conversion error:', error);
      res.status(500).json({ 
        error: 'Failed to convert image format',
        message: (error as Error).message 
      });
    }
  }

  static async resize(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          error: 'File is required' 
        });
      }

      const { width, height } = req.body;
      
      if (!width && !height) {
        return res.status(400).json({ 
          error: 'Either width or height must be provided' 
        });
      }

      const inputPath = req.file.path;
      const parsedPath = path.parse(req.file.path);
      const resizedFileName = `${parsedPath.name}_resized.${parsedPath.ext}`;
      const outputPath = path.join(__dirname, '../../../downloads', resizedFileName);

      // Resize image using Sharp
      let sharpInstance = sharp(inputPath);
      
      if (width && height) {
        sharpInstance = sharpInstance.resize(parseInt(width), parseInt(height));
      } else if (width) {
        sharpInstance = sharpInstance.resize({ width: parseInt(width) });
      } else if (height) {
        sharpInstance = sharpInstance.resize({ height: parseInt(height) });
      }

      await sharpInstance.toFile(outputPath);

      // Get resized file stats
      const resizedStats = await fs.stat(outputPath);

      res.json({
        success: true,
        downloadUrl: `/downloads/${resizedFileName}`,
        filename: resizedFileName,
        originalFilename: req.file.originalname,
        originalSize: req.file.size,
        newSize: resizedStats.size,
        dimensions: { width, height }
      });
    } catch (error) {
      console.error('Image resize error:', error);
      res.status(500).json({ 
        error: 'Failed to resize image',
        message: (error as Error).message 
      });
    }
  }
}