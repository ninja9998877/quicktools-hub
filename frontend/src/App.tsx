import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VideoDownloader from './components/VideoDownloader';
import PdfConverter from './components/PdfConverter';
import ImageCompressor from './components/ImageCompressor';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">QT</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">QuickTools Hub</h1>
              </Link>
              
              <nav className="hidden md:flex space-x-8">
                <Link 
                  to="/video" 
                  className={`font-medium ${activeTab === 'video' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`}
                  onClick={() => setActiveTab('video')}
                >
                  Video Download
                </Link>
                <Link 
                  to="/pdf" 
                  className={`font-medium ${activeTab === 'pdf' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`}
                  onClick={() => setActiveTab('pdf')}
                >
                  PDF Tools
                </Link>
                <Link 
                  to="/image" 
                  className={`font-medium ${activeTab === 'image' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-500'}`}
                  onClick={() => setActiveTab('image')}
                >
                  Image Tools
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-t">
          <div className="grid grid-cols-3">
            <Link 
              to="/video" 
              className={`py-3 text-center ${activeTab === 'video' ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('video')}
            >
              Video
            </Link>
            <Link 
              to="/pdf" 
              className={`py-3 text-center ${activeTab === 'pdf' ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pdf')}
            >
              PDF
            </Link>
            <Link 
              to="/image" 
              className={`py-3 text-center ${activeTab === 'image' ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}
              onClick={() => setActiveTab('image')}
            >
              Image
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">All-in-One File Processing Tools</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Fast, secure, and easy-to-use tools for video downloading, PDF conversion, and image processing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <Link 
                    to="/video" 
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => setActiveTab('video')}
                  >
                    <div className="text-indigo-600 text-3xl mb-3">▶️</div>
                    <h3 className="text-xl font-semibold mb-2">Video Download</h3>
                    <p className="text-gray-600">Download videos from TikTok, YouTube, Instagram and more</p>
                  </Link>
                  
                  <Link 
                    to="/pdf" 
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => setActiveTab('pdf')}
                  >
                    <div className="text-indigo-600 text-3xl mb-3">📄</div>
                    <h3 className="text-xl font-semibold mb-2">PDF Tools</h3>
                    <p className="text-gray-600">Convert, merge, split and edit PDF documents</p>
                  </Link>
                  
                  <Link 
                    to="/image" 
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => setActiveTab('image')}
                  >
                    <div className="text-indigo-600 text-3xl mb-3">🖼️</div>
                    <h3 className="text-xl font-semibold mb-2">Image Tools</h3>
                    <p className="text-gray-600">Compress, convert, and optimize images</p>
                  </Link>
                </div>
              </div>
            } />
            <Route path="/video" element={<VideoDownloader />} />
            <Route path="/pdf" element={<PdfConverter />} />
            <Route path="/image" element={<ImageCompressor />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-gray-600">
              <p>© {new Date().getFullYear()} QuickTools Hub. All rights reserved.</p>
              <p className="mt-2">Fast, secure, and privacy-focused file processing tools.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;