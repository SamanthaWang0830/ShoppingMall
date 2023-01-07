import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import cartReducer from './cartSlide'
import categoriesReducer from './categoriesSlide'

export const store= configureStore({
    reducer: {
        user:userReducer,
        cart:cartReducer,
        categories:categoriesReducer
    }
});