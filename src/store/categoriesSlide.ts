import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ICategory } from '../components/index';

interface CategoriesState{
    categoriesMap:ICategory[]
}

const initialState:CategoriesState={
    categoriesMap:[]
}

const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{
        setCategoriesMap:(state,action)=>{
            state.categoriesMap= action.payload
        }
    }
})

export default categoriesSlice.reducer;
export const {setCategoriesMap}=categoriesSlice.actions;
