import { CartIconContainer,ItemCount,ShoppingIcon} from './cart-icon.styles'
import { CartContext } from '../../contexts/cart.context'
import { useContext } from 'react'

const CartIcon =()=>{
    const {isCartOpen, setIsCartOpen,cartCount}= useContext(CartContext)
    //翻转开/关
    const toggleIsCartOpen=()=> setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon