import './checkout.styles.scss';
import { useEffect } from 'react'
//import { CartContext } from '../../contexts/cart.context'
import ChechoutItem from '../../components/checkout-item/checkout-item.component'
import { useSelector,useDispatch} from "react-redux";
import { ICartItem } from '../../components/cart-dropdown/cart-dropdown.component';
import { RootState } from '../../store/store'
import {setCartTotal} from '../../store/cartSlide';

const Chechout= ()=>{
    const dispatch=useDispatch()
    //const {cartItems,cartTotal}= useContext(CartContext)
    const cartItems=useSelector((state:RootState)=>state.cart.cartItems)
    const cartTotal=useSelector((state:RootState)=>state.cart.cartTotal)
    useEffect(()=>{
        const newCartTotal= cartItems.reduce((total:number, cartItem:ICartItem)=> total + cartItem.quantity*cartItem.price ,0)
        dispatch(setCartTotal(newCartTotal))
    }, [cartItems])
    
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header=block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem:ICartItem)=>(
                    <ChechoutItem key={cartItem.id} cartItem={cartItem}/>
                ))
            }
            <div className='total'>TOTAL: ${cartTotal}</div>
        </div>
    )
}

export default Chechout