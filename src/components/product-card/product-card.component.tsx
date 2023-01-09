import {ProductCartContainer,Footer,Name,Price} from './product-card.styles';
import Button,{button_type_classes} from '../button/button.component' 
import { FC, useEffect } from 'react'
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context';
import { useSelector,useDispatch} from "react-redux";
import { addItemToCart,setCartCount} from '../../store/cartSlide';
import { ICategoryItem } from '..';
import { ICartItem } from '../cart-dropdown/cart-dropdown.component';
import { RootState } from '../../store/store'


interface IProps{
    product:ICategoryItem
}
const ProductCard:FC<IProps>=({product})=>{
    const { name, price, imageUrl}= product

    //const {addItemToCart}= useContext(CartContext)
    const dispatch=useDispatch()
    const cartItems=useSelector((state:RootState)=>state.cart.cartItems)
    const addProductToCart = ()=> dispatch(addItemToCart(product));
    useEffect(()=>{
        const newCartCount= cartItems.reduce((total:number, cartItem:ICartItem)=> total + cartItem.quantity,0)
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