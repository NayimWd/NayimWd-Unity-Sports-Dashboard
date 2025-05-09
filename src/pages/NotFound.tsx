import Buttons from "../component/common/Buttons";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="h-screen paddingX w-full background flex flex-col justify-center items-center space-y-4">
      <p className="text-font text-6xl sm:text-8xl font-bold tracking-widest"> 404    </p>
      <p className="text-font text-2xl sm:text-5xl font-bold tracking-wider uppercase font-merriweather">Page Not Found</p>
      <Link to="/dashboard">
        <Buttons className="mt-5" variant="warning" iconLeft={<ArrowLeft size={16} />} iconRight={<Home size={16} />}>
          Go Home
        </Buttons>
      </Link>
    </div>

  );
};

export default NotFound;

