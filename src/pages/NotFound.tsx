import Buttons from "../component/common/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();



  return (
    <div className="h-screen paddingX w-full background flex flex-col justify-center items-center space-y-4">
      <p className="text-font text-6xl sm:text-8xl font-bold tracking-widest"> 404    </p>
      <p className="text-font text-2xl sm:text-5xl font-bold tracking-wider uppercase font-merriweather">Page Not Found</p>
      <div className="mt-5 flex gap-5 items-center">
        <Buttons  className="rounded-sm" onClick={() =>navigate(-1)} variant="warning" iconLeft={<ArrowLeft size={16} />}>
          Go Back
        </Buttons>
  
      <Link to="/dashboard">
        <Buttons className="rounded-sm" variant="secondary" iconRight={<Home size={16} />}>
          Go Home
        </Buttons>
      </Link>
        </div>
    </div>

  );
};

export default NotFound;

