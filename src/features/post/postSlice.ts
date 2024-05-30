import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "../../actions";
import { Post } from "../../type";

// Define a type for the slice state
interface PostState {
  posts: Post[];
  loading: "idle" | "pending" | "complete" | "error";
}

// Define the initial state using that type
const initialState: PostState = { posts: [], loading: "idle" };

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateRecord: (state, { payload }) => {
      const idx = state.posts.findIndex((item) => item.id === payload.id);
      state.posts[idx] = { ...payload };
    },
    deleteRecord: (state, { payload }) => {
      const idx = state.posts.findIndex((item) => item.id === payload.id);
      state.posts.splice(idx, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload);
        state.loading = "complete";
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = "error";
      });
  },
});

export const { updateRecord, deleteRecord } = postSlice.actions;

export default postSlice.reducer;
