import React from 'react'
import AuthNavbar from '../components/AuthNavbar'
import { AuthFooter } from '../components/AuthFooter'
import RegisterForm from '../components/RegisterForm'
import { Outlet } from 'react-router'

const Auth = () => {
  return (
    <div>
        <AuthNavbar></AuthNavbar>
        <Outlet></Outlet>
        <AuthFooter></AuthFooter>
    </div>
  )
}

export default Auth