import { createSlice} from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name:'categories',
    initialState:{
        categoriesMap:{}
    },
    reducers:{
        setCategoriesMap:(state,action)=>{
            state.categoriesMap= action.payload
        }
    }
})

export default categoriesSlice.reducer;
export const {setCategoriesMap}=categoriesSlice.actions
export const selectCategoriesMap=(state)=>state.categories.categoriesMap;
