import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Axios } from "../axios";

const initialState = {
  values: [],
  error: null,
  loading: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.values = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchAllComments = createAsyncThunk(
  "/fetchAllcomments",
  async () => {
    const response = await Axios.get("/comments");
    return response.data;
  }
);

export default commentSlice.reducer;
