"use client";
import { useState, useEffect, useRef } from "react";
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function TaskVerification() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isRecording, setIsRecording] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [anomalyCount, setAnomalyCount] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [anomalyMessages, setAnomalyMessages] = useState([]);
  const screenVideoRef = useRef(null);
  const faceVideoRef = useRef(null);
  const timerRef = useRef(null);
  const anomalyTimerRef = useRef(null);
  const pasteCountRef = useRef(0);
  const lastPasteTimeRef = useRef(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const screenStreamRef = useRef(null);
  const faceStreamRef = useRef(null);

  // Initialize media streams and recording
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (faceStreamRef.current) {
        faceStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handlePaste = (e) => {
    const now = Date.now();
    if (now - lastPasteTimeRef.current < 5000) {
      pasteCountRef.current++;
      if (pasteCountRef.current > 2) {
        triggerAnomaly("Copy-paste burst detected!");
      }
    } else {
      pasteCountRef.current = 1;
    }
    lastPasteTimeRef.current = now;
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      triggerAnomaly("Browser tab switched during recording!");
    }
  };

  const triggerAnomaly = (message) => {
    setShowWarning(true);
    setAnomalyCount(prev => prev + 1);
    setAnomalyMessages(prev => [...prev, message]);
    setTimeout(() => setShowWarning(false), 5000);
  };

  const startRecording = async () => {
    try {
      // Get screen stream
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
        video: { cursor: "always" },
        audio: true
      });
      
      // Get face camera stream
      const faceStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false
      });

      // Set video elements
      screenVideoRef.current.srcObject = screenStream;
      faceVideoRef.current.srcObject = faceStream;

      // Combine streams
      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...faceStream.getTracks()
      ]);

      // Create media recorder
      mediaRecorderRef.current = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });

      // Collect data chunks
      chunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        await saveRecordingMetadata(blob);
      };

      mediaRecorderRef.current.start(1000); // Capture 1s chunks

      // Store references for cleanup
      screenStreamRef.current = screenStream;
      faceStreamRef.current = faceStream;

      // Handle screen sharing stop
      screenStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };

      setIsRecording(true);
      setRecordingTime(0);
      setAnomalyCount(0);
      setAnomalyMessages([]);
      pasteCountRef.current = 0;
      lastPasteTimeRef.current = 0;
      
    } catch (error) {
      console.error("Recording failed to start:", error);
      triggerAnomaly("Could not start recording. Please allow permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (faceStreamRef.current) {
      faceStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    setIsRecording(false);
  };

  const saveRecordingMetadata = async (blob) => {
    const formData = new FormData();
    formData.append('recording', blob, 'recording.webm');
    formData.append('duration', recordingTime);
    formData.append('anomalies', JSON.stringify(anomalyMessages));
    formData.append('userId', session.user.id);

    try {
      const response = await fetch('/api/tasks/recording', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/tasks/defense?attemptId=${data.attemptId}`);
      }
    } catch (error) {
      console.error('Failed to save recording metadata:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Anomaly detection
  useEffect(() => {
    if (isRecording) {
      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Simulate periodic anomaly checks
      anomalyTimerRef.current = setInterval(() => {
        if (Math.random() < 0.3) {
          triggerAnomaly("Behavioral anomaly detected!");
        }
      }, 10000);

      // Set up event listeners
      document.addEventListener('paste', handlePaste);
      document.addEventListener('visibilitychange', handleVisibilityChange);
    } else {
      clearInterval(timerRef.current);
      clearInterval(anomalyTimerRef.current);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(anomalyTimerRef.current);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRecording]);

  return (
    <Sidebar>
      <div className="p-2">
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <main className="container mx-auto px-2 py-4 flex flex-col items-center">
            <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-lg relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="relative p-6 md:p-8">
                <div className="mb-6 text-center">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Step 1 of 3
                  </p>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                    Dual Camera Recording
                  </h2>
                  <p className="mt-3 text-base text-slate-600 max-w-md mx-auto">
                    Record your face and screen simultaneously to verify your task
                    completion.
                  </p>
                  <p className="mt-2 text-sm font-semibold italic text-emerald-500">
                    'Where Knowledge Becomes Currency'
                  </p>
                </div>

                <div className="mb-6">
                  <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-inner">
                    {/* Screen feed */}
                    <video 
                      ref={screenVideoRef}
                      autoPlay
                      muted
                      className="h-full w-full object-contain bg-black"
                    />
                    
                    {/* Face feed */}
                    <div className="absolute bottom-4 right-4 w-1/4 aspect-square overflow-hidden rounded-lg border-2 border-white/50 shadow-lg">
                      <video 
                        ref={faceVideoRef}
                        autoPlay
                        muted
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Recording indicator and timer */}
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-white font-medium text-sm">
                          {formatTime(recordingTime)}
                        </span>
                      </div>
                    )}

                    {/* Record button */}
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`group absolute flex size-16 md:size-20 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                        isRecording
                          ? "bg-red-500/80 hover:bg-red-600/80"
                          : "bg-white/20 hover:bg-white/30"
                      }`}
                    >
                      <span
                        className={`material-icons text-4xl md:text-5xl text-white drop-shadow-lg ${
                          isRecording ? "" : "ml-1"
                        }`}
                      >
                        {isRecording ? "stop" : "play_arrow"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Anomaly warning */}
                {showWarning && (
                  <div className="mb-6 h-10">
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-amber-100 p-2 text-center text-sm font-medium text-amber-700">
                      <span className="material-icons animate-pulse text-xl">
                        warning_amber
                      </span>
                      <p>Anomaly detected!</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex w-full max-w-xs items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                      isRecording
                        ? "bg-red-500 shadow-red-500/30 hover:bg-red-600"
                        : "bg-blue-600 shadow-blue-600/30 hover:bg-blue-700"
                    }`}
                  >
                    <span className="material-icons">
                      {isRecording ? "stop" : "videocam"}
                    </span>
                    <span className="truncate">
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </span>
                  </button>
                  
                  <div className="flex justify-between w-full max-w-xs text-sm">
                    <div className="text-slate-500">
                      Anomalies: <span className="font-semibold">{anomalyCount}</span>
                    </div>
                    <button 
                      className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                      onClick={() => router.push('/tasks/defense')}
                    >
                      Proceed to Next Step
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 p-2">
                <div className="h-2 w-full rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: "33%" }}
                  ></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Sidebar>
  );
}