import { Fragment ,useEffect} from "react";
import { Outlet,  Link} from "react-router-dom";
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
//import {UserContext} from '../../contexts/user.context'
import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
//import {CartContext} from '../../contexts/cart.context'
import { NavigationContainer ,LogoContainer,NavLinks,NavLink} from "./navigation.styles";

import { useSelector,useDispatch} from "react-redux";
import { setCurrentUser } from "../../store/userSlice";
import { User} from "firebase/auth";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import type { RootState } from "../../store/store";



const Navigation=()=>{
  const dispatch=useDispatch()
  //const {currentUser} =useContext(UserContext)
  const currentUser=useSelector((state:RootState)=>state.user.currentUser);

  //const {isCartOpen}= useContext(CartContext)
  const isCartOpen=useSelector((state:RootState)=>state.cart.isCartOpen)

  console.log('====================================');
  console.log(currentUser);
  console.log('====================================');

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user:User | null) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  
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