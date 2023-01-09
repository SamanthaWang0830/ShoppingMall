import  { FormInputLabel, Input, Group } from './form-input.styles'
import { InputHTMLAttributes, FC } from 'react';

type IProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

//把外层此组件（标签）上的属性传进来
const FormInput :FC<IProps>=({label, ...otherProps})=>{
    return (
        <Group>
            <Input {...otherProps}/>

            {/* {}中是一个js语句 a && b，如果a是true，那么就要在判断b，都返回b*/}
            {/* className={`${ otherProps.value.length ? 'shrink':''} form-input-label`} */}

            {/* 第一步：otherProps.value看 otherProps存不存在， */}
            {/* 如果存在，再检查是不是string */}
            {/* 如果是string，再检查有没有length */}
            {label && (
                <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value==='string' && otherProps.value.length)}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput