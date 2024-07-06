import { useEffect, useRef, useState } from "react";
import { TbArrowsDownUp, TbArrowsUpDown } from "react-icons/tb";
import DropdownButton from "../components/DropDownButton";
import {
  getAllowance,
  getApproval,
  getSwap,
  getSwapAmount,
} from "../utils/Axios";
import { useSelector } from "react-redux";
import SlippageDropDown from "./SlippageDropDown";
import DeadLineDropDown from "./DeadLineDropDown";
import { RiSettings5Fill } from "react-icons/ri";
import {
  to18Decimal,
  to6Decimal,
  without18Decimal,
  without6Decimal,
} from "../utils/converter";

const SwapForm = () => {
  const walletAddress = useSelector((state) => state?.wallet.address);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromToken, setFromToken] = useState("POX");
  const [toToken, setToToken] = useState("USDX");
  const [slippage, setSlippage] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [swapArrowState, setSwapArrowState] = useState(true);
  const [debouncedAmount, setDebouncedAmount] = useState(fromAmount);
  const [bothTokenSelected, setBothTokenSelected] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  let usdxBalanceFromStore = useSelector((state) => state?.wallet?.UsdxBalance);
  let poxBalanceFromStore = useSelector((state) => state?.wallet?.poxBalance);
  const [poxBalance, setPoxBalance] = useState(0);
  const [usdxBalance, setUsdxBalance] = useState(0);
  const settingsRef = useRef(null);

  
  useEffect(()=>{
    setPoxBalance(Number(poxBalanceFromStore));
    setUsdxBalance(Number(usdxBalanceFromStore));
  },[usdxBalance, poxBalance])

  // Handle input change with debounce
  const handleFromAmountChange = (e) => {
    const newAmount = e.target.value;
    setFromAmount(newAmount);

    // Reset toAmount when fromAmount changes
    if (!newAmount) {
      setToAmount(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSetting(!showSetting);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsRef]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedAmount(fromAmount);
    }, 100);

    // Cleanup timeout if the component unmounts or fromAmount changes
    return () => clearTimeout(debounceTimer);
  }, [fromAmount]);

  useEffect(() => {
    const fetchSwapAmount = async () => {
      if (fromToken === "USDX") {
        const amount = to18Decimal(debouncedAmount).toLocaleString("fullwide", {
          useGrouping: false,
        });
        const data = await getSwapAmount(amount, fromToken, toToken);
        console.log("data", data);
        setToAmount(
          Number(
            without6Decimal(data).toLocaleString("fullwide", {
              useGrouping: false,
            })
          )
        );
      } else if (debouncedAmount) {
        const amount = to6Decimal(debouncedAmount).toLocaleString("fullwide", {
          useGrouping: false,
        });
        const data = await getSwapAmount(amount, fromToken, toToken);
        console.log("data", data);
        setToAmount(
          Number(without18Decimal(data)).toLocaleString("fullwide", {
            useGrouping: false,
          })
        );
      } else {
        setToAmount(0);
      }
    };
    fetchSwapAmount();
  }, [debouncedAmount]);

  const handleSwap = async () => {
    const allowance = await getAllowance(walletAddress);
    const transaction = await getApproval(walletAddress, fromAmount);

    const signedTransaction1 = await window.pox.signdata(
      transaction?.data?.transaction
    );

    const result1 = JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );

    const isValidInput =
      fromAmount &&
      fromToken !== "Select a token" &&
      toToken !== "Select a token";
    if (!isValidInput) {
      alert("Enter both input value and select both tokens.");
      return;
    }

    const data = await getSwap(
      walletAddress,
      fromAmount,
      fromToken,
      toToken,
      slippage,
      deadLine
    );

    const signedTransaction = await window.pox.signdata(
      data?.data?.transaction
    );

    const result = JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction[1]))
    );

    if (data?.data) {
      alert("Swap successfully!");
    } else {
      alert("Something went wrong!");
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
    setToAmount(0);
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleFromTokenSelect = (token) => {
    if (token === toToken) {
      alert("You cannot select the same token for both fields.");
    } else {
      setFromToken(token);
    }
  };

  const handleToTokenSelect = (token) => {
    if (token === fromToken) {
      alert("You cannot select the same token for both fields.");
    } else {
      setToToken(token);
    }
  };

  return (
    <div className="w-full pt-6 ">
      <div className="flex justify-between items-center pb-4 text-white">
        <p className="font-semibold text-lg pl-2">Swap</p>
        <RiSettings5Fill
          color="white"
          size={24}
          className="cursor-pointer"
          onClick={() => setShowSetting(!showSetting)}
        />
      </div>

      <div className="relative">
        {showSetting && (
          <div className="mb-4 absolute w-full flex justify-end z-30 ">
            <div  ref={settingsRef} className="bg-[#1B1B1B] px-6 pb-6 flex flex-col items-end rounded-2xl border-2 border-[#333333]">
              <SlippageDropDown slippage={slippage} setSlippage={setSlippage} />

              <DeadLineDropDown deadLine={deadLine} setDeadLine={setDeadLine} />
            </div>
          </div>
        )}

        <div className="">
          <div className="bg-[#1B1B1B] p-6 rounded-2xl flex flex-col">
            <div className="flex justify-between">
              <label className="font-semibold text-[#8a8a8a] text-lg pb-4">
                Sell
              </label>
              <p className="text-white font-semibold">
                Balance:{Number(poxBalance).toFixed(6)}
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <input
                type="number"
                className="py-2 bg-[#1B1B1B] text-white outline-none placeholder:text-4xl text-2xl w-full"
                placeholder="0"
                onChange={handleFromAmountChange}
                value={fromAmount}
              />
              <div className="bg-[#181717] px-4 py-2 rounded-2xl border-[1px] border-[#333333] shadow-inner">
                <DropdownButton
                  selectedOption={fromToken}
                  onOptionSelect={handleFromTokenSelect}
                  otherSelectedOption={toToken}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center -mt-7">
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

          <div className="bg-[#1B1B1B] p-6 rounded-2xl flex flex-col -mt-7">
            <div className="flex justify-between mt-3">
              <label className="font-semibold text-[#8a8a8a] text-lg pb-4">
                Buy
              </label>
              <p className="text-white font-semibold">
                Balance: {Number(usdxBalance).toFixed(6)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                className="py-2 bg-[#1B1B1B] text-white outline-none placeholder:text-4xl text-2xl w-full"
                placeholder="0"
                value={toAmount}
              />
              <div className="bg-[#181717] px-3 py-2 rounded-2xl border-[1px] border-[#333333]  shadow-inner">
                <DropdownButton
                  selectedOption={toToken}
                  onOptionSelect={handleToTokenSelect}
                  otherSelectedOption={fromToken}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleSwap}
            className="font-bold w-full mt-6 rounded-2xl bg-[#F3BB1B] px-4 py-4 cursor-pointer text-xl"
          >
            {walletAddress ? "Swap" : "Connect To Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapForm;
