import React,{useContext} from 'react'
import { Route, Navigate } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

const PrivateRouter = ({children})=> {
    console.log('private route works');
    let {user} = useContext(AuthContext)
    console.log(user)

    if(!user){
      console.log(localStorage.getItem('authTokens'))
      return <Navigate to='/' />
    }

  return children
}

export default PrivateRouter
