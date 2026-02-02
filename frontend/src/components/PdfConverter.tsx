import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css';
import axios from 'axios';

// Register plugins
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

const PdfConverter = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [targetFormat, setTargetFormat] = useState('docx');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select a PDF file to convert');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', files[0].file);
      formData.append('targetFormat', targetFormat);

      const response = await axios.post('http://localhost:3000/api/pdf/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setResult(response.data);
      } else {
        setError(response.data.error || 'Failed to convert PDF');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">PDF Tools</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF File
          </label>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            name="file"
            labelIdle="Drag & Drop your PDF file or <span class='filepond--label-action'>Browse</span>"
            acceptedFileTypes={['application/pdf']}
            fileValidateTypeLabelExpectedTypesMap={{
              'application/pdf': '.pdf'
            }}
            maxFileSize="10MB"
          />
        </div>
        
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
            <option value="docx">Microsoft Word (.docx)</option>
            <option value="txt">Plain Text (.txt)</option>
            <option value="jpg">JPEG Image (.jpg)</option>
            <option value="png">PNG Image (.png)</option>
          </select>
        </div>
        
        <button
          onClick={handleUpload}
          disabled={loading || files.length === 0}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Converting...' : 'Convert PDF'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Conversion Complete!</h2>
          <div className="space-y-3">
            <p><strong>Original File:</strong> {result.originalFilename}</p>
            <p><strong>Converted File:</strong> {result.filename}</p>
            <p><strong>File Size:</strong> {(result.size / 1024 / 1024).toFixed(2)} MB</p>
            <a
              href={result.downloadUrl}
              download={result.filename}
              className="inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Download Converted File
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Other PDF Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-indigo-300 hover:shadow-md transition-all">
            <h3 className="font-medium text-gray-900">Merge PDFs</h3>
            <p className="text-sm text-gray-600 mt-1">Combine multiple PDF files into one</p>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-indigo-300 hover:shadow-md transition-all">
            <h3 className="font-medium text-gray-900">Split PDF</h3>
            <p className="text-sm text-gray-600 mt-1">Extract specific pages from a PDF</p>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-indigo-300 hover:shadow-md transition-all">
            <h3 className="font-medium text-gray-900">Compress PDF</h3>
            <p className="text-sm text-gray-600 mt-1">Reduce PDF file size</p>
          </button>
          <button className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:border-indigo-300 hover:shadow-md transition-all">
            <h3 className="font-medium text-gray-900">PDF to Word</h3>
            <p className="text-sm text-gray-600 mt-1">Convert PDF to editable Word document</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfConverter;