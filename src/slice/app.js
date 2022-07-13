import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "axios";

const initialState = {
  value: 0,
  error: null,
  loading: false,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1;
    },
    decrement: (state, action) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.arrs = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { increment, decrement, incrementByAmount } = app.actions;

export const getAll = createAsyncThunk("/getall", async () => {
  const response = await Axios.getAll("/posts");
  return response.data;
});

export default app.reducer;
