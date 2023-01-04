import { BaseButton,GoogleSignInButton,InvertedButton } from "./button.styles"

//有不同种类的按钮
export const button_type_classes= {
    base:'base',
    google:'google-sign-in',
    inverted:'inverted'
}

const getButton=(buttonType=button_type_classes.base)=>(
    {
        [button_type_classes.base]:BaseButton,
        [button_type_classes.google]:GoogleSignInButton,
        [button_type_classes.inverted]:InvertedButton,

    }[buttonType]
)

//{children} 子元素
const Button=({children, buttonType, ...otherProps})=>{
    const CustomButton=getButton(buttonType)
    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    )
}

export default Button