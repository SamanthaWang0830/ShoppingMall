import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState{
    categoriesMap:object
}

const initialState:CategoriesState={
    categoriesMap:{}
}

const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{
        setCategoriesMap:(state,action: PayloadAction<object>)=>{
            state.categoriesMap= action.payload
        }
    }
})

export default categoriesSlice.reducer;
export const {setCategoriesMap}=categoriesSlice.actions;
