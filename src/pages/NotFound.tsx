import React from "react";
import Buttons from "../component/common/Buttons";
import notFoundImg from "../assets/Image/notFound.svg"

const NotFound: React.FC = () => {
  return (
    <div className="bg-red-300 w-full h-screen  grid place-items-center justify-center items-center  relative">
      <img className="absolute top-0 -mt-4 w-full md:w-2/3" src={notFoundImg} alt="Not Found Image"/>
      <div className="flex flex-col">
      
        <Buttons>Home</Buttons>
      </div>
    </div>
  );
};

export default NotFound;
