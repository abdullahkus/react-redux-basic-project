import { configureStore } from '@reduxjs/toolkit';
import postReducer, { fetchPosts } from './slices/postSlice';

const store = configureStore({
    reducer: {
        posts: postReducer,
    },
});

store.dispatch(fetchPosts());

export default store;
