import {ProductCartContainer,Footer,Name,Price} from './product-card.styles';
import Button,{button_type_classes} from '../button/button.component' 
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard=({product})=>{

    const { name, price, imageUrl}= product
    const {addItemToCart}= useContext(CartContext)
    const addProductToCart = ()=> addItemToCart(product);

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