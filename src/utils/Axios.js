import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const POX_TOKEN_ADDRESS = import.meta.env.VITE_POX_TOKEN_ADDRESS;
const USDX_TOKEN_ADDRESS = import.meta.env.VITE_USDX_TOKEN_ADDRESS;


export const getSwap = async (walletAddress, fromAmount, fromToken, toToken, slippage, deadLine) => {
    let from_Token;
    let to_Token;

    if (fromToken === "POX") {
        from_Token = POX_TOKEN_ADDRESS;
    } else if (fromToken === "USDX") {
        from_Token = USDX_TOKEN_ADDRESS;
    }

    if (toToken === "POX") {
        to_Token = POX_TOKEN_ADDRESS;
    } else if (toToken === "USDX") {
        to_Token = USDX_TOKEN_ADDRESS;
    }
  try {
    const response = await axios.post(BASE_URL + "/swap", {
      walletAddress: walletAddress,
      amountIn:fromAmount,
      slippage,
      deadline:deadLine,
      token0:from_Token,
      token1:to_Token,
    });
    console.log(response?.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSwapAmount = async(amountIn,fromToken, toToken)=>{
    let from_Token;
    let to_Token;

    if (fromToken === "POX") {
        from_Token = POX_TOKEN_ADDRESS;
    } else if (fromToken === "USDX") {
        from_Token = USDX_TOKEN_ADDRESS;
    }

    if (toToken === "POX") {
        to_Token = POX_TOKEN_ADDRESS;
    } else if (toToken === "USDX") {
        to_Token = USDX_TOKEN_ADDRESS;
    }

    try {
        console.log(amountIn, from_Token,to_Token)
        const response = await axios.post(BASE_URL+"/getAmountsOut2",{
            amount:amountIn,
            token0:from_Token,
            token1:to_Token
        })
        console.log(response?.data)
        return response?.data?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getReverseTokenAPI = async(amountIn)=>{
    try {
        const response = await axios.post(BASE_URL+"/getAmountIn",{
            amountIn,
        })
        console.log(response?.data);
    } catch (error) {
        console.log(error);
    }
}

export const getAddLiquidity = async (walletAddress, fromAmount, toAmount, fromToken, toToken, deadLine) => {
    let from_Token;
    let to_Token;

    if (fromToken === "POX") {
        from_Token = POX_TOKEN_ADDRESS;
    } else if (fromToken === "USDX") {
        from_Token = USDX_TOKEN_ADDRESS;
    }

    if (toToken === "POX") {
        to_Token = POX_TOKEN_ADDRESS;
    } else if (toToken === "USDX") {
        to_Token = USDX_TOKEN_ADDRESS;
    }

    // Ensure that both tokens are assigned correctly
    if (!from_Token || !to_Token) {
        console.log("Invalid token addresses");
        return;
    }

    try {
        const response = await axios.post(`${BASE_URL}/addLiquidity`, {
            amountA: fromAmount,
            amountB: toAmount,
            walletAddress: walletAddress,
            fromToken: from_Token,
            toToken: to_Token,
            deadLine
        });
            return response.data;
    } catch (error) {
        console.log(error);
    }
};