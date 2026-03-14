import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {
   const [user,setUser] = useState(null);
   const [userDetails,setUserDetails] = useState(null);
   const [toogle,setToogle]=useState(false);
const [loading,setLoading] = useState(true);



    const createUser=(email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    
    }
    const loginUser=(email,password)=>
    {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
useEffect(()=>
{
  const unsubscribe=auth.onAuthStateChanged(currentUser=>
  {
    setUser(currentUser);
    setUserDetails(currentUser);
    setLoading(false);
  })
  return ()=>
  {
    unsubscribe();
  }

},[])
const logoutUser=()=>
{
    setLoading(true);
    return signOut(auth);
}
    const authInfo={user,setUser,loading,setLoading,createUser,loginUser,toogle,setToogle,logoutUser,userDetails,setUserDetails};
  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider