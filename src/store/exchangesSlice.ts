import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExchanges, Exchange } from '../services/exchangesService';

interface ExchangesState {
    list: Exchange[];
    loading: boolean;
    error: string | null;
}

const initialState: ExchangesState = {
    list: [],
    loading: false,
    error: null
};

export const fetchExchangesData = createAsyncThunk(
    'exchanges/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchExchanges();
        } catch (error) {
            return rejectWithValue('Failed to fetch exchanges');
        }
    }
);

const exchangesSlice = createSlice({
    name: 'exchanges',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangesData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExchangesData.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchExchangesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default exchangesSlice.reducer;