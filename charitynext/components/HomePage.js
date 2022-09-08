import Image from "next/image";
import React from "react";
import Background from "../assets/background.png";
import Main from "./Main";
import Header from "./small/Header";

const HomePage = () => {
  return (
    <div className="relative p-4 bg-[#0A0028] w-screen h-screen overflow-hidden ">
      <Image src={Background} className=" object-cover" />
      <div className="z-[99] absolute top-5 flex w-full text-white px-16 pr-24 py-2">
        <Header className="z-[99]" />
      </div>
      {/**control box below */}
      <div className="absolute p-16 mt-4 right-0 left-0 ml-atuo mr-auto top-0 bottom-0  mb-auto ">
        <div className="w-full shadow-lg shadow-white h-full bg-white opacity-[0.35] rounded-3xl "></div>
      </div>
      <div className="absolute p-16 overflow-scroll right-0 left-0 ml-atuo mr-auto top-0 bottom-0 mt-auto mb-auto ">
        <div className="px-4 py-10 overflow-scroll w-full h-full flex rounded-3xl ">
          <Main className="z-[99] overflow-scroll" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
