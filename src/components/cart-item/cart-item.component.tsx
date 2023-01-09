import { CartItemContainer,ItemDetails } from "./cart-item.styles"
import { ICartItem } from "../cart-dropdown/cart-dropdown.component"
import { FC } from "react"

interface IProps{
    cartItem:ICartItem
}
const CartItem :FC<IProps>=({cartItem})=>{
    const {name, quantity, price, imageUrl} = cartItem
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <ItemDetails>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price} </span>
            </ItemDetails>
        </CartItemContainer>
    )
}
export default CartItem