import { CardElement ,useStripe, useElements} from "@stripe/react-stripe-js";
import {button_type_classes} from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton} from "./payment-form.styles";
import { useState ,useContext} from "react";
import { CartContext } from "../../contexts/cart.context";
import {UserContext} from  "../../contexts/user.context";

const PaymentForm=()=>{
    const stripe= useStripe();
    const elements=useElements();

    const {cartTotal}=useContext(CartContext)
    const {currentUser}=useContext(UserContext)

    const [isProcessingPayment, setIsProcessingPayment]=useState(false)

    const paymentHandler=async(e)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return
        }

        setIsProcessingPayment(true)

        const response= await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({cartTotal:cartTotal*100})
        }).then(res=>res.json())
        const clientSecret= response.paymentIntent.client_secret

        const paymentResult= await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name: currentUser? currentUser.displayName :'Guest'
                }
            }
        })
        setIsProcessingPayment(false)

        if(paymentResult.error){
            alert(paymentResult.error)
        }else{
            if(paymentResult.paymentIntent.status==='succeeded'){
                alert('successful')
            }
        }
    }

    

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton 
                    buttonType={button_type_classes.inverted}
                    isLoading={isProcessingPayment}
                >pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}
export default PaymentForm