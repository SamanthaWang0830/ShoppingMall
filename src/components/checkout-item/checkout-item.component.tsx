import { ImageContainer,CheckoutItemContainer,BaseSpan,Quantity,Arrow,Value,RemoveButton } from './checkout-item.styles'
//import { CartContext } from '../../contexts/cart.context'
//import { useContext } from 'react'
import { useSelector,useDispatch} from "react-redux";
import { addItemToCart, removeItemToCart,clearItemFromCart} from '../../store/cartSlide';
import { ICartItem } from '../cart-dropdown/cart-dropdown.component';
import { FC } from 'react';

interface IProps{
    cartItem:ICartItem
}
const ChechoutItem:FC<IProps> =({cartItem})=>{
    const {name, quantity, price,imageUrl} =cartItem

    //const {clearItemFromCart, addItemToCart, removeItemToCart}= useContext(CartContext)
    const dispatch=useDispatch()
    // callback function
    const clearItemHandler= ()=>dispatch(clearItemFromCart(cartItem))
    const addItemHandler= ()=> dispatch(addItemToCart(cartItem))
    const removeItemHandler= ()=> dispatch(removeItemToCart(cartItem))

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src= {imageUrl}  alt= {`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default ChechoutItem