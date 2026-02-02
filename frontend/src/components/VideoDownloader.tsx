import React, { useState } from 'react';
import axios from 'axios';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/video/download', {
        url,
        format: 'mp4'
      });

      if (response.data.success) {
        setResult(response.data);
      } else {
        setError(response.data.error || 'Failed to download video');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Video Downloader</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Video URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste TikTok, YouTube, or Instagram video URL here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Download Video'}
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
          <h2 className="text-xl font-semibold text-green-800 mb-4">Download Ready!</h2>
          <div className="space-y-3">
            <p><strong>Platform:</strong> {result.platform}</p>
            <p><strong>File Size:</strong> {(result.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>Duration:</strong> {result.duration}</p>
            <a
              href={result.downloadUrl}
              download={result.filename}
              className="inline-block bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Download Now
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Supported Platforms</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• TikTok / Douyin videos</li>
          <li>• YouTube videos</li>
          <li>• Instagram Reels and Stories</li>
          <li>• Facebook videos</li>
          <li>• Twitter videos</li>
        </ul>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-700">
            <strong>Note:</strong> Only videos with public access can be downloaded. 
            Please respect copyright laws and platform terms of service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;