import React from 'react'
import AuthNavbar from '../components/AuthNavbar'
import { AuthFooter } from '../components/AuthFooter'
import RegisterForm from '../components/RegisterForm'

const Auth = () => {
  return (
    <div>
        <AuthNavbar></AuthNavbar>
        <RegisterForm></RegisterForm>
        <AuthFooter></AuthFooter>
    </div>
  )
}

export default Auth