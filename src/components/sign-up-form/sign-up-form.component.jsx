import { useState} from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { SignUpContainer } from './sign-up-form.styles'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  //设置初始表单里面的值 都为空
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  //最后清除表单里所有的值
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  
  //当点击提交时
  const handleSubmit = async (event) => {
    //取消事件的默认行为
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }
  
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email,password);
  
      await createUserDocumentFromAuth(user, { displayName });
      //调用清除表单里所有的值
      resetFormFields();

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  //当改变时
  const handleChange = (event) => {
    //console.log(event.target); 整个标签
    const { name, value } = event.target;
    
    setFormFields({ ...formFields, [name]: value });
  };

  return (
        <SignUpContainer>
          <h2>Don't have an account?</h2>
          <span>Sign up with your email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput
              label='Display Name'
              type='text'
              required
              onChange={handleChange}
              name='displayName'
              value={displayName}
            />

            <FormInput
              label='Email'
              type='email'
              required
              onChange={handleChange}
              name='email'
              value={email}
            />
    
            <FormInput
              label='Password'
              type='password'
              required
              onChange={handleChange}
              name='password'
              value={password}
            />
            <FormInput
              label='Confirm Password'
              type='password'
              required
              onChange={handleChange}
              name='confirmPassword'
              value={confirmPassword}
            />
            <Button buttonType='inverted' type='submit'>Sign Up</Button>
          </form>
        </SignUpContainer>
  );
};
    
export default SignUpForm;