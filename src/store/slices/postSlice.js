import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from '../../services/postsService';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    return await postsService
        .getAll(0, 9)
        .then((response) => response.data)
        .catch((error) => console.log(error));
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        updatePost: (state, action) => {
            const { id, title, body, userId } = action.payload;
            const postIndex = state.posts.findIndex((post) => post.id === id);
            if (postIndex !== -1) {
                state.posts[postIndex].title = title;
                state.posts[postIndex].body = body;
                state.posts[postIndex].userId = userId;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addPost, removePost, updatePost } = postSlice.actions;

export default postSlice.reducer;
