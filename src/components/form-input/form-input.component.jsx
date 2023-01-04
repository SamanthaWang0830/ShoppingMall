import  { FormInputLabel, Input, Group } from './form-input.styles'

//把外层此组件（标签）上的属性传进来
const FormInput =({label, ...otherProps})=>{
    return (
        <Group>
            <Input {...otherProps}/>

            {/* {}中是一个js语句 a && b，如果a是true，那么就要在判断b，都返回b*/}
            {/* className={`${ otherProps.value.length ? 'shrink':''} form-input-label`} */}
            {label && (
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput