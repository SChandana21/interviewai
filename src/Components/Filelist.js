import React, { useState } from 'react';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const FileList = () => {
  const [files, setFiles] = useState([
    { name: 'Resume_JohnDoe.pdf', type: 'Resume', date: '2025-10-22' },
    { name: 'JobDescription.pdf', type: 'Job Description', date: '2025-10-21' },
    { name: 'Portfolio.pdf', type: 'Portfolio', date: '2025-10-20' },
  ]);

  const [filterRecent, setFilterRecent] = useState(false);

  // Sort by recent if filter applied
  const displayedFiles = filterRecent
    ? [...files].sort((a, b) => new Date(b.date) - new Date(a.date))
    : files;

  const handleDelete = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Toaster />
      <Header />

      <div className="flex flex-col items-center gap-6 py-16">
        {/* Header Text */}
        <h2 className="text-xl md:text-2xl font-bold text-sky-600 font-poppins mb-4">
          List of Documents
        </h2>

        {/* Filter Button */}
        <div className="w-full max-w-lg flex justify-end mb-4">
          <button
            className="font-poppins font-bold text-sky-600 bg-white border border-sky-600 px-4 py-2 rounded-lg hover:bg-sky-50 transition"
            onClick={() => setFilterRecent(!filterRecent)}
          >
            {filterRecent ? 'Clear Filter' : 'Filter by Recent'}
          </button>
        </div>

        {/* File List */}
        <div className="w-full max-w-lg flex flex-col gap-4">
          {displayedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex flex-col">
                <p className="text-gray-800 font-poppins font-medium">{file.name}</p>
                <p className="text-gray-500 text-sm">{file.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm font-poppins">{file.date}</p>
                <button
                  className="text-red-600 font-poppins font-bold text-sm hover:text-red-700 transition"
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

          {/* Empty state */}
          {displayedFiles.length === 0 && (
            <p className="text-gray-400 text-center font-poppins">
              No files uploaded yet.
            </p>
            
          )}
        </div>
        <button className="mt-4 cursor-pointer bg-sky-600 text-white font-poppins font-bold px-6 py-2 rounded-lg hover:bg-sky-700 transition">
                Go Back to Uploads 
              </button>
      </div>
    </>
  );
};

export default FileList;
