import { ImageContainer,CheckoutItemContainer,BaseSpan,Quantity,Arrow,Value,RemoveButton } from './checkout-item.styles'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'


const ChechoutItem=({cartItem})=>{
    const {name, quantity, price,imageUrl} =cartItem
    const {clearItemFromCart, addItemToCart, removeItemToCart}= useContext(CartContext)
    // callback function
    const clearItemHandler= ()=>clearItemFromCart(cartItem)
    const addItemHandler= ()=> addItemToCart(cartItem)
    const removeItemHandler= ()=> removeItemToCart(cartItem)

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