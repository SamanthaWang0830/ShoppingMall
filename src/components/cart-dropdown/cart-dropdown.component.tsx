import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useEffect } from 'react'
//import { useContext } from 'react'
//import { CartContext } from '../../contexts/cart.context'
import { CartDropdownContainer,CartItems,EmptyMessage } from './cart-dropdown.styles'
//this is a hook that can allow the button'gotocheckout' to the checkout page
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch} from "react-redux";
import {setCartTotal} from '../../store/cartSlide';
import { RootState } from '../../store/store'

export interface ICartItem{
    quantity:number,
    price:number,
    id:number,
    name:string,
    imageUrl:string,
}

const CartDropdown =()=>{
    const dispatch=useDispatch()
    //const {cartItems}= useContext(CartContext)
    const cartItems=useSelector((state:RootState)=>state.cart.cartItems)

    useEffect(()=>{
        const newCartTotal= cartItems.reduce((total:number, cartItem:ICartItem)=> total + cartItem.quantity*cartItem.price ,0)
        dispatch(setCartTotal(newCartTotal))
    }, [cartItems]) 


    //create a function 
    const navigate= useNavigate()
    const goToCheckoutHandler= ()=>{
        navigate('./checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ?cartItems.map((item:ICartItem) => (
                    <CartItem key={item.id} cartItem={item} />
                )):<EmptyMessage>Your cart is empty</EmptyMessage>}
            </CartItems>
            <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown