import React, { useContext, useState } from 'react'
import { Register } from '../components/Register'
import { Login } from '../components/Login'
import { AppContext } from '../AppContext/Appcontext'

export const AuthPage = () => {

  
  const {register} = useContext(AppContext)

  return (
    <div>
        { register ? <Register/> : <Login/> }
    </div>
  )
}
