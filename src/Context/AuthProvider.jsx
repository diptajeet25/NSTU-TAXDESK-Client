import React, { useState } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const AuthProvider = ({children}) => {
   const [user,setUser] = useState(null);
const [loading,setLoading] = useState(true);


    const createUser=(email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    
    }

    const authInfo={user,setUser,loading,setLoading,createUser};
  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider