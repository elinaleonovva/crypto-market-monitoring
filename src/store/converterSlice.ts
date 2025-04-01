import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { convertCurrency } from '../services/converterService';

interface ConverterState {
    result: number | null;
    loading: boolean;
    error: string | null;
}

const initialState: ConverterState = {
    result: null,
    loading: false,
    error: null
};

export const performConversion = createAsyncThunk(
    'converter/convert',
    async (
        { from, to, amount }: { from: string; to: string; amount: number },
        { rejectWithValue }
    ) => {
        try {
            return await convertCurrency(from, to, amount);
        } catch (error) {
            return rejectWithValue('Conversion failed');
        }
    }
);

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(performConversion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(performConversion.fulfilled, (state, action) => {
                state.result = action.payload;
                state.loading = false;
            })
            .addCase(performConversion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default converterSlice.reducer;