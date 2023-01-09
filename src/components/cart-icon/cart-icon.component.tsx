import { CartIconContainer,ItemCount,ShoppingIcon} from './cart-icon.styles'
//import { CartContext } from '../../contexts/cart.context'
//import { useContext } from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch} from "react-redux";
import { setIsCartOpen,setCartCount } from '../../store/cartSlide'
import { ICartItem } from '../cart-dropdown/cart-dropdown.component';
import { RootState } from '../../store/store'


const CartIcon =()=>{
    const dispatch=useDispatch()
    //const {isCartOpen, setIsCartOpen,cartCount}= useContext(CartContext)
    const isCartOpen=useSelector((state:RootState)=>state.cart.isCartOpen)
    const cartCount=useSelector((state:RootState)=>state.cart.cartCount)
    const cartItems=useSelector((state:RootState)=>state.cart.cartItems)
    useEffect(()=>{
        const newCartCount= cartItems.reduce((total:number, cartItem:ICartItem)=> total + cartItem.quantity,0)
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