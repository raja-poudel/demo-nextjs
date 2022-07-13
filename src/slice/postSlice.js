import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../axios";

const initialState = {
  values: [],
  value: {},
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.values = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.values = [
          ...state.values,
          { id: action.payload.id, ...action.payload.body },
        ];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetError } = postSlice.actions;

export const fetchAllPosts = createAsyncThunk("/fetchAllPosts", async () => {
  const response = await Axios.get("/posts");
  return response.data;
});

export const fetchById = createAsyncThunk("/fetchById", async (id) => {
  const response = await Axios.get(`/posts/${id}`);
  return response.data;
});

export const createPost = createAsyncThunk("/createPost", async (data) => {
  console.log(data);
  const response = await Axios.post("/posts", {
    body: data,
  });
  return response.data;
});

export default postSlice.reducer;
