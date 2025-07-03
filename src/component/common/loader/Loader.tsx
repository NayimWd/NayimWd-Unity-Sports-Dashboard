const Loader: React.FC = () => {
  return (
    <div className="flex justify-center  items-center h-screen w-full">
      <div className="relative inline-flex">
        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-[#1E88E5] rounded-full"></div>
        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-[#1E88E5] rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-[#1E88E5] rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
