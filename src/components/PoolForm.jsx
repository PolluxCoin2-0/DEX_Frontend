import { useEffect, useState } from "react";
import DropdownButton from "../components/DropDownButton";
import PoolTable from "./PoolTable";
import {
  getAddLiquidity,
  getAllowance,
  getAllowanceWPOX,
  getApproval,
  getApproveWPOX,
} from "../utils/Axios";
import SuccessModal from "./SuccessModal";
import { useSelector } from "react-redux";
import DeadLineDropDown from "./DeadLineDropDown";
import { TbArrowsDownUp, TbArrowsUpDown } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";
import SlippageDropDown from "./SlippageDropDown";

const PoolForm = () => {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromToken, setFromToken] = useState("Select a token");
  const [toToken, setToToken] = useState("Select a token");
  const [error, setError] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const walletAddress = useSelector((state) => state?.wallet);
  const [deadLine, setDeadLine] = useState("");
  const [slippage, setSlippage] = useState("");
  const [swapArrowState, setSwapArrowState] = useState(true);
  const [bothTokenSelected, setBothTokenSelected] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const handleGetAddLiquidity = async () => {
    // allowance APi
    const allowance = await getAllowance(walletAddress?.address);
    const allowanceWPox = await getAllowanceWPOX(walletAddress?.address);
    console.log("allowanceWPOx", allowanceWPox);

    if (allowanceWPox?.data < fromAmount) {
      const approvedWPox = await getApproveWPOX(
        walletAddress?.address,
        fromAmount
      );
      console.log("approvedWPOX", approvedWPox?.data?.transaction);

      const signedTransaction = await window.pox.signdata(
        approvedWPox?.data?.transaction
      );

      console.log("signedTransaction", signedTransaction);

      const result = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );
      console.log("result", result);
    }

    if (allowance?.data < toAmount) {
      const transaction = await getApproval(walletAddress?.address, toAmount);

      const signedTransaction = await window.pox.signdata(
        transaction?.data?.transaction
      );

      const result = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );
    }

    const isValidInput =
      fromAmount &&
      toAmount &&
      fromToken !== "Select a token" &&
      toToken !== "Select a token";
    if (!isValidInput) {
      return;
    }

    // console.log(walletAddress?.address,
    //   fromAmount,
    //   toAmount,
    //   fromToken,
    //   toToken,
    //   deadLine,
    // slippage)

    try {
      const data = await getAddLiquidity(
        walletAddress?.address,
        fromAmount,
        toAmount,
        fromToken,
        toToken,
        deadLine,
        slippage
      );

      console.log("data", data);

      const signedTransaction = await window.pox.signdata(
        data?.data?.transaction
      );

      const result = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );

      console.log("result", result);

      // if (data?.statusCode === 200) {
      //   setIsShowModal(true);
      //   return;
      // }
    } catch (error) {
      console.error("Error adding liquidity:", error);
    }
  };

  const handleFromTokenSelect = (token) => {
    if (token === toToken) {
      setError("You cannot select the same token for both fields.");
    } else {
      setFromToken(token);
      setError("");
    }
  };

  const handleToTokenSelect = (token) => {
    if (token === fromToken) {
      setError("You cannot select the same token for both fields.");
    } else {
      setToToken(token);
      setError("");
    }
  };

  useEffect(() => {
    const checkBothTokensSelected = () => {
      setBothTokenSelected(
        fromToken !== "Select a token" && toToken !== "Select a token"
      );
    };

    // if (fromToken === "Select a token" || toToken === "Select a token") {
    //   alert("Please select both tokens before swapping.");
    //   return;
    // }else{
    checkBothTokensSelected();
    // }
  }, [fromToken, toToken]);

  const handleReverseToken = async () => {
    if (fromToken === "Select a token" || toToken === "Select a token") {
      alert("Please select both tokens before swapping.");
      return;
    }

    // Perform the swap
    setSwapArrowState(!swapArrowState);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setFromToken(toToken);
    setToToken(fromToken);

    // await getReverseTokenAPI(fromAmount);
  };

  const handleFromAmountChange = (e) => {
    const newAmount = e.target.value;
    setFromAmount(newAmount);
  };

  const handleToAmountChange = (e) => {
    const newAmount = e.target.value;
    setToAmount(newAmount);
  };

  return (
    <div className="w-full text-center pt-5 pb-10">
      <div className="flex justify-between items-center pb-4 text-white">
        <p className="font-semibold text-lg pl-2">Pool</p>
        <RiSettings5Fill
          color="white"
          size={24}
          className="cursor-pointer"
          onClick={() => setShowSetting(!showSetting)}
        />
      </div>

      <div className="relative">
        {showSetting && (
          <div className="mb-4 absolute w-full flex justify-end z-30">
            <div className="bg-[#1B1B1B] px-6 pb-6 flex flex-col items-end rounded-2xl border-2 border-[#333333]">
              <SlippageDropDown slippage={slippage} setSlippage={setSlippage} />
              <DeadLineDropDown deadLine={deadLine} setDeadLine={setDeadLine} />
            </div>
          </div>
        )}

        <div className="">
          <div className="bg-[#1B1B1B] p-6 rounded-2xl flex flex-col">
            <div className="flex justify-between">
              <label className="font-semibold text-[#8a8a8a] text-lg pb-4">
                Token A
              </label>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                className="py-2 bg-[#1B1B1B] text-white outline-none placeholder:text-4xl text-2xl w-full"
                placeholder="0"
                onChange={handleFromAmountChange}
                value={fromAmount}
                disabled={!bothTokenSelected}
              />
              <div className="bg-[#181717] px-4 py-2 rounded-2xl border-[1px] border-[#333333] shadow-inner whitespace-nowrap">
                <DropdownButton
                  selectedOption={fromToken}
                  onOptionSelect={handleFromTokenSelect}
                  otherSelectedOption={toToken}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center -mt-5">
            <div className="inline-block border-4 border-black px-4 rounded-lg bg-[#1B1B1B]">
              {swapArrowState ? (
                <TbArrowsDownUp
                  size={24}
                  className="my-4"
                  style={{ cursor: "pointer" }}
                  onClick={handleReverseToken}
                  color="white"
                />
              ) : (
                <TbArrowsUpDown
                  size={24}
                  className="my-4"
                  style={{ cursor: "pointer" }}
                  onClick={handleReverseToken}
                  color="white"
                />
              )}
            </div>
          </div>

          <div className="bg-[#1B1B1B] p-6 rounded-2xl flex flex-col -mt-9">
            <div className="flex justify-between">
              <label className="font-semibold text-[#8a8a8a] text-lg pb-4">
                Token B
              </label>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                className="py-2 bg-[#1B1B1B] text-white outline-none placeholder:text-4xl text-2xl w-full"
                placeholder="0"
                value={toAmount}
                onChange={handleToAmountChange}
                disabled={!bothTokenSelected}
              />
              <div className="bg-[#181717] px-3 py-2 rounded-2xl border-[1px] border-[#333333]  shadow-inner whitespace-nowrap">
                <DropdownButton
                  selectedOption={toToken}
                  onOptionSelect={handleToTokenSelect}
                  otherSelectedOption={fromToken}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PoolTable />
      <button
        // onClick={() => setShowPoolTable(!showPoolTable)}
        onClick={handleGetAddLiquidity}
        className="font-bold w-full mt-14 rounded-md bg-[#F3BB1B] px-4 py-[10px] cursor-pointer"
      >
        {walletAddress?.address ? "Add Liquidity" : "Connect To Wallet"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {isShowModal && <SuccessModal />}
    </div>
  );
};

export default PoolForm;
