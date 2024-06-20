import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    address: "PV5NV1YPBdN6yxWhz5KoB8SZYebZXB24Hw",
  },
  reducers: {
    setWalletAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { setWalletAddress } = walletSlice.actions;
export default walletSlice.reducer;
