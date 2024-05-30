import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosHandler } from "../App";
import { Post } from "../type";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ userId, title, body }: Post) => {
    const response = await axiosHandler.post("/posts", {
      title: title,
      body: body,
      userId: userId,
    });
    return response.data;
  }
);
