import { useEffect, useRef, useState } from "react";
import { TbArrowsDownUp, TbArrowsUpDown } from "react-icons/tb";
import DropdownButton from "../components/DropDownButton";
import {
  getAllowance,
  getApproval,
  getReserves,
  getSwap,
  getSwapAmount,
} from "../utils/Axios";
import { useSelector } from "react-redux";
import SlippageDropDown from "./SlippageDropDown";
import DeadLineDropDown from "./DeadLineDropDown";
import { RiSettings5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setPoxBalance, setUsdxBalance } from "../redux/walletSlice";
import {
  to18Decimal,
  to6Decimal,
  without18Decimal,
  without6Decimal,
} from "../utils/converter";
import { toast } from "react-toastify";
import { VscQuestion } from "react-icons/vsc";

const SwapForm = () => {
  const dispatch = useDispatch();
  const settingsRef = useRef(null);
  const walletAddress = useSelector((state) => state?.wallet.address);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromToken, setFromToken] = useState("POX");
  const [toToken, setToToken] = useState("USDX");
  const [slippage, setSlippage] = useState("0.05");
  const [deadLine, setDeadLine] = useState("5");
  const [swapArrowState, setSwapArrowState] = useState(true);
  const [debouncedAmount, setDebouncedAmount] = useState(fromAmount);
  const [bothTokenSelected, setBothTokenSelected] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [poxPrice, setPoxPrice] = useState(0);

  let poxBalanceFromStore = useSelector((state) => state?.wallet?.poxBalance);
  let usdxBalanceFromStore = useSelector((state) => state?.wallet?.UsdxBalance);

  const [poxBalanceSwap, setPoxBalanceSwap] = useState(poxBalanceFromStore);
  const [usdxBalanceSwap, setUsdxBalanceSwap] = useState(usdxBalanceFromStore);

  useEffect(() => {
    setPoxBalanceSwap(Number(poxBalanceFromStore));
    setUsdxBalanceSwap(Number(usdxBalanceFromStore));
  }, [poxBalanceFromStore, usdxBalanceFromStore]);

  // Handle input change with debounce
  const handleFromAmountChange = (e) => {
    if (!walletAddress) {
      toast.error("Please connect your wallet");
      return;
    }
    const newAmount = e.target.value;
    setFromAmount(newAmount);

    // Reset toAmount when fromAmount changes
    if (!newAmount) {
      setToAmount(0);
    }
  };
  useEffect(() => {
    const fetchPoxPrice = async () => {
      try {
        const data = await getReserves();
        setPoxPrice(Number(data?.data?.pricePOX).toFixed(6)); 
      } catch (error) {
        console.error('Error fetching POX price:', error);
      }
    };

    fetchPoxPrice();
  }, []);

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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedAmount(fromAmount);
    }, 0);

    // Cleanup timeout if the component unmounts or fromAmount changes
    return () => clearTimeout(debounceTimer);
  }, [fromAmount]);

  useEffect(() => {
    const fetchSwapAmount = async () => {
      if (fromToken === "USDX" && fromAmount > 2000) {
        toast.error("Limit exceeded");
        return;
      }

      if (fromToken === "USDX") {
        const amount = to18Decimal(debouncedAmount).toLocaleString("fullwide", {
          useGrouping: false,
        });
        const data = await getSwapAmount(amount, fromToken, toToken);
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
    const isValidInput =
      fromAmount &&
      fromToken !== "Select a token" &&
      toToken !== "Select a token";
    if (!isValidInput) {
      toast.error("Enter both input value.");
      return;
    }

    setLoading(true); // Set loading state
    if (loading) return; // Ignore click if already loading

    const allowance = await getAllowance(walletAddress);
    const transaction = await getApproval(walletAddress, fromAmount);

    const signedTransaction1 = await window.pox.signdata(
      transaction?.data?.transaction
    );

    const result1 = JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
    );

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

    // Connect polink wallet
    var obj = setInterval(async () => {
      if (window.pox) {
        clearInterval(obj);
        const detailsData = JSON.stringify(await window.pox.getDetails());
        const parsedDetailsObject = JSON.parse(detailsData);
        dispatch(
          setPoxBalance(parsedDetailsObject[1]?.data?.Balance / Math.pow(10, 6))
        );
        dispatch(setUsdxBalance(parsedDetailsObject[1]?.data?.USDX));
      }
    }, 1000);

    if (data?.data) {
      toast.success("Swap successfully!");
    } else {
      toast.error("Something went wrong!");
    }

    setFromAmount(0);
    setToAmount(0);
    setLoading(false); // Reset loading state
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
      toast.error("Please select both tokens before swapping.");
      return;
    }

    // Perform the swap
    setSwapArrowState(!swapArrowState);
    setFromAmount(toAmount);
    setToAmount(0);
    setFromToken(toToken);
    setToToken(fromToken);
    dispatch(setPoxBalance(usdxBalanceFromStore));
    dispatch(setUsdxBalance(poxBalanceFromStore));
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

  return (
    <div className="w-full pt-6 ">
      <div className="flex justify-between items-center pb-4 text-white">
      


        <p className="font-semibold text-lg pl-2">Swap</p>
        
        <p>POX Price <span className="text-green-500"></span> = $ {poxPrice>0?poxPrice:0}</p>
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
                Sell
              </label>
              <p className="text-white font-semibold">
                Balance:{Number(poxBalanceSwap).toFixed(6)}
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <input
                type="number"
                className="py-2 bg-[#1B1B1B] text-white outline-none placeholder:text-4xl text-2xl w-full"
                placeholder="0"
                onChange={handleFromAmountChange}
                value={fromAmount > 0 ? fromAmount : ""}
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
                Balance: {Number(usdxBalanceSwap).toFixed(6)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                className="py-2 bg-[#1B1B1B] text-white outline-none placeholder:text-4xl text-2xl w-full"
                placeholder="0"
                value={toAmount > 0 ? toAmount : ""}
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
        {fromAmount > 0 && (
          <div className="bg-[#1B1B1B] text-gray-300 rounded-xl my-4 p-6">
            <div className="flex justify-between items-center mb-2">
              <p className="flex items-center">
                <VscQuestion />
                <span className="ml-2"> Minimum Received</span>
              </p>
              <p className="text-white">
                {toAmount>0?toAmount:0} {toToken}
              </p>
            </div>
            {/* <div className="flex justify-between items-center mb-2">
              <p className="flex items-center"><VscQuestion /> <span className="ml-2">Price Impact</span></p>
              <p>-0.03%</p> 
            </div> */}
            <div className="flex justify-between items-center">
              <p className="flex items-center">
                <VscQuestion />
                <span className="ml-2"> Platform Fees</span>
              </p>
              <p>{fromAmount * 0.005} POX</p>
            </div>
          </div>
        )}
        <div className="text-center">
          {loading ? (
            <button
              disabled
              type="button"
              className="flex justify-center items-center space-x-4 font-bold w-full mt-6 rounded-2xl bg-[#F3BB1B] text-black cursor-pointer px-4 py-4 text-xl relative"
            >
              <span className="ml-2 -mt-1">Swapping</span>
              <div className="flex justify-center items-center space-x-2">
                <div className="h-2 w-2 bg-white rounded-full animate-bounce animation-delay-0"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce animation-delay-0.10s"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce animation-delay-0.2s"></div>
              </div>
            </button>
          ) : (
            <button
              onClick={handleSwap}
              className={`font-bold w-full mt-2 rounded-2xl ${
                !walletAddress
                  ? "bg-[#1B1B1B] text-[#8a8a8a] cursor-not-allowed"
                  : "bg-[#F3BB1B] text-black cursor-pointer"
              } px-4 py-4  text-xl`}
            >
              Swap
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapForm;
