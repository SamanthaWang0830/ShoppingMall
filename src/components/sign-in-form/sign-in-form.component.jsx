import { useState} from "react";

import FormInput from '../form-input/form-input.component'
import Button,{button_type_classes} from "../button/button.component"

import {signInWithGooglePopup , signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles'


//initailize for the four value below (empty now)
const defaultFormFields={
    email:'',
    password:''
}

const SignInForm = ()=>{
    const [formFeilds, setFormFeilds]= useState(defaultFormFields)
    //解构
    const {email, password} = formFeilds


    const resetFormFields= ()=>{
        setFormFeilds(defaultFormFields)
    }

    const signInWithGoogle = async ()=>{
        await signInWithGooglePopup()
    }

    const handleSubmit= async (event)=>{
        event.preventDefault()
        
        try{
            await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields()

        } catch (error) {
            switch (error.code) {
              case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
              case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
              default:
                console.log(error);
            }
          }

    }

    const handleChange =(event)=>{
        const {name, value}= event.target
        setFormFeilds({...formFeilds, [name]:value})
    }

    return (
        <SignInContainer>
            <h2>ALREADY have an account?</h2>
            <span>SIGN IN WITH EMAIL AND PASSWORD</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                    label='email'  
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />

                <FormInput 
                    label='password'  
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />

                <ButtonsContainer>
                    <Button type="submit" >SIGN IN</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={button_type_classes.google}>GOOGLE SIGN IN
                    </Button>
                </ButtonsContainer>

                
            </form>
        </SignInContainer>
    )
}

export default SignInForm;