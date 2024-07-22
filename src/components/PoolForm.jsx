import { useEffect, useRef, useState } from "react";
import DropdownButton from "../components/DropDownButton";
import PoolTable from "./PoolTable";
import {
  getAddLiquidity,
  getAllowance,
  getApproval,
  getQuateValue,
} from "../utils/Axios";
import { useSelector } from "react-redux";
import DeadLineDropDown from "./DeadLineDropDown";
import { TbArrowsDownUp, TbArrowsUpDown } from "react-icons/tb";
import { RiSettings5Fill } from "react-icons/ri";
import SlippageDropDown from "./SlippageDropDown";
import { toast } from "react-toastify";
import polluxWeb from "polluxweb";
import { without6Decimal } from "../utils/converter";

const PoolForm = () => {
  const walletAddress = useSelector((state) => state?.wallet);
  const networkType = useSelector((state) => state?.wallet.Network);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromToken, setFromToken] = useState("USDX");
  const [toToken, setToToken] = useState("POX");
  const [deadLine, setDeadLine] = useState("5");
  const [slippage, setSlippage] = useState("0.05");
  const [swapArrowState, setSwapArrowState] = useState(true);
  const [bothTokenSelected, setBothTokenSelected] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSetting(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsRef]);

  useEffect(()=>{
    const fetchData = async()=>{
    const quateValue = await getQuateValue(fromAmount);
    const res = await polluxWeb.toDecimal(quateValue?.data?.[0]?.hex)
  const quate =  without6Decimal(res);
    setToAmount(quate);
    }
    fetchData();
  },[fromAmount])

  const handleGetAddLiquidity = async () => {
    if(networkType==="Yuvi Testnet"){
      toast.error("Please switch to the Mainnet network");
      return;
    }

    const isValidInput = fromAmount && toAmount;
    if (!isValidInput) {
      toast.error("Enter both token value !");
      return;
    }

    setLoading(true); // Set loading state
    if (loading) return; // Ignore click if already loading

    // allowance APi
    const allowance = await getAllowance(walletAddress?.address);

      const transaction = await getApproval(walletAddress?.address, toAmount);

      const signedTransaction = await window.pox.signdata(
        transaction?.data?.transaction
      );

      const result = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );

    try {
      const data = await getAddLiquidity(
        walletAddress?.address,
        fromAmount,
        fromToken,
        toToken,
        deadLine,
      );

      console.log(data);

      const signedTransaction = await window.pox.signdata(
        data?.data?.transaction
      );

      console.log(signedTransaction)

      const result = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );

      console.log(result)

      if (data?.statusCode === 200) {
        toast.success("Liquidity added successfully.");
      }

      setFromAmount(0);
      setToAmount(0);
      setLoading(false); // Reset loading state
    } catch (error) {
      toast.error("Error in adding liquidity !");
    }
  };

  const handleFromTokenSelect = (token) => {
    if (token === toToken) {
      toast.error("You cannot select the same token for both fields.");
    } else {
      setFromToken(token);
    }
  };

  const handleToTokenSelect = (token) => {
    if (token === fromToken) {
      toast.error("You cannot select the same token for both fields.");
    } else {
      setToToken(token);
    }
  };

  useEffect(() => {
    const checkBothTokensSelected = () => {
      setBothTokenSelected(
        fromToken !== "Select a token" && toToken !== "Select a token"
      );
    };
    checkBothTokensSelected();
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
  };

  const handleFromAmountChange = (e) => {
    if (!walletAddress?.address) {
      toast.error("Please connect your wallet");
      return;
    }
    const newAmount = e.target.value;
    setFromAmount(newAmount);
  };

  const handleToAmountChange = (e) => {
    if (!walletAddress?.address) {
      toast.error("Please connect your wallet");
      return;
    }
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
            <div
              ref={settingsRef}
              className="bg-[#1B1B1B] px-6 pb-6 flex flex-col items-end rounded-2xl border-2 border-[#333333]"
            >
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
                value={fromAmount > 0 ? fromAmount : ""}
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
                  // onClick={handleReverseToken}
                  color="white"
                />
              ) : (
                <TbArrowsUpDown
                  size={24}
                  className="my-4"
                  style={{ cursor: "pointer" }}
                  // onClick={handleReverseToken}
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
                value={toAmount > 0 ? toAmount : ""}
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
      {loading ? (
        <button
          disabled
          type="button"
          className="flex justify-center items-center space-x-4 font-bold w-full mt-6 rounded-2xl bg-[#F3BB1B] text-black cursor-pointer px-4 py-4 text-xl relative"
        >
          <span className="ml-2 -mt-1">Adding Liquidity</span>
          <div className="flex justify-center items-center space-x-2">
            <div className="h-2 w-2 bg-white rounded-full animate-bounce animation-delay-0"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce animation-delay-0.10s"></div>
            <div className="h-2 w-2 bg-white rounded-full animate-bounce animation-delay-0.2s"></div>
          </div>
        </button>
      ) : (
        <button
          // onClick={() => setShowPoolTable(!showPoolTable)}
          onClick={handleGetAddLiquidity}
          className={`font-bold w-full mt-12 rounded-xl ${
            !walletAddress?.address
              ? "bg-[#1B1B1B] text-[#8a8a8a] cursor-not-allowed"
              : "bg-[#F3BB1B] text-black cursor-pointer"
          } px-4 py-4  text-xl`}
        >
          {walletAddress?.address ? "Add Liquidity" : "Connect To Wallet"}
        </button>
      )}
    </div>
  );
};

export default PoolForm;
