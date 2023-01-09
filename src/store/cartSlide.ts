import { createSlice} from '@reduxjs/toolkit';
import { ICartItem } from '../components/cart-dropdown/cart-dropdown.component';
import type { PayloadAction } from '@reduxjs/toolkit';

const addCartItem =(cartItems:ICartItem[], productToAdd:ICartItem)=>{
    //若cartItem已经有了，数量就+1
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id=== productToAdd.id )

    if (existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id=== productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity+1} : cartItem )
    }

    //若原先没有，就返回一个新数组（包含新加的cartItem）
    return [...cartItems, {...productToAdd , quantity:1}]
}


const removeCartItem =(cartItems:ICartItem[], cartItemToRemove:ICartItem)=>{
    //find the cart item to remove
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id=== cartItemToRemove.id )
    //check if quantity ==1, remove that item totally
    //use filter method, filter give back a new array
    if (existingCartItem!.quantity==1){
        return cartItems.filter((cartItem)=> cartItem.id!==cartItemToRemove.id)
    }
    //if not , reduce quantity
    //if the item's id match the one we try to remove, then create a new object(跟原来的其他都一样，除了quantity-1)
    return cartItems.map((cartItem)=> cartItem.id=== cartItemToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity-1} : cartItem )
}

const clearCartItem=(cartItems:ICartItem[], cartItemToClear:ICartItem)=>cartItems.filter((cartItem)=> cartItem.id!==cartItemToClear.id)

interface CartSliceState{
    cartCount:number,
    cartTotal:number,
    cartItems:ICartItem[],
    isCartOpen:boolean
}
const initialState:CartSliceState={
    cartCount:0,
    cartTotal:0,
    isCartOpen: false,
    cartItems:[],
}
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItemToCart:(state,action)=>{
            state.cartItems=addCartItem(state.cartItems, action.payload);
        },
        removeItemToCart:(state,action)=>{
            state.cartItems=removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart:(state,action)=>{
            state.cartItems=clearCartItem(state.cartItems, action.payload);
        },
        setIsCartOpen:(state,action)=>{
            state.isCartOpen=action.payload
        },
        setCartCount:(state,action)=>{
            state.cartCount=action.payload
        },
        setCartTotal:(state,action)=>{
            state.cartTotal=action.payload
        }
    }
})
export default cartSlice.reducer;
export const {
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    setIsCartOpen,
    setCartTotal,
    setCartCount
}=cartSlice.actions
