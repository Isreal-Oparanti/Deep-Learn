
export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
        <div className="relative w-16 h-16">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-16 w-16 bg-blue-600"></span>
        </div>
        <p className="mt-6 text-lg text-gray-600 font-medium animate-pulse">
          Loading DeepLearn...
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Where Knowledge Becomes Currency 
        </p>
      </div>
    );
  }