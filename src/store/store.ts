import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import cartReducer from './cartSlide'
import categoriesReducer from './categoriesSlide'

export const store= configureStore({
    /* middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), */
    reducer: {
        user:userReducer,
        cart:cartReducer,
        categories:categoriesReducer
    }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
