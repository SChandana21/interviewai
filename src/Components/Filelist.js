import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [filterRecent, setFilterRecent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const email = localStorage.getItem("email");
        const res = await axios.post("https://serverinterviewai.onrender.com/fetched", { email });

        if (res.data.success) {
          const fetchedFiles = [];
          if (res.data.data.resumeUrl)
            fetchedFiles.push({
              name: res.data.data.resumeUrl.split("/").pop() || "Resume.pdf",
              type: "resume",
              displayName: "Resume",
              date: new Date().toISOString(),
              url: res.data.data.resumeUrl,
            });
          if (res.data.data.jobDescUrl)
            fetchedFiles.push({
              name: res.data.data.jobDescUrl.split("/").pop() || "JobDescription.pdf",
              type: "jobdesc",
              displayName: "Job Description",
              date: new Date().toISOString(),
              url: res.data.data.jobDescUrl,
            });
          setFiles(fetchedFiles);
        } else {
          toast.error(res.data.message || "Failed to fetch files");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching files");
      }
    };

    fetchFiles();
  }, []);

  const displayedFiles = filterRecent
    ? [...files].sort((a, b) => new Date(b.date) - new Date(a.date))
    : files;

  const handleDelete = async (index) => {
    const email = localStorage.getItem("email");
    const file = files[index];

    try {
      const res = await axios.post("https://serverinterviewai.onrender.com/deletefile", {
        email,
        fileType: file.type,
      });

      if (res.data.success) {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        toast.success(`${file.displayName} deleted successfully`);
      } else {
        toast.error(res.data.message || "Failed to delete file");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while deleting file");
    }
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className="flex flex-col items-center gap-6 py-16">
        <h2 className="text-xl md:text-2xl font-bold text-sky-600 font-poppins mb-4">
          List of Documents
        </h2>
        <div className="w-full max-w-lg flex justify-end mb-4">
          <button
            className="font-poppins font-bold text-sky-600 bg-white border border-sky-600 px-4 py-2 rounded-lg hover:bg-sky-50 transition cursor-pointer"
            onClick={() => setFilterRecent(!filterRecent)}
          >
            {filterRecent ? 'Clear Filter' : 'Filter by Recent'}
          </button>
        </div>

        <div className="w-full max-w-lg flex flex-col gap-4">
          {displayedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex flex-col">
                <p className="text-gray-800 font-poppins font-medium">{file.name}</p>
                <p className="text-gray-500 text-sm">{file.displayName}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm font-poppins">{new Date(file.date).toLocaleDateString()}</p>
                <button
                  className="text-red-600 font-poppins font-bold text-sm hover:text-red-700 transition"
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {displayedFiles.length === 0 && (
            <p className="text-gray-400 text-center font-poppins">No files uploaded yet.</p>
          )}
        </div>

        <button
          className="mt-4 cursor-pointer bg-sky-600 text-white font-poppins font-bold px-6 py-2 rounded-lg hover:bg-sky-700 transition"
          onClick={() => navigate("/upload")}
        >
          Go Back to Uploads
        </button>
      </div>
    </>
  );
};

export default FileList;
