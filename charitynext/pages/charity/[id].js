import React, { useContext, useEffect, useState } from "react";
import { CharityContext } from "../../context/CharityContext";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useMoralis, useWeb3Contract } from "react-moralis";
import theAbi from "../../constants/abi.json";
import theAddresses from "../../constants/address.json";
import Moralis from "moralis";

const charityPost = () => {
  const { allCharities } = useContext(CharityContext);
  const { enableWeb3, authenticate, isAuthenticated, isWeb3Enabled } =
    useMoralis();
  const router = useRouter();
  const id = router.asPath.slice(9);
  const { runContractFunction } = useWeb3Contract();
  const [amount, setamount] = useState(0);
  const { chainId, account } = useMoralis();

  async function withdraw(owner, id) {
    const CHAINID = chainId.replace("0x", "");
    const params = {
      abi: theAbi,
      contractAddress: theAddresses[CHAINID],
      functionName: "withdrawFunds",
      params: {
        _owner: owner,
        _id: id,
      },
    };

    await runContractFunction({
      params: params,
      onSuccess: () => {
        alert("funds withdrawm");
      },
      onError: (e) => {
        console.log(e);
      },
    });
  }

  async function donate(owner, id) {
    const CHAINID = chainId.replace("0x", "");
    if (!isWeb3Enabled) {
      await enableWeb3();
    }

    if (!isAuthenticated) {
      await authenticate();
    }

    console.log(amount);
    console.log("making function call..");
    const thevalue = ethers.BigNumber.from(amount * 100000)
      .mul("10000000000000")
      .toString();

    const theParams = {
      abi: theAbi,
      gasLimit: 3e7,
      contractAddress: theAddresses[CHAINID],
      msgValue: thevalue.toString(),
      functionName: "fundCharity",
      params: {
        _owner: owner,
        _id: id,
      },
    };

    await runContractFunction({
      params: theParams,
      gasLimit: 3e7,
      onSuccess: async (tx) => {
        await tx.wait(1);
        alert("successfully funded");
        setamount("");
      },
      onError: (e) => {
        console.log(e);
      },
    });

    console.log("transaction complete");
  }

  return (
    <div>
      {allCharities &&
        allCharities.activeCharities?.map((item) => {
          if (item.id == id) {
            return (
              <div className="w-full  flex h-full p-10">
                <img
                  src={item.mainImage}
                  className="min-w-[200px] w-[40%]  h-full rounded-l-xl mr-8 flex object-cover "
                />
                <div className="flex mt-20 flex-col w-[60%] min-w-[100px]">
                  <h1 className="text-5xl underline mb-2 font-bold text-white">
                    {item.name}{" "}
                  </h1>
                  <h1 className="text-md  text-white">{item.description} </h1>
                  <h1 className="text-md  text-white">
                    help raise money towards the goal of{" "}
                    <span className="text-green-500 font-bold">
                      {ethers.BigNumber.from(item.goal).div(
                        "1000000000000000"
                      ) / (1000).toString()}{" "}
                      eth
                    </span>
                  </h1>
                  <div className="mt-4 flex gap-x-6 ">
                    <h1 className="text-md p-2 bg-white rounded-lg text-gray-700">
                      {
                        item.funders.filter((x, i, a) => a.indexOf(x) == i)
                          .length
                      }{" "}
                      Donators
                    </h1>
                    <h1 className="text-md p-2 bg-white rounded-lg text-gray-700">
                      {ethers.BigNumber.from(item.fundedAmount).div(
                        "1000000000000000"
                      ) / 1000 || "0"}{" "}
                      Eth donated
                    </h1>
                  </div>
                  {/** from createdat date + graph/grid showing how much till goal */}
                  {!item.completed ? (
                    <div>
                      <h1 className="text-md mt-5 font-bold text-white">
                        Popular Donation Amounts (eth){" "}
                      </h1>
                      <div className="flex gap-x-4">
                        <h1
                          onClick={() => setamount(0.005)}
                          className={`text-md ${
                            amount == 0.005
                              ? "text-green-400 font-bold "
                              : " text-white"
                          }`}
                        >
                          0.005
                        </h1>
                        <h1
                          onClick={() => setamount(0.01)}
                          className={`text-md ${
                            amount == 0.01
                              ? "text-green-400 font-bold "
                              : " text-white"
                          }`}
                        >
                          0.01
                        </h1>
                        <h1
                          onClick={() => setamount(0.1)}
                          className={`text-md ${
                            amount == 0.1
                              ? "text-green-400 font-bold "
                              : " text-white"
                          }`}
                        >
                          0.1
                        </h1>
                      </div>
                      <input
                        className="px-4 mt-2 py-1 max-w-[250px] rounded-lg focus:outline-none"
                        value={amount}
                        placeholder="donation amount (eth)"
                        onChange={(e) => setamount(e.target.value)}
                      />
                      <p
                        onClick={() => donate(item.creator, item.idNum)}
                        className="cursor-pointer hover:bg-green-300 text-md mt-4 w-full justify-center items-center flex px-4 py-2 max-w-[250px] bg-green-400 rounded-full text-gray-700"
                      >
                        Donate
                      </p>
                      {account == item.creator && item.fundedAmount > 0 && (
                        <p
                          onClick={() => withdraw(item.creator, item.idNum)}
                          className="cursor-pointer hover:bg-gray-300 text-md mt-4 w-full justify-center items-center flex px-4 py-2 max-w-[250px] bg-white rounded-full text-gray-700"
                        >
                          Withdraw{" "}
                          {ethers.BigNumber.from(item.fundedAmount).div(
                            "1000000000000000"
                          ) / 1000}{" "}
                          Eth
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="cursor-pointer hover:bg-green-300 text-md mt-4 w-full justify-center items-center flex px-4 py-2 max-w-[250px] bg-green-400 rounded-full text-gray-700">
                        Charity is completed
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default charityPost;
