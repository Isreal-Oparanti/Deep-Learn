"use client";
import { useState } from "react";
import Sidebar from '@/components/Sidebar';
import Head from "next/head";

export default function TaskVerification() {
  const [isRecording, setIsRecording] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate anomaly detection after 2 seconds
      setTimeout(() => setShowWarning(true), 2000);
    } else {
      setShowWarning(false);
    }
  };

  return (
    <Sidebar>
        <div className="p-2">
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* <Head>
        <title>DeepLearn Points - Task Verification</title>
        <meta name="description" content="Verify your task completion" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head> */}

      {/* Header */}
      {/* <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-blue-600"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4C12.95 4 4 7.26 4 11.27C4 14.01 8.16 16.4 14.31 17.64C8.16 18.88 4 21.26 4 24C4 26.74 8.16 29.12 14.31 30.36C8.16 31.6 4 33.99 4 36.73C4 40.74 12.95 44 24 44C35.05 44 44 40.74 44 36.73C44 33.99 39.84 31.6 33.69 30.36C39.84 29.12 44 26.74 44 24C44 21.26 39.84 18.88 33.69 17.64C39.84 16.4 44 14.01 44 11.27C44 7.26 35.05 4 24 4Z"
                fill="currentColor"
              />
              <path
                d="M24 28C28.42 28 32 26.21 32 24C32 21.79 28.42 20 24 20C19.58 20 16 21.79 16 24C16 26.21 19.58 28 24 28Z"
                fill="#f59e0b"
              />
            </svg>
            <h1 className="text-xl font-bold tracking-tight">
              DeepLearn <span className="text-emerald-500">Points</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-sm font-bold text-blue-600"
              >
                Tasks
              </a>
              <a
                href="#"
                className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Leaderboard
              </a>
              <a
                href="#"
                className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Profile
              </a>
            </nav>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMlgQIM3hkEG5myEFNrj7H_2kyqTEeW4f8u-svqEP1KriRebGxE0TTv_r3IGyZAqT-Tu6SKAPwsLaDUvsbonZhJh8XqAXlmP73Cuvv8iCRpWY14GWKrwn-GYGB6K1zy0-mWIE6ek2nIbVns4J05HQwsUANZmLO8P-D7ixqSIhCFsnsBE7NghxShqmWZpbrASERRmDJtrQdlYF_paZD7qKexhDFNGpGLW8NcCOKjKHosNS-0cNrc3Hr1kea_zPWsoB_SQW3fhn8MPk')",
              }}
            ></div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto px-2 py-4 flex flex-col items-center">
        <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-lg relative overflow-hidden">
          {/* Adinkra pattern background */}
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
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0_4bELXQqudtrJm3GlRE5FPkqd_yaTUxM89iyJHMrYSSLj6fNJ8QW4dkwVg1hcFIn7cp4Y0gXM8pr56E9xLhREkUcBYOtT1uw1clUSWEIQD28TBwFK3g1Ogiw3zM0vkQTDM0643DI-Z8KNbTtNS7As7RmAkRmBdMfhnPRe5JR8IVheGUraSLncY1kgqWrXEsT-9LUvaIoPzc3j0FoiUmMkaqwuJOtTNxbN3WGEsV4YNUrtPy66zguNc7-75s1PoX2ZiKZBEEzKjg')",
                  }}
                ></div>

                {/* Face feed */}
                <div className="absolute bottom-4 right-4 w-1/4 aspect-square overflow-hidden rounded-lg border-2 border-white/50 shadow-lg">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMlgQIM3hkEG5myEFNrj7H_2kyqTEeW4f8u-svqEP1KriRebGxE0TTv_r3IGyZAqT-Tu6SKAPwsLaDUvsbonZhJh8XqAXlmP73Cuvv8iCRpWY14GWKrwn-GYGB6K1zy0-mWIE6ek2nIbVns4J05HQwsUANZmLO8P-D7ixqSIhCFsnsBE7NghxShqmWZpbrASERRmDJtrQdlYF_paZD7qKexhDFNGpGLW8NcCOKjKHosNS-0cNrc3Hr1kea_zPWsoB_SQW3fhn8MPk')",
                    }}
                  ></div>
                </div>

                {/* Record button */}
                <button
                  onClick={toggleRecording}
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
            {/* {showWarning && (
              <div className="mb-6 h-10">
                <div className="flex items-center justify-center gap-2 rounded-lg bg-amber-100 p-2 text-center text-sm font-medium text-amber-700">
                  <span className="material-icons animate-pulse text-xl">
                    warning_amber
                  </span>
                  <p>Keystroke rhythm anomaly detected!</p>
                </div>
              </div>
            )} */}

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={toggleRecording}
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
              
              <button className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-800">
                Proceed to Next Step
              </button>
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