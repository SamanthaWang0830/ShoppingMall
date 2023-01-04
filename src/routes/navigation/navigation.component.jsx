import { Fragment ,useContext} from "react";
import { Outlet,  Link} from "react-router-dom";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {UserContext} from '../../contexts/user.context'
import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {CartContext} from '../../contexts/cart.context'
import { NavigationContainer ,LogoContainer,NavLinks,NavLink} from "./navigation.styles";
 
const Navigation=()=>{
  //这个组件中只想读取currentUser
  const {currentUser} =useContext(UserContext)
  const {isCartOpen}= useContext(CartContext)
  
    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrownLogo className="logo"/>
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
                SHOP
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) : (
                  <NavLink to='/auth'>
                      SIGN IN
                  </NavLink>) 
            }
            <CartIcon/>
          </NavLinks>
          {isCartOpen && <CartDropdown/>}
        </NavigationContainer>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation