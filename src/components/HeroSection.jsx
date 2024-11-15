import React from "react";

const HeroSection = () => {
  return (
    <main className="relative bg-white py-24 md:py-16 w-full overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 md:py-9 flex items-center justify-between flex-col md:flex-row relative z-10">
        {/* Left Section */}
        <div className="text-center md:text-left md:pl-16 mb-8 md:mb-0 w-full md:w-1/2 lg:w-[630px]">
          <h1 className="text-[#142e38] text-4xl md:text-5xl lg:text-[62px] mb-4 font-bold font-['Poppins'] leading-tight md:leading-[72px] lg:leading-[82px]">
            HIJAU ASRI DAMAI DI HATI
          </h1>
          <p className="mb-6 text-[#142e38] font-sans text-base md:text-lg lg:text-lg">
            Ciptakan kesejukan dan kedamaian di rumah dengan sentuhan hijau.
            Budidaya tanaman menghadirkan suasana asri yang menenangkan hati dan
            pikiran.
          </p>
          <button className="w-[120px] h-[50px] bg-[#318161] text-white font-poppins rounded-lg md:rounded-[16px] border-2 border-[#318161] hover:bg-[#265a4a] transition-colors duration-300 ease-in-out">
            See More
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="./images/plant-image.png"
            alt="plant-image"
            className="w-3/4 md:w-4/5 max-w-[400px] md:max-w-[700px] object-cover"
          />
        </div>
      </div>

      {/* Enhanced Blur Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="blurFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="180" />
            </filter>
          </defs>
          <g filter="url(#blurFilter)">
            <circle cx="20%" cy="30%" r="15%" fill="#318161" opacity="0.7" />
            <circle cx="80%" cy="70%" r="20%" fill="#FCD34D" opacity="0.7" />
            <circle cx="50%" cy="50%" r="25%" fill="#318161" opacity="0.5" />
          </g>
        </svg>
      </div>
    </main>
  );
};

export default HeroSection;