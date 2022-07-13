import { configureStore } from "@reduxjs/toolkit";

import postReducer from "../slice/postSlice";
import counterReducer from "../slice/counterSlice";
import commentReducer from "../slice/commentSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
    counter: counterReducer,
  },
});
