import React from 'react'
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import { RefreshCcw, House } from 'lucide-react';

interface ErrorProps {
    error?: Error | null;
}

const ErrorComp: React.FC<ErrorProps> = ({error}) => {
    const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-bg">
      <h2 className="text-3xl font-bold text-toastErrorText mb-3">Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-5">
        An unexpected error occurred. Please try again.
      </p>

      {error && (
        <pre className="bg-red-100 dark:bg-red-950 text-red-500 text-sm p-3 rounded max-w-xl overflow-auto mb-5">
          {error.message}
        </pre>
      )}

      <div className="flex items-center gap-4">
        <Buttons
        variant="primary"
        iconRight={<RefreshCcw size={16}/>}
          onClick={handleRefresh}
          className="rounded"
        >
          Refresh Page
        </Buttons>
        <Buttons
        variant="secondary"
        iconRight={<House size={16}/>}
          onClick={handleGoHome}
          className="rounded shadow-md"
        >
          Go to Home
        </Buttons>
      </div>
    </div>
  )
}

export default ErrorComp