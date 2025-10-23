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
    "What motivates you to apply for this role?",
  ]);   ///remove affter openaiwrsk
  const [chat, setChat] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();

  const onDropResume = useCallback((acceptedFiles) => {
    setResume(acceptedFiles[0]);
    toast.success("Resume uploaded!");
  }, []);

  const onDropJob = useCallback((acceptedFiles) => {
    setJobDesc(acceptedFiles[0]);
    toast.success("Job Description uploaded!");
  }, []);

  const { getRootProps: getResumeProps, getInputProps: getResumeInput } =
    useDropzone({ onDrop: onDropResume });
  const { getRootProps: getJobProps, getInputProps: getJobInput } = useDropzone({
    onDrop: onDropJob,
  });

  const handleUpload = async () => {
    if (!resume || !jobDesc) {
      toast.error("Please upload both files.");
      return;
    }

    const email = localStorage.getItem("email");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("jobDesc", jobDesc);

    setLoading(true);
    try {
      // 1️⃣ First save files to DB
      const saveRes = await axios.post(
        "https://serverinterviewai.onrender.com/save",
        {
          email,
          resumeUrl: resume.name, // or actual URL after upload
          jobDescUrl: jobDesc.name,
        },
        { withCredentials: true }
      );

      if (saveRes.data.success) {
        toast.success("Files saved to database successfully!");
      } else {
        toast.error(`Save failed: ${saveRes.data.message}`);
        setLoading(false);
        return;
      }

      // 2️⃣ Then continue with upload & processing
      const res = await axios.post("https://serverinterviewai.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
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

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const nextQuestion = questions[chat.length] || null;
    setSending(true);
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "https://serverinterviewai.onrender.com/evaluate",
        {
          email,
          question: nextQuestion,
          answer: currentInput,
        },
        { withCredentials: true }
      );

      const rating =
        response.data.rating || Math.floor(Math.random() * 5) + 1;
      setChat([...chat, { question: nextQuestion, answer: currentInput, rating }]);
      toast.success("Answer processed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process answer.");
    } finally {
      setCurrentInput("");
      setSending(false);
    }
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto mt-6 font-poppins">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Resume & Job Description Upload
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div
            {...getResumeProps()}
            className="border-2 border-dashed p-4 rounded-lg text-center cursor-pointer"
          >
            <input {...getResumeInput()} />
            {resume ? <p>{resume.name}</p> : <p>Drag or click to upload Resume</p>}
          </div>

          <div
            {...getJobProps()}
            className="border-2 border-dashed p-4 rounded-lg text-center cursor-pointer"
          >
            <input {...getJobInput()} />
            {jobDesc ? (
              <p>{jobDesc.name}</p>
            ) : (
              <p>Drag or click to upload Job Description</p>
            )}
          </div>
        </div>

        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg cursor-pointer flex justify-center items-center font-poppins"
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Upload & Process"
          )}
        </button>

        {questions.length > 0 && (
          <div className="mt-6 font-poppins animate-fadeIn">
            <h2 className="text-lg font-bold mb-2">AI Questions</h2>
            <div className="bg-white p-4 rounded-lg space-y-2 shadow-sm">
              {questions.map((q, i) => (
                <p key={i} className="font-semibold">
                  {q}
                </p>
              ))}
            </div>
          </div>
        )}

        {chat.length > 0 && (
          <div className="mt-6 font-poppins">
            <h2 className="text-lg font-bold mb-2">Chat</h2>
            <div className="space-y-2">
              {chat.map((c, i) => (
                <div key={i} className="p-2">
                  <p>
                    <b>Q:</b> {c.question}
                  </p>
                  <p>
                    <b>A:</b> {c.answer}
                  </p>
                  <p>
                    <b>Rating:</b> ⭐{c.rating}/5
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 border p-2 rounded-lg font-poppins"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 text-white px-4 rounded-lg cursor-pointer flex justify-center items-center font-poppins"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Send"
            )}
          </button>
        </div>

        <button
          onClick={() => navigate("/filelist")}
          className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg cursor-pointer font-poppins"
        >
          Previous Files
        </button>
      </div>
    </>
  );
};

export default Upload;
