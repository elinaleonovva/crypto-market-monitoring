import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import marketReducer from './marketSlice';
import exchangesReducer from './exchangesSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        market: marketReducer,
        exchanges: exchangesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;