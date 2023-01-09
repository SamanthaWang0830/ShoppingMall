import { BaseButton,GoogleSignInButton,InvertedButton,SpinnerContainer } from "./button.styles"
import { FC, ButtonHTMLAttributes } from 'react';
//有不同种类的按钮
export enum button_type_classes{
    base='base',
    google='google-sign-in',
    inverted='inverted'
}

const getButton=(buttonType=button_type_classes.base): typeof BaseButton=>(
    {
        [button_type_classes.base]:BaseButton,
        [button_type_classes.google]:GoogleSignInButton,
        [button_type_classes.inverted]:InvertedButton,

    }[buttonType]
)

export type ButtonProps = {
    buttonType?: button_type_classes,
    isLoading ? : boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

//{children} 子元素
const Button: FC<ButtonProps>=({children, buttonType, isLoading, ...otherProps})=>{
    const CustomButton=getButton(buttonType)
    return (
        <CustomButton disabled={isLoading} {...otherProps} >
            {isLoading? <SpinnerContainer/> : children }
        </CustomButton>
    )
}

export default Button