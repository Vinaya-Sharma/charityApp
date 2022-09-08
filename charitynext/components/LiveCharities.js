import React, { useContext } from "react";
import CharityBox from "./small/CharityBox";
import Background from "../assets/background.png";
import Image from "next/image";
import data2 from "../constants/data2";
import { CharityContext } from "../context/CharityContext";
import Link from "next/link";

const LiveCharities = () => {
  const { allCharities } = useContext(CharityContext);
  console.log(allCharities);
  return (
    <div className="overflow-scroll flex scrollbar-hide pt-12 flex-col w-full h-[70vh]">
      <h1 className="text-5xl font-bold text-white">Welcome Back!</h1>
      <p className="text-lg  text-white">Check out our live charities below</p>
      <div className=" flex   flex-wrap mt-10 gap-4">
        {allCharities?.activeCharities &&
          allCharities.activeCharities.map((item) => {
            if (!item.completed) {
              return <CharityBox charity={item} />;
            }
          })}
      </div>
      <p className="text-lg mt-12 text-white">Find completed charities here</p>
      <div className=" flex   flex-wrap mt-10 gap-4">
        {allCharities?.activeCharities &&
          allCharities.activeCharities.map((item) => {
            if (item.completed) {
              return <CharityBox charity={item} />;
            }
          })}
      </div>
    </div>
  );
};

export default LiveCharities;
