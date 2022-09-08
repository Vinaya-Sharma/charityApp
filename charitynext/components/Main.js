import React from "react";
import { useMoralis } from "react-moralis";
import LiveCharities from "./LiveCharities";

const Main = () => {
  const { account } = useMoralis();

  const appName = process.env.appName || "";
  return (
    <div className="overflow-scroll px-10">
      {account ? (
        <LiveCharities />
      ) : (
        <div className="space-y-3 overflow-scroll text-white w-full h-full flex-wrap justify-between flex mt-40 ml-20 ">
          <div className="flex overflow-scroll flex-col min-w-[250px] h-[250px] ">
            <h1 className="text-7xl font-bold">Welcome to {appName}!</h1>
            <p className="text-md mt-2 text-xl ">
              Connect with your wallet to post and fund charitieis
            </p>
            <p className="w-[250px] text-gray-700 text-center mt-12 rounded-full px-4 py-2 bg-white">
              About Us
            </p>
          </div>
          {/**image */}
          <div className="flex min-w-[250px] items-center h-[250px]">
            <img
              className="flex object-contain"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/charity-4208774-3485787.png"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
