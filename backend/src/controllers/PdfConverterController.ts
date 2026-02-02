import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs-extra';
import path from 'path';

export class PdfConverterController {
  static async convert(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          error: 'File is required' 
        });
      }

      const { targetFormat } = req.body;
      
      if (!['docx', 'txt', 'jpg', 'png'].includes(targetFormat)) {
        return res.status(400).json({ 
          error: 'Invalid target format. Supported formats: docx, txt, jpg, png' 
        });
      }

      // In a real implementation, we would convert the PDF to the target format
      // For demo purposes, we'll generate a mock converted file
      const originalFileName = path.parse(req.file.filename).name;
      const newFileName = `${originalFileName}_converted.${targetFormat}`;
      const filePath = path.join(__dirname, '../../../downloads', newFileName);
      
      // Create a mock converted file based on target format
      if (targetFormat === 'txt') {
        fs.writeFileSync(filePath, `CONVERTED TEXT CONTENT FROM PDF\nFile: ${req.file.originalname}`);
      } else if (targetFormat === 'docx') {
        // In a real app, we would use a library like mammoth or docxtemplater
        fs.writeFileSync(filePath, `MOCK DOCX CONTENT\nConverted from: ${req.file.originalname}`);
      } else {
        // For image formats, we would use PDFKit to render pages as images
        fs.writeFileSync(filePath, `MOCK IMAGE FILE\nConverted from: ${req.file.originalname}`);
      }
      
      res.json({
        success: true,
        downloadUrl: `/downloads/${newFileName}`,
        filename: newFileName,
        originalFilename: req.file.originalname,
        size: 512000 // Mock size
      });
    } catch (error) {
      console.error('PDF conversion error:', error);
      res.status(500).json({ 
        error: 'Failed to convert PDF',
        message: (error as Error).message 
      });
    }
  }

  static async merge(req: Request, res: Response) {
    try {
      if (!req.files || (req.files as Express.Multer.File[]).length < 2) {
        return res.status(400).json({ 
          error: 'At least 2 files are required for merging' 
        });
      }

      const files = req.files as Express.Multer.File[];
      
      // Create merged PDF
      const outputFileName = `merged_${Date.now()}.pdf`;
      const outputPath = path.join(__dirname, '../../../downloads', outputFileName);
      
      const pdfDoc = new PDFDocument();
      const writeStream = fs.createWriteStream(outputPath);
      pdfDoc.pipe(writeStream);

      // Add content from each PDF (simplified for demo)
      pdfDoc.fontSize(16).text('Merged PDF Document', { align: 'center' });
      pdfDoc.moveDown();
      
      files.forEach((file, index) => {
        pdfDoc.fontSize(12).text(`File ${index + 1}: ${file.originalname}`);
        pdfDoc.moveDown();
      });

      pdfDoc.end();

      // Wait for the stream to finish
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      res.json({
        success: true,
        downloadUrl: `/downloads/${outputFileName}`,
        filename: outputFileName,
        fileCount: files.length,
        size: 1024000 // Mock size
      });
    } catch (error) {
      console.error('PDF merge error:', error);
      res.status(500).json({ 
        error: 'Failed to merge PDFs',
        message: (error as Error).message 
      });
    }
  }

  static async split(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          error: 'File is required' 
        });
      }

      const { startPage, endPage } = req.body;
      
      // In a real implementation, we would split the PDF
      // For demo, we'll create a mock split result
      const originalFileName = path.parse(req.file.filename).name;
      const outputFileName = `${originalFileName}_pages_${startPage || 1}_to_${endPage || 'end'}.pdf`;
      const filePath = path.join(__dirname, '../../../downloads', outputFileName);
      
      // Create a mock split PDF
      const pdfDoc = new PDFDocument();
      const writeStream = fs.createWriteStream(filePath);
      pdfDoc.pipe(writeStream);
      
      pdfDoc.fontSize(16).text('Split PDF Document', { align: 'center' });
      pdfDoc.moveDown();
      pdfDoc.fontSize(12).text(`Original: ${req.file.originalname}`);
      pdfDoc.text(`Pages: ${startPage || 1} to ${endPage || 'end'}`);

      pdfDoc.end();

      // Wait for the stream to finish
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      res.json({
        success: true,
        downloadUrl: `/downloads/${outputFileName}`,
        filename: outputFileName,
        originalFilename: req.file.originalname,
        size: 512000 // Mock size
      });
    } catch (error) {
      console.error('PDF split error:', error);
      res.status(500).json({ 
        error: 'Failed to split PDF',
        message: (error as Error).message 
      });
    }
  }
}