import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    coinData: [],
    trendingCoin: [],
    globalData: [],
    currency: {
      name: 'USD',
      symbol: '$'
    }
  },
  reducers: {
    setCoinData: (state, action) => {
      state.coinData = action.payload;
    },
    setTrendingCoinData: (state, action) => {
      state.trendingCoin = action.payload;
    },
    setGlobalData: (state, action) => {
      state.globalData = action.payload;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setCoinData, setCurrency, setTrendingCoinData,setGlobalData } = homeSlice.actions;

export default homeSlice.reducer;
