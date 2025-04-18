import React from 'react'
import { useNavigate } from 'react-router-dom';

interface ErrorProps {
    error?: Error | null;
}

const ErrorComp: React.FC<ErrorProps> = ({error}) => {
    const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-bg">
      <h2 className="text-3xl font-bold text-red-600 mb-3">Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-5">
        An unexpected error occurred. Please try again.
      </p>

      {error && (
        <pre className="bg-red-100 dark:bg-red-950 text-red-500 text-sm p-3 rounded max-w-xl overflow-auto mb-5">
          {error.message}
        </pre>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
        >
          Refresh Page
        </button>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded shadow"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}

export default ErrorComp