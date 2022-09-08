import { ethers } from "ethers";
import React, { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import theAbi from "../constants/abi.json";
import theAddresses from "../constants/address.json";

const AddCharity = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [goal, setGoal] = useState("");
  const [img, setImg] = useState("");
  const { chainId } = useMoralis();
  const CHAINID = chainId.replace("0x", "");
  const { runContractFunction } = useWeb3Contract();

  async function handleSave() {
    const theParams = {
      abi: theAbi,
      contractAddress: theAddresses[CHAINID],
      functionName: "createCharity",
      params: {
        _name: name,
        _description: desc,
        _goal: ethers.utils.parseEther(goal),
        _image: img,
      },
    };
    await runContractFunction({
      params: theParams,
      onSuccess: async (tx) => {
        await tx.wait(1);
        alert("charity created");
      },
      onError: (e) => {
        console.log(e);
      },
    });
  }

  return (
    <div className="pt-12 px-10">
      <h1 className=" text-5xl font-bold text-white">Add A Charity</h1>
      <p className="text-md text-white">
        Fill out the fields below to run a charity
      </p>
      <div className="flex mt-6 gap-x-4">
        <h1 className="p-4 items-center justify-center bg-white rounded-lg">
          <div className="text-lg font-bold">Start by</div>
          giving your charity a simple name and a detailed description. Help our
          donors understand the cause, problem and how your organization is
          tackling world issues!
        </h1>
        <h1 className="p-4 bg-white  items-center justify-center rounded-lg">
          <div className="text-lg font-bold">Finish off</div>
          by filling out a realistic goal for founds raised in ether along with
          a picture that captures the problem your are solving, who you are, and
          what your organization does.
        </h1>
      </div>
      <div className="flex space-x-2 mt-6 ">
        <input
          className="px-4 rounded-lg py-1 focus:outline-none"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="px-4 rounded-lg py-1 focus:outline-none"
          placeholder="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          className="px-4 rounded-lg py-1 focus:outline-none"
          placeholder="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          className="px-4 rounded-lg py-1 focus:outline-none"
          placeholder="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <h1
          onClick={handleSave}
          className="px-4 cursor-pointer hover:bg-green-300 rounded-full max-w-[250px] py-2 bg-green-400"
        >
          Submit
        </h1>
      </div>
    </div>
  );
};

export default AddCharity;
