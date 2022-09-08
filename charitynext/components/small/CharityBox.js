import Image from "next/image";
import React from "react";
import { BsBookmark } from "react-icons/bs";
import { ethers } from "ethers";
import Link from "next/link";

const CharityBox = ({ charity }) => {
  return (
    <Link href={`/charity/${charity.id}`}>
      <div className="shadow-md flex w-[250px] h-[260px] rounded-xl border-[1px] bg-gray-200 border-gray-300 flex-col">
        <div className="flex w-full max-h-[150px] h-[150px] ">
          {/* <BsBookmark
          size={25}
          className=" z-[90] text-white relative top-5 left-56"
        /> */}
          <img
            className="relative w-full h-full flex object-cover rounded-t-xl "
            // width={250}
            // height={80}
            src={charity.mainImage || ""}
          />
        </div>
        <div className="p-4 ">
          <h1 className="text-md py-1 font-bold">{charity.name}</h1>
          <div className="flex flex-wrap text-sm gap-x-2 ">
            <span className=" text-green-400 font-bold text-xs">
              {charity.fundedAmount
                ? (
                    ethers.BigNumber.from(charity.fundedAmount).div(
                      "1000000000000000"
                    ) / 1000
                  ).toString()
                : "0"}
              eth
            </span>
            <span className=" text-gray-700 text-xs"> raised from</span>
            <p className=" text-gray-700 text-xs">
              goal of{" "}
              <span className="text-green-500 font-bold">
                {ethers.BigNumber.from(charity.goal).div("1000000000000000") /
                  (1000).toString()}{" "}
                ether
              </span>
            </p>
          </div>
          {/* { bar chart  */}
          <hr />
          <div className="flex gap-x-2 text-xs justify-between">
            <p className="flex gap-x-1 ">
              <span className="text-green-400 font-bold">
                {charity.funders.filter((x, i, a) => a.indexOf(x) == i).length}
              </span>{" "}
              {charity.funders.filter((x, i, a) => a.indexOf(x) == i).length ==
              1
                ? "Donator"
                : "Donators"}
            </p>
            <p>
              from{" "}
              {charity && new Date(charity.createdAt * 1000).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharityBox;
