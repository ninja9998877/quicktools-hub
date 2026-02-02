import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';

// Register plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const ImageCompressor = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [quality, setQuality] = useState(80);
  const [targetFormat, setTargetFormat] = useState('jpg');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('compress'); // 'compress' or 'convert'

  const handleCompress = async () => {
    if (files.length === 0) {
      setError('Please select an image file to compress');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', files[0].file);
      formData.append('quality', quality.toString());

      const response = await axios.post('http://localhost:3000/api/image/compress', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setResult(response.data);
      } else {
        setError(response.data.error || 'Failed to compress image');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please select an image file to convert');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', files[0].file);
      formData.append('targetFormat', targetFormat);

      const response = await axios.post('http://localhost:3000/api/image/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setResult(response.data);
      } else {
        setError(response.data.error || 'Failed to convert image');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'compress') {
      handleCompress();
    } else {
      handleConvert();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Image Tools</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'compress' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('compress')}
          >
            Compress
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'convert' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('convert')}
          >
            Convert
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              name="file"
              labelIdle="Drag & Drop your image or <span class='filepond--label-action'>Browse</span>"
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/tiff']}
              fileValidateTypeLabelExpectedTypesMap={{
                'image/jpeg': '.jpg',
                'image/png': '.png',
                'image/webp': '.webp',
                'image/gif': '.gif',
                'image/tiff': '.tiff'
              }}
              maxFileSize="10MB"
            />
          </div>

          {activeTab === 'compress' ? (
            <div className="mb-6">
              <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
                Compression Quality: {quality}%
              </label>
              <input
                type="range"
                id="quality"
                min="10"
                max="95"
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                Convert To
              </label>
              <select
                id="format"
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="jpg">JPEG (.jpg)</option>
                <option value="png">PNG (.png)</option>
                <option value="webp">WebP (.webp)</option>
                <option value="gif">GIF (.gif)</option>
                <option value="tiff">TIFF (.tiff)</option>
              </select>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading || files.length === 0}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (activeTab === 'compress' ? 'Compressing...' : 'Converting...') : 
               (activeTab === 'compress' ? 'Compress Image' : 'Convert Image')}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">
            {activeTab === 'compress' ? 'Compression Complete!' : 'Conversion Complete!'}
          </h2>
          <div className="space-y-3">
            <p><strong>Original File:</strong> {result.originalFilename}</p>
            <p><strong>Processed File:</strong> {result.filename}</p>
            {activeTab === 'compress' && (
              <>
                <p><strong>Original Size:</strong> {(result.originalSize / 1024 / 1024).toFixed(2)} MB</p>
                <p><strong>Compressed Size:</strong> {(result.compressedSize / 1024 / 1024).toFixed(2)} MB</p>
                <p><strong>Compression Rate:</strong> {result.compressionRate}%</p>
              </>
            )}
            {!result.compressionRate && (
              <p><strong>File Size:</strong> {(result.size / 1024 / 1024).toFixed(2)} MB</p>
            )}
            <a
              href={result.downloadUrl}
              download={result.filename}
              className="inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Download File
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Image Optimization Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• JPEG: Best for photos and complex images</li>
          <li>• PNG: Best for graphics with transparency</li>
          <li>• WebP: Modern format with excellent compression</li>
          <li>• For web: 80% quality usually provides good balance</li>
          <li>• For print: Use higher quality settings (90-95%)</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageCompressor;