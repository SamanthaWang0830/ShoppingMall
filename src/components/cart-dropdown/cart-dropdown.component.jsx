import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useEffect } from 'react'
//import { useContext } from 'react'
//import { CartContext } from '../../contexts/cart.context'
import { CartDropdownContainer,CartItems,EmptyMessage } from './cart-dropdown.styles'
//this is a hook that can allow the button'gotocheckout' to the checkout page
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch} from "react-redux";
import { selectCartItems,setCartTotal,setCartCount } from '../../store/cartSlide';

const CartDropdown =()=>{
    const dispatch=useDispatch()
    //const {cartItems}= useContext(CartContext)
    const cartItems=useSelector(selectCartItems)

    useEffect(()=>{
        const newCartTotal= cartItems.reduce((total, cartItem)=> total + cartItem.quantity*cartItem.price ,0)
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
                {cartItems.length ?cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                )):<EmptyMessage>Your cart is empty</EmptyMessage>}
            </CartItems>
            <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown