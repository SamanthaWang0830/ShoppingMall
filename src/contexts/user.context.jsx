import { createContext, useEffect,useReducer } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

//储存state
export const USER_ACTION_TYPES={
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}
//不用useState，而用useReducer
const userReducer=(state,action)=>{
  console.log("dispatch");
  console.log(action);
  const {type, payload}=action
  
  switch(type){
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return{
        //在state里面的其他值不变，只更改...
        ...state,
        currentUser:payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }

}

//current state is a object
const INITIAL_STATE={
  currentUser:null
}

export const UserProvider = ({ children }) => {
  const [state,dispatch]=useReducer(userReducer,INITIAL_STATE)
  const {currentUser}=state
  console.log(currentUser);
  //dispatch is a function, when you call it pass action object
  const setCurrentUser=(user)=>{
    dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER, payload:user})
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

