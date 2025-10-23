import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import Header from "./Header";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState(null);
  const [questions, setQuestions] = useState([
    "Tell me about a project you are proud of.",
    "How would you handle a conflict in a team?",
    "What motivates you to apply for this role?"
  ]);
  const [chat, setChat] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onDropResume = useCallback((acceptedFiles) => {
    setResume(acceptedFiles[0]);
    toast.success("Resume uploaded!");
  }, []);

  const onDropJob = useCallback((acceptedFiles) => {
    setJobDesc(acceptedFiles[0]);
    toast.success("Job Description uploaded!");
  }, []);

  const { getRootProps: getResumeProps, getInputProps: getResumeInput } = useDropzone({ onDrop: onDropResume });
  const { getRootProps: getJobProps, getInputProps: getJobInput } = useDropzone({ onDrop: onDropJob });

  const handleUpload = async () => {
    if (!resume || !jobDesc) {
      toast.error("Please upload both files.");
      return;
    }

    const formData = new FormData();
    const email = localStorage.getItem("email");
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("jobDesc", jobDesc);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3500/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setQuestions(res.data.aiQuestions || questions);
      toast.success("Files processed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnswer = (question, answer) => {
    if (!answer.trim()) return;
    const rating = Math.floor(Math.random() * 5) + 1;
    setChat([...chat, { question, answer, rating }]);
    setUserAnswer("");
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto mt-6 font-poppins">
        <h1 className="text-2xl font-bold mb-4 text-center text-sky-600">Resume & Job Description Upload</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div {...getResumeProps()} className="border-2 border-dashed p-4 rounded-lg text-center cursor-pointer">
            <input {...getResumeInput()} />
            {resume ? <p>{resume.name}</p> : <p>Drag or click to upload Resume</p>}
          </div>

          <div {...getJobProps()} className="border-2 border-dashed p-4 rounded-lg text-center cursor-pointer">
            <input {...getJobInput()} />
            {jobDesc ? <p>{jobDesc.name}</p> : <p>Drag or click to upload Job Description</p>}
          </div>
        </div>

        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg cursor-pointer flex justify-center items-center"
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin "></div>
          ) : (
            "Upload & Process"
          )}
        </button>

        {questions.length > 0 && (
          <div className="mt-6 space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="p-3 bg-white rounded-lg font-poppins">
                <p className="font-semibold mb-2">{q.trim()}</p>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Your answer..."
                  className="border p-2 rounded w-full font-poppins"
                />
                <button
                  onClick={() => handleSendAnswer(q, userAnswer)}
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded cursor-pointer font-poppins"
                >
                  Submit
                </button>
              </div>
            ))}
          </div>
        )}

        {chat.length > 0 && (
          <div className="mt-8 font-poppins">
            <h2 className="font-bold text-lg mb-2">Chat Summary</h2>
            {chat.map((c, i) => (
              <div key={i} className="p-2">
                <p><b>Q:</b> {c.question}</p>
                <p><b>A:</b> {c.answer}</p>
                <p><b>Rating:</b> ⭐{c.rating}/5</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/filelist")}
          className="mt-6 w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg cursor-pointer font-poppins"
        >
          Previous Files
        </button>
      </div>
    </>
  );
};

export default Upload;
