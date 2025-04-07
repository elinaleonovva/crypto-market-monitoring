import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews } from '../services/newsService';
import { NewsItem } from '../services/newsService';

interface NewsState {
    items: NewsItem[];
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    items: [],
    loading: false,
    error: null
};

export const fetchNewsData = createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchNews();
            return response.Data; // Достаем массив новостей из ответа
        } catch (error) {
            return rejectWithValue('Failed to fetch news');
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsData.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchNewsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default newsSlice.reducer;