import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "../../actions";
import { Post } from "../../type";

// Define a type for the slice state
interface PostState {
  posts: Post[];
  status: "idle" | "pending" | "complete" | "error";
  success?: false;
}

// Define the initial state using that type
const initialState: PostState = { posts: [], status: "idle" };

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePost: (state, { payload }) => {
      const idx = state.posts.findIndex((item) => item.id === payload.id);
      state.posts[idx] = { ...payload };
    },
    deletePost: (state, { payload }) => {
      const idx = state.posts.findIndex((item) => item.id === payload.id);
      state.posts.splice(idx, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.posts.push(payload);
        state.status = "complete";
      })
      .addCase(createPost.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
