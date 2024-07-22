import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    address: "",
    poxBalance:0,
    UsdxBalance:0,
    Network:"",
  },
  reducers: {
    setWalletAddress: (state, action) => {
      state.address = action.payload;
    },
    setPoxBalance: (state, action) => {
      state.poxBalance = action.payload;
    },
    setUsdxBalance: (state, action) => {
      state.UsdxBalance = action.payload;
    },
    setNetwork: (state, action) => {
      state.Network = action.payload;
    },
  },
});

export const { setWalletAddress,setPoxBalance,setUsdxBalance,setNetwork } = walletSlice.actions;
export default walletSlice.reducer;
