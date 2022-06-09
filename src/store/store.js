import { configureStore } from '@reduxjs/toolkit';
import currencyReducers from './reducers/currencyReducers';
import cartReducer from './reducers/cartReducer';
export const store = configureStore({
    reducer:{
        currency:currencyReducers,
        cart:cartReducer,
    }
})