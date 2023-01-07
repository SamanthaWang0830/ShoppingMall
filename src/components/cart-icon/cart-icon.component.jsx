import { CartIconContainer,ItemCount,ShoppingIcon} from './cart-icon.styles'
//import { CartContext } from '../../contexts/cart.context'
//import { useContext } from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch} from "react-redux";
import { selectIsCartOpen,selectCartCount,setIsCartOpen,setCartCount,selectCartItems, } from '../../store/cartSlide'

const CartIcon =()=>{
    const dispatch=useDispatch()
    //const {isCartOpen, setIsCartOpen,cartCount}= useContext(CartContext)
    const isCartOpen=useSelector(selectIsCartOpen)
    const cartCount=useSelector(selectCartCount)
    const cartItems=useSelector(selectCartItems)
    useEffect(()=>{
        const newCartCount= cartItems.reduce((total, cartItem)=> total + cartItem.quantity,0)
        dispatch(setCartCount(newCartCount))
    }, [cartItems])
    //翻转开/关
    const toggleIsCartOpen=()=> dispatch(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon