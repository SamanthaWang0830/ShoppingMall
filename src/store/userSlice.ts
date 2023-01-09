import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User} from "firebase/auth";


interface UserState {
    currentUser: User | null
}


const initialState : UserState={
    currentUser: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCurrentUser:(state,action: PayloadAction<User | null>)=>{
            state.currentUser=action.payload
        }
    }
})

export default  userSlice.reducer;
export const {setCurrentUser}=userSlice.actions