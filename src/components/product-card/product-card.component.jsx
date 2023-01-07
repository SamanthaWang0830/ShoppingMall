import {ProductCartContainer,Footer,Name,Price} from './product-card.styles';
import Button,{button_type_classes} from '../button/button.component' 
import { useEffect } from 'react'
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context';
import { useSelector,useDispatch} from "react-redux";
import { addItemToCart,selectCartItems ,setCartCount} from '../../store/cartSlide';

const ProductCard=({product})=>{
    const { name, price, imageUrl}= product

    //const {addItemToCart}= useContext(CartContext)
    const dispatch=useDispatch()
    const cartItems=useSelector(selectCartItems)
    const addProductToCart = ()=> dispatch(addItemToCart(product));
    useEffect(()=>{
        const newCartCount= cartItems.reduce((total, cartItem)=> total + cartItem.quantity,0)
        dispatch(setCartCount(newCartCount))
    }, [cartItems])

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={button_type_classes.inverted} onClick={addProductToCart}> ADD TO CART</Button>
        </ProductCartContainer>
    )
}

export default ProductCard