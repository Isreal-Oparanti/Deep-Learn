"use client";
import { useState } from "react";
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { 
  FaSchool, 
  FaAward, 
  FaLightbulb, 
  FaPlus, 
  FaTimes, 
  FaFlask, 
  FaRocket, 
  FaCloudUploadAlt, 
  FaPaperPlane, 
  FaSync, 
  FaCheckCircle, 
  FaArchive, 
  FaUser, 
  FaStar, 
  FaExclamationTriangle, 
  FaHeading, 
  FaList, 
  FaFileAlt, 
  FaPaperclip, 
  FaPlay 
} from 'react-icons/fa';

export default function TasksPage() {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [submissionTitle, setSubmissionTitle] = useState("");
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [submissionCategory, setSubmissionCategory] = useState("research");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Sample tasks - in real app these would come from your database
  const tasks = [
    { id: 1, title: "Linear Regression", difficulty: "Medium", points: 100, type: "academic" },
    { id: 2, title: "Neural Networks", difficulty: "Hard", points: 200, type: "academic" },
    { id: 3, title: "Data Preprocessing", difficulty: "Easy", points: 50, type: "academic" },
    { id: 4, title: "K-Means Clustering", difficulty: "Medium", points: 150, type: "academic" },
  ];
  
  // Sample research/innovation submissions
  const [submissions, setSubmissions] = useState([
    { 
      id: 101, 
      title: "AI for Agricultural Yield Prediction", 
      category: "research", 
      points: 500, 
      status: "pending",
      description: "Using satellite imagery and weather data to predict crop yields in Nigeria",
      submittedBy: "Aisha Bello"
    },
    { 
      id: 102, 
      title: "Blockchain for Academic Credentials", 
      category: "innovation", 
      points: 750, 
      status: "approved",
      description: "Decentralized verification system for academic certificates",
      submittedBy: "Chinedu Okoro"
    }
  ]);

  const handleSubmitInnovation = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add new submission
    const newSubmission = {
      id: Date.now(),
      title: submissionTitle,
      category: submissionCategory,
      points: submissionCategory === "research" ? 500 : 750,
      status: "pending",
      description: submissionDescription,
      submittedBy: "You", // In real app, this would be the user's name
      fileName: selectedFile ? selectedFile.name : "No file attached"
    };
    
    setSubmissions([newSubmission, ...submissions]);
    
    // Reset form
    setSubmissionTitle("");
    setSubmissionDescription("");
    setSubmissionCategory("research");
    setSelectedFile(null);
    setSubmissionSuccess(true);
    setIsSubmitting(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSubmissionSuccess(false), 3000);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Sidebar>
       <div
        className={`w-full min-h-screen p-8 bg-white/80 backdrop-blur-sm`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          fontFamily: "'Lexend', 'Noto Sans', sans-serif",
        }}
      >
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Points */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Learning Tasks</h1>
              <p className="text-gray-600 mt-1">Complete tasks and submit research to earn points</p>
            </div>
            
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaAward className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Your Points</p>
                <p className="font-bold text-blue-700">12,345</p>
              </div>
            </div>
          </div>
          
          {/* Academic Tasks Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FaSchool className="text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Academic Tasks</h2>
              </div>
              
              <div className="text-sm text-gray-500">
                {tasks.length} tasks available
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800">{task.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-800' 
                          : task.difficulty === 'Medium' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center text-yellow-500">
                        <FaStar className="text-sm" />
                        <span className="text-sm font-bold ml-1">{task.points} pts</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      Demonstrate your understanding of {task.title} through a recorded explanation and oral defense.
                    </p>
                    
                    <Link 
                      href={`/tasks/verification?taskId=${task.id}`}
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <FaPlay />
                      Start Task
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Research & Innovation Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-12 border border-blue-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FaLightbulb className="text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Research & Innovation Hub</h2>
                  <p className="text-gray-600 text-sm">Submit your research or innovative ideas</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowSubmissionForm(!showSubmissionForm)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap shadow-sm"
              >
                {showSubmissionForm ? <FaTimes /> : <FaPlus />}
                {showSubmissionForm ? "Cancel" : "Submit Research/Idea"}
              </button>
            </div>
            
            {/* Submission Form */}
            {showSubmissionForm && (
              <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                {submissionSuccess && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                    <FaCheckCircle className="mr-2" />
                    Your submission has been received! It's now pending verification.
                  </div>
                )}
                
                <form onSubmit={handleSubmitInnovation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2" htmlFor="title">
                        <FaHeading className="text-sm" />
                        Title of Research/Innovation
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={submissionTitle}
                        onChange={(e) => setSubmissionTitle(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., AI Solution for Crop Disease Detection"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                        <FaList className="text-sm" />
                        Category
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                          <input
                            type="radio"
                            name="category"
                            value="research"
                            checked={submissionCategory === "research"}
                            onChange={() => setSubmissionCategory("research")}
                            className="mr-2"
                          />
                          <div>
                            <div className="flex items-center">
                              <FaFlask className="mr-1 text-blue-600" />
                              <span className="font-medium">Research</span>
                            </div>
                            <div className="text-xs text-gray-500">500 pts</div>
                          </div>
                        </label>
                        
                        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                          <input
                            type="radio"
                            name="category"
                            value="innovation"
                            checked={submissionCategory === "innovation"}
                            onChange={() => setSubmissionCategory("innovation")}
                            className="mr-2"
                          />
                          <div>
                            <div className="flex items-center">
                              <FaRocket className="mr-1 text-purple-600" />
                              <span className="font-medium">Innovation</span>
                            </div>
                            <div className="text-xs text-gray-500">750 pts</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Research-specific fields */}
                  {submissionCategory === "research" && (
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2" htmlFor="hypothesis">
                        <FaFlask className="text-sm" />
                        Research Hypothesis
                      </label>
                      <textarea
                        id="hypothesis"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                        placeholder="State your research hypothesis..."
                        required
                      />
                    </div>
                  )}
                  
                  {/* Innovation-specific fields */}
                  {submissionCategory === "innovation" && (
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2" htmlFor="problem">
                        <FaExclamationTriangle className="text-sm" />
                        Problem Statement
                      </label>
                      <textarea
                        id="problem"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                        placeholder="Describe the problem your innovation solves..."
                        required
                      />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2" htmlFor="description">
                      <FaFileAlt className="text-sm" />
                      {submissionCategory === "research" ? "Research Methodology" : "Innovation Details"}
                    </label>
                    <textarea
                      id="description"
                      value={submissionDescription}
                      onChange={(e) => setSubmissionDescription(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder={
                        submissionCategory === "research" 
                          ? "Describe your research methodology, data sources, and analysis techniques..." 
                          : "Explain how your innovation works, its unique features, and implementation plan..."
                      }
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                      <FaPaperclip className="text-sm" />
                      {submissionCategory === "research" ? "Upload Research Paper" : "Upload Supporting Documents"}
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaCloudUploadAlt className="text-gray-400 text-3xl mb-2" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            {submissionCategory === "research" 
                              ? "PDF, DOCX (Max 10MB)" 
                              : "PDF, DOCX, ZIP (Max 20MB)"}
                          </p>
                        </div>
                        <input 
                          id="file-upload" 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileChange}
                          accept={submissionCategory === "research" ? ".pdf,.docx" : ".pdf,.docx,.zip"}
                        />
                      </label>
                    </div>
                    {selectedFile && (
                      <div className="mt-2 flex items-center text-sm text-gray-600 bg-green-50 p-2 rounded-lg">
                        <FaCheckCircle className="mr-1 text-green-600" />
                        {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSync className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          Submit for Verification
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Submitted Research/Innovation */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaArchive className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Recent Submissions</h3>
                </div>
                
                <div className="text-sm text-gray-500">
                  {submissions.length} submissions
                </div>
              </div>
              
              {submissions.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
                  <FaFlask className="text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600">No research or innovation submissions yet.</p>
                  <p className="text-gray-600 mt-2">Be the first to submit your work!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {submissions.map(submission => (
                    <div 
                      key={submission.id} 
                      className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
                        submission.status === "approved" 
                          ? "border-green-200" 
                          : submission.status === "rejected" 
                            ? "border-red-200" 
                            : "border-yellow-200"
                      }`}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-gray-800">{submission.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            submission.status === "approved" 
                              ? "bg-green-100 text-green-800" 
                              : submission.status === "rejected" 
                                ? "bg-red-100 text-red-800" 
                                : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {submission.status === "approved" 
                              ? "Approved" 
                              : submission.status === "rejected" 
                                ? "Rejected" 
                                : "Pending Review"}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-xs px-2 py-1 rounded ${
                            submission.category === "research" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {submission.category === "research" ? 
                              <><FaFlask className="align-middle text-sm mr-1" /> Research</> : 
                              <><FaRocket className="align-middle text-sm mr-1" /> Innovation</>
                            }
                          </span>
                          
                          <div className="flex items-center text-yellow-500">
                            <FaStar className="text-sm" />
                            <span className="text-sm font-bold ml-1">{submission.points} pts</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4">
                          {submission.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500 flex items-center">
                            <FaUser className="text-sm mr-1" />
                            {submission.submittedBy}
                          </span>
                          
                          {submission.status === "approved" && (
                            <span className="text-green-600 text-sm font-medium flex items-center">
                              <FaCheckCircle className="mr-1" />
                              Points Awarded
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </Sidebar>
  );
}