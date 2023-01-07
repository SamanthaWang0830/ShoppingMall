import { createSlice} from '@reduxjs/toolkit';
import {onAuthStateChangedListener,
        createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';



const initialState={
    currentUser: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCurrentUser:(state,action)=>{
            state.currentUser=action.payload
        }
    }
})

export default  userSlice.reducer;
export const {setCurrentUser}=userSlice.actions
export const selectUser=(state)=>state.user.currentUser;