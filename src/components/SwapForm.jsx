import { useEffect, useState } from "react";
import { TbArrowsDownUp, TbArrowsUpDown } from "react-icons/tb";
import DropdownButton from "../components/DropDownButton";
import InputField from "../components/InputField";
import Logo from "../assets/Logo.png";
import { IoAddOutline } from "react-icons/io5";
import { GrSubtract } from "react-icons/gr";
import { getReverseTokenAPI, getSwap, getSwapAmount } from "../utils/Axios";
import { useSelector } from "react-redux";
import SlippageDropDown from "./SlippageDropDown";
import DeadLineDropDown from "./DeadLineDropDown";

const SwapForm = () => {
  const walletAddress = useSelector((state) => state?.wallet);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromToken, setFromToken] = useState("Select a token");
  const [toToken, setToToken] = useState("Select a token");
  const [showRecipient, setShowRecipient] = useState(false);
  const [slippage, setSlippage] = useState("");
  const [customSlippage, setCustomSlippage] = useState("");
  const [swapArrowState, setSwapArrowState] = useState(true);
  const [debouncedAmount, setDebouncedAmount] = useState(fromAmount);
  const [bothTokenSelected, setBothTokenSelected] = useState(false);

  // Handle input change with debounce
  const handleFromAmountChange = (e) => {
    setFromAmount(e.target.value);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedAmount(fromAmount);
    }, 100);

    // Cleanup timeout if the component unmounts or fromAmount changes
    return () => clearTimeout(debounceTimer);
  }, [fromAmount]);


  useEffect(() => {
    const fetchSwapAmount = async () => {
      if (debouncedAmount) {
        const data = await getSwapAmount(debouncedAmount);
        setToAmount(Number(data));
      }
    };
    fetchSwapAmount();
  }, [debouncedAmount]);

  const handleSwap = () => {
    const isValidInput =
      fromAmount &&
      fromToken !== "Select a token" &&
      toToken !== "Select a token";
    if (!isValidInput) {
      alert("Enter both input value and select both tokens.");
      return;
    }
    getSwap(walletAddress?.address, fromAmount, fromToken, toToken);
  };

  useEffect(() => {
    const checkBothTokensSelected = () => {
      setBothTokenSelected(fromToken !== "Select a token" && toToken !== "Select a token");
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
    setToAmount(0);
    setFromToken(toToken);
    setToToken(fromToken);

    // await getReverseTokenAPI(fromAmount);
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
    <div className="w-full pt-6 md:pt-12">
      <InputField
        type="number"
        label="From"
        placeholder="Enter an amount"
        value={fromAmount}
        onChange={handleFromAmountChange}
        disabled={!bothTokenSelected} 
      >
        <DropdownButton
          selectedOption={fromToken}
          onOptionSelect={handleFromTokenSelect}
          otherSelectedOption={toToken}
        />
      </InputField>

      {swapArrowState ? (
        <TbArrowsDownUp
          size={20}
          className="my-4 md:my-8"
          style={{ cursor: "pointer" }}
          onClick={handleReverseToken}
          color="white"
        />
      ) : (
        <TbArrowsUpDown
          size={20}
          className="my-4 md:my-8"
          style={{ cursor: "pointer" }}
          onClick={handleReverseToken}
          color="white"
        />
      )}

      <div className="flex justify-between border-[1px] rounded-lg px-4 py-3">
        <p className="text-white font-semibold ">{toAmount}</p>
        <DropdownButton
          selectedOption={toToken}
          onOptionSelect={handleToTokenSelect}
          otherSelectedOption={fromToken}
        />
      </div>

      <SlippageDropDown
        slippage={slippage}
        setSlippage={setSlippage}
        customSlippage={customSlippage}
        setCustomSlippage={setCustomSlippage}
      />

      <DeadLineDropDown />

      <div className="flex items-center justify-end mt-2 mb-6 w-full cursor-pointer">
        <button
          onClick={() => setShowRecipient(!showRecipient)}
          className="flex items-center space-x-1 text-green-500"
        >
          {showRecipient ? (
            <GrSubtract size={20} />
          ) : (
            <IoAddOutline size={20} />
          )}
          <p className="font-bold">
            {showRecipient ? "Remove Recipient" : "Add Recipient"}
          </p>
        </button>
      </div>

      {showRecipient && (
        <InputField
          type="text"
          label="Recipient"
          placeholder="Input wallet Address"
          onChange={(e) => setFromAmount(e.target.value)}
        />
      )}
      <div className="text-center">
        <p className="text-[#F3BB1B] cursor-pointer mt-2 font-bold">View Token</p>

        <div className="flex items-center justify-center space-x-2 py-2 md:py-4 font-semibold">
          <img src={Logo} alt="pox-logo" className="w-8 h-8 md:h-auto" />
          <p className="text-white font-bold">POX</p>
        </div>

        <button
          onClick={handleSwap}
          className="font-bold w-full md:w-3/4 mt-6 rounded-md bg-[#F3BB1B] px-4 py-[7px] cursor-pointer"
        >
          {walletAddress?.address ? "Swap" : "Connect To Wallet"}
        </button>
      </div>
    </div>
  );
};

export default SwapForm;
