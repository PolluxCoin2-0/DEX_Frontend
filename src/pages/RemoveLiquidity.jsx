import { useState } from "react";
import {
  getApprovePair,
  getBalanceOfPair,
  removeLiquidity,
} from "../utils/Axios";
import { useSelector } from "react-redux";
import polluxWeb from "polluxweb";
import { toast } from "react-toastify";

const RemoveLiquidity = () => {
  const [percentage, setPercentage] = useState("");
  const [customPercentage, setCustomPercentage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [customDeadline, setCustomDeadline] = useState("");
  const [customPercentageSelected, setCustomPercentageSelected] =
    useState(false);
  const [customDeadlineSelected, setCustomDeadlineSelected] = useState(false);
  const walletAddress = useSelector((state) => state?.wallet);

  const handlePercentageChange = (value) => {
    if (value === "Custom") {
      setCustomPercentageSelected(true);
      setPercentage(""); // Reset percentage value
    } else {
      setCustomPercentageSelected(false);
      setPercentage(value);
    }
  };

  const handleDeadlineChange = (value) => {
    if (value === "Custom") {
      setCustomDeadlineSelected(true);
      setDeadline(""); // Reset deadline value
    } else {
      setCustomDeadlineSelected(false);
      setDeadline(value);
    }
  };

  const handleRemoveClick = async () => {
    if(!walletAddress?.address){
      toast.error("Please connect your wallet");
      return;
    }
    const percentageValue = customPercentageSelected
      ? customPercentage
      : percentage;
    const deadlineValue = customDeadlineSelected ? customDeadline : deadline;
    if(!percentageValue ||!deadlineValue){
      toast.error("Please enter percentage and deadline");
      return;
    }

    let totalLiquidity;

    try {
      // BalanceOfPair
      const responseOfBalanceOfPair = await getBalanceOfPair(
        walletAddress?.address
      );
      totalLiquidity = responseOfBalanceOfPair.data.hex;

      // Calculation of Liquidity
      let liquidity = Math.floor(
        (totalLiquidity * (1000 - percentageValue * 10)) / 1000
      );
      liquidity = await polluxWeb.toHex(liquidity);
      console.log("liquidity", liquidity, "percentage", percentageValue);

      // ApprovePair
      const transaction = await getApprovePair(
        walletAddress?.address,
        liquidity
      );

      console.log(transaction?.data);

      if (!transaction?.data) {
        // Sign Transaction
        const signedTransaction = await window.pox.signdata(
          transaction?.data?.transaction
        );

        console.log(signedTransaction);

        // Broadcast Transaction
        const result = JSON.stringify(
          await window.pox.broadcast(JSON.parse(signedTransaction[1]))
        );

        console.log(result);
      }

      // RemoveLiquidity API
      const removeLiquidityData = await removeLiquidity(
        percentageValue,
        walletAddress?.address,
        deadlineValue
      );

      console.log(removeLiquidityData);

      // Sign Transaction
      const signedTransaction1 = await window.pox.signdata(
        removeLiquidityData?.data?.transaction
      );

      console.log(signedTransaction1[1]);

      // Broadcast Transaction
      const result1 = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
      );

      console.log(result1);

      if (removeLiquidityData?.statusCode)
        toast.success("Liquidity removed successfully");
    } catch (error) {
      console.error("API Error:", error);
      // Handle error (if needed, you can display an error message to the user)
    }
  };

  return (
    <div className="flex pt-20 md:pt-12 lg:pt-12 min-h-screen flex-col items-center mt-40 px-4 text-white">
      <div className="w-full max-w-md bg-[#1B1B1B] p-6 rounded-lg shadow-lg">
        <label className="block mb-2 text-lg font-semibold">Percentage</label>
        <div className="flex flex-wrap mb-4 space-x-2">
          {["25", "50", "75", "100", "Custom"].map((value) => (
            <div
              key={value}
              className={`p-2 mb-2 rounded cursor-pointer text-center flex-1 ${
                percentage === value || (customPercentageSelected && value === "Custom")
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-600 text-white"
              }`}
              onClick={() => handlePercentageChange(value)}
            >
              <p>{value === "Custom" ? "Custom" : `${value}%`}</p>
            </div>
          ))}
        </div>
        {customPercentageSelected && (
          <input
            type="text"
            placeholder="Enter custom percentage"
            value={customPercentage}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numeric input for custom percentage
              if (/^\d*$/.test(value) || value === "") {
                setCustomPercentage(value);
              }
            }}
            className="block w-full p-2 mb-4 bg-gray-600 border border-gray-600 rounded"
          />
        )}

        <label className="block mb-2 text-lg font-semibold">Deadline</label>
        <div className="flex flex-wrap mb-4 space-x-2">
          {["5", "10", "15", "Custom"].map((value) => (
            <div
              key={value}
              className={`p-2 mb-2 rounded cursor-pointer text-center flex-1 ${
                deadline === value || (customDeadlineSelected && value === "Custom")
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-600 text-white"
              }`}
              onClick={() => handleDeadlineChange(value)}
            >
              <p>{value === "Custom" ? "Custom" : `${value} min`}</p>
            </div>
          ))}
        </div>
        {customDeadlineSelected && (
          <input
            type="text"
            placeholder="Enter custom deadline"
            value={customDeadline}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only numeric input for custom deadline
              if (/^\d*$/.test(value) || value === "") {
                setCustomDeadline(value);
              }
            }}
            className="block w-full p-2 mb-4 bg-gray-600 border border-gray-600 rounded"
          />
        )}

        <button
          className="w-full p-2 text-black bg-[#F3BB1B] font-bold hover:bg-yellow-500 rounded"
          onClick={handleRemoveClick}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default RemoveLiquidity;
