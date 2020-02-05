import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import './SignIn.scss';
import {useHistory, Redirect} from 'react-router-dom';

export default function SignIn(props) {
  const { register, handleSubmit, errors } = useForm()
  const [signInError, setSignInError] = useState(false)
  const history = useHistory();
  
  const onSubmit = data => {
      if (data.password === process.env.REACT_APP_PASSWORD){
          localStorage.setItem('token','12345678')
          setSignInError(false)
          history.push('/dashboard')
      } else {
          setSignInError(true)

      }
  }
   
  if(localStorage.getItem("token")){
     return <Redirect to="/dashboard/"/>
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="username" name="username" ref={ register({ required:true, pattern: /^[a-z0-9_-]*$/i})}/>
      {errors.username && "Username Is Required"}
      <input placeholder="password" type="password" name="password" ref={ register({ required:true,  pattern: /^(?=.*\d).{4,8}$/ })} />
      {errors.password && "Password must contain a letter and number and be between 4 and 8 Characters"}
      <input type="submit" />
      {signInError && "Username Or Password Don't Match"}
    </form>
  );
}