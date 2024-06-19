import { configureStore, createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    filteredPosts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.filteredPosts = action.payload;
    },
    filterPosts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredPosts = state.posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.body.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setPosts, filterPosts } = postsSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

export default store;