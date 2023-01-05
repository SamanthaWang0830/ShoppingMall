import { createContext} from "react";
import { useEffect,useState } from "react";


export const addCartItem =(cartItems, productToAdd)=>{
    //若cartItem已经有了，数量就+1
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id=== productToAdd.id )

    if (existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id=== productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity+1} : cartItem )
    }

    //若原先没有，就返回一个新数组（包含新加的cartItem）
    return [...cartItems, {...productToAdd , quantity:1}]
}


const removeCartItem =(cartItems, cartItemToRemove)=>{
    //find the cart item to remove
    const existingCartItem= cartItems.find((cartItem)=> cartItem.id=== cartItemToRemove.id )
    //check if quantity ==1, remove that item totally
    //use filter method, filter give back a new array
    if (existingCartItem.quantity==1){
        return cartItems.filter((cartItem)=> cartItem.id!==cartItemToRemove.id)
    }
    //if not , reduce quantity
    //if the item's id match the one we try to remove, then create a new object(跟原来的其他都一样，除了quantity-1)
    return cartItems.map((cartItem)=> cartItem.id=== cartItemToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity-1} : cartItem )
}

const clearCartItem=(cartItems, cartItemToClear)=>cartItems.filter((cartItem)=> cartItem.id!==cartItemToClear.id)

//////////////////////////////
//1.这是存value的地方
export const CartContext = createContext({
    isCartOpen: false,
    setIsCardOpen: ()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    removeItemFromCart: ()=>{},
    clearItemFromCart: ()=>{},
    cartCount:0,
    cartTotal:0
})

/* 
product:{
    id
    name
    price
    imageUrl
} 
cartItem:{
    id
    name
    price
    imageUrl
    quantity
} 
    
    */


//2.这是被外界调用的component
export const CardProvider=(({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false)
    const [cartItems, setCartItems]=useState([])
    const [cartCount, setCartCount]= useState(0)
    const [cartTotal, setCartTotal]= useState(0)

    useEffect(()=>{
        const newCartCount= cartItems.reduce((total, cartItem)=> total + cartItem.quantity,0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(()=>{
        const newCartTotal= cartItems.reduce((total, cartItem)=> total + cartItem.quantity*cartItem.price ,0)
        setCartTotal(newCartTotal)
    }, [cartItems]) 

    const addItemToCart =(productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart =(cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }


    const value= {
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        removeItemToCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider> 
})