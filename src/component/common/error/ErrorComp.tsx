import { Link, useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';
import { RefreshCcw, House } from 'lucide-react';

interface ErrorProps {
    error?: Error | null;
}

const ErrorComp = ({error}: ErrorProps) => {
    const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-bg overflow-x-hidden">
      <h2 className="text-3xl font-bold text-toastErrorText mb-3 font-merriweather">Something went wrong</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-5 font-inter">
        An unexpected error occurred. Please try again.
      </p>

      {error && (
        <pre className="hidden w-full bg-red-100 dark:bg-red-950 text-red-500 text-sm p-5 rounded  max-w-xl overflow-auto mb-5">
          {error.message}
        </pre>
      )}

      <div className="flex items-center justify-center flex-wrap gap-4">
        <Buttons
        variant="primary"
        iconRight={<RefreshCcw size={16}/>}
          onClick={handleRefresh}
          className="rounded"
        >
          Refresh Page
        </Buttons>
        <Link to="/dashboard">
        <Buttons
        variant="secondary"
        iconRight={<House size={16}/>}
          onClick={handleGoHome}
          className="rounded shadow-md"
        >
          Go to Home
        </Buttons>
        </Link>
      </div>
    </div>
  )
}

export default ErrorComp