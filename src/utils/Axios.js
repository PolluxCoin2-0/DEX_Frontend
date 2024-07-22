import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const SECONDARY_BASE_URL = import.meta.env.VITE_SECONDARY_BASE_URL;
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
    const response = await axios.post(BASE_URL + "/swapPox", {
      "walletAddress": walletAddress,   
      amountIn:fromAmount,
      slippage:parseInt(slippage),
      deadline:parseInt(deadLine),
      "token0":from_Token,
      "token1":to_Token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveSwappedDatatoMongo = async (
    trxId, 
    fromAmount, 
    toAmount, 
    fromToken, 
    toToken, 
    walletAddress) => {

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
        const response = await axios.post(SECONDARY_BASE_URL + "/createSwap",{
            trxId: trxId,
            fromSymbol: fromToken,
            toSymbol: toToken,
            fromAmount: fromAmount,
            toAmount: toAmount,
            fromTokenAddress: from_Token,
            toTokenAddress: to_Token,
           "walletAddress": walletAddress,
        });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

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
        const response = await axios.post(BASE_URL+"/getAmountsOut2",{
            amount:amountIn,
            token0:from_Token,
            token1:to_Token
        })
        return response?.data?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getQuateValue = async(fromAmount) =>{
    try {
        const response = await axios.post("http://192.168.1.29:16666/api/yuviSwap/quate",{
            "amountA": fromAmount
        });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAddLiquidity = async (walletAddress, fromAmount, fromToken, toToken, deadLine) => {
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
        const response = await axios.post(`http://192.168.1.29:16666/api/yuviSwap/addLiquidityPox`, {
            "amountTokenDesired": fromAmount,
            "walletAddress": walletAddress,
            "tokenAaddress": "37c412bd241e4599fa3c191d46b5e53dedb293f006",  // USDX_TOKEN_ADDRESS
            "deadline":parseInt(deadLine),
        });
            return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getReserves = async()=>{
    try {
        const response = await axios.get(BASE_URL+"/getReserves");
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getPairLength = async()=>{
    try {
        const response = await axios.get(BASE_URL+"/getPairsLength");
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllowance=async(walletAddress)=>{
    try {
        const response = await axios.post(BASE_URL+"/allowanceUsdx",{
             "ownerAddress":walletAddress
        })
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getApproval=async(walletAddress,amount)=>{
    try {
        const response = await axios.post(BASE_URL+"/ApproveUsdx",{
             "walletAddress":walletAddress,
             "amount":amount
        })
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllowanceWPOX=async(walletAddress)=>{
    try {
        const response = await axios.post(BASE_URL+"/AllowanceWPOX",{
             "walletAddress":walletAddress
        })
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getApproveWPOX=async(walletAddress,amount)=>{
    try {
        const response = await axios.post(BASE_URL+"/ApproveWPOX",{
             "walletAddressAddress":walletAddress,
             "amount":amount
        })
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const removeLiquidity=async(percent, walletAddress, deadline)=>{
    console.log(percent, walletAddress,deadline)
    try {
        const response = await axios.post (BASE_URL+"/removeLiquidityPox",{
            "tokenAaddress": "37c412bd241e4599fa3c191d46b5e53dedb293f006", 
            "percent":  percent,
            "walletAddress": walletAddress,
            "deadline": deadline
        })
        return response?.data;
    } catch (error) {
        console.log(error)
    }
}

export const getBalanceOfPair=async(walletAddress)=>{
    try {
        const response = await axios.post(BASE_URL+"/balanceOfPair",{
            "address": walletAddress,
        });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getApprovePair=async(walletAddress, amount)=>{
    try {
        const response = await axios.post(BASE_URL+"/approvePair",{
            "walletAddress": walletAddress,
             "amount": amount
        });
        return response?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getScanLiquidityGraphData = async(startDate, endDate)=>{
    try {
        const res = await axios.get(`${SECONDARY_BASE_URL}/getLiquidityGraphData?startDate=${startDate}&endDate=${endDate}`);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getScanVolumeGraphData = async(startDate, endDate, granularity)=>{
    try {
        const res = await axios.get(`${SECONDARY_BASE_URL}/getLiquidityValume?startDate=${startDate}&endDate=${endDate}&granularity=${granularity}`);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getSearchedData = async(query, pageNo)=>{
    try {
        const res = await axios.get(`${SECONDARY_BASE_URL}/getAllSwapTransaction?search=${query}&page=${pageNo}&limit=10`)
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTotalTransactionsLast24Hours = async()=>{
    try {
        const res = await axios.get(SECONDARY_BASE_URL + "/getTotalTransactionsLast24Hours");
        return res?.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTradingPair = async(startDate, endDate)=>{
    try {
        const res = await axios.get(SECONDARY_BASE_URL + `/getTradingPair?startDate=${startDate}&endDate=${endDate}`)
        return res?.data;
    } catch (error) {
        console.log(error)
    }
}