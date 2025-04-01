import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CryptoCurrency, fetchMarketData as fetchMarketDataService } from '../services/marketService';

interface MarketState {
    cryptocurrencies: CryptoCurrency[];
    loading: boolean;
    error: string | null;
}

const initialState: MarketState = {
    cryptocurrencies: [],
    loading: false,
    error: null
};

// Явно указываем типы для createAsyncThunk
export const fetchMarketData = createAsyncThunk<CryptoCurrency[]>(
    'market/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchMarketDataService(); // Используем переименованный импорт
        } catch (error) {
            return rejectWithValue('Failed to fetch market data');
        }
    }
);

const marketSlice = createSlice({
    name: 'market',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarketData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMarketData.fulfilled, (state, action) => {
                state.cryptocurrencies = action.payload;
                state.loading = false;
            })
            .addCase(fetchMarketData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default marketSlice.reducer;