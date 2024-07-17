import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    address: "",
    poxBalance:0,
    UsdxBalance:0,
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
  },
});

export const { setWalletAddress,setPoxBalance,setUsdxBalance } = walletSlice.actions;
export default walletSlice.reducer;
