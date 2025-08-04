"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TaskVerification({ task }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [anomalies, setAnomalies] = useState([]);
  const timerRef = useRef(null);
  const [faceVisible, setFaceVisible] = useState(true);
  const faceDetectionTimer = useRef(null);
  const screenVideoRef = useRef(null);
  const faceVideoRef = useRef(null);

  // Simulate face visibility detection
  useEffect(() => {
    if (isRecording) {
      faceDetectionTimer.current = setInterval(() => {
        // Randomly simulate face visibility (80% visible)
        setFaceVisible(Math.random() > 0.2);
      }, 5000);
    }
    
    return () => {
      if (faceDetectionTimer.current) {
        clearInterval(faceDetectionTimer.current);
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      // Get screen and camera streams
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
        video: { cursor: "always" }
      });
      
      const faceStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" }
      });

      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = screenStream;
      }
      
      if (faceVideoRef.current) {
        faceVideoRef.current.srcObject = faceStream;
      }

      setIsRecording(true);
      setRecordingTime(0);
      setAnomalies([]);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Recording failed to start:", error);
      alert("Could not start recording. Please allow permissions.");
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    
    // Calculate face visibility percentage (simplified)
    const faceVisiblePercentage = faceVisible ? 100 : 0;
    
    // Save recording data
    try {
      const response = await fetch('/api/tasks/recording', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          taskId: task._id,
          duration: recordingTime,
          anomalies,
          faceVisiblePercentage
        })
      });
      
      const data = await response.json();
      router.push(`/tasks/defense?attemptId=${data.attemptId}`);
      
    } catch (error) {
      console.error("Failed to save recording:", error);
    }
  };

  // Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isRecording) {
        setAnomalies(prev => [...prev, "Browser tab switched during recording"]);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRecording]);

  // Detect paste events
  useEffect(() => {
    const handlePaste = (e) => {
      if (isRecording) {
        setAnomalies(prev => [...prev, "Copy-paste detected during recording"]);
      }
    };
    
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [isRecording]);

  // Format time helper
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <div className="flex justify-center items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {task.difficulty}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Points: {task.points}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
          {/* Screen Feed */}
          <video 
            ref={screenVideoRef}
            autoPlay 
            muted 
            className="w-full h-full object-contain bg-black"
          />
          
          {/* Face Camera Feed */}
          <div className="absolute bottom-4 right-4 w-1/4 aspect-square rounded-lg border-2 border-white shadow-lg">
            <video 
              ref={faceVideoRef}
              autoPlay 
              muted 
              className="w-full h-full object-cover"
            />
            {!faceVisible && (
              <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold">Face Not Visible</span>
              </div>
            )}
          </div>
          
          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span>Recording: {formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Anomalies Display */}
      {anomalies.length > 0 && (
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="font-bold text-yellow-800 mb-2">Anomalies Detected:</h3>
          <ul className="list-disc pl-5 text-yellow-700">
            {anomalies.map((anomaly, index) => (
              <li key={index}>{anomaly}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="w-full max-w-md bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            Stop Recording & Continue
          </button>
        )}
        
        <div className="text-sm text-gray-600 text-center">
          <p>Ensure your face is clearly visible throughout the recording</p>
          <p>Do not switch tabs or copy-paste content during the task</p>
        </div>
      </div>
    </div>
  );
}