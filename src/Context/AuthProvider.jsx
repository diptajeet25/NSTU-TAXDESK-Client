import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { auth } from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {
   const [user,setUser] = useState(null);
   const [userDetails,setUserDetails] = useState(null);
   const [toogle,setToogle]=useState(false);
const [loading,setLoading] = useState(true);



    const createUser=async(email,password) => {
      const credential = await createUserWithEmailAndPassword(auth,email,password);
      setUser(credential.user);
      setUserDetails(credential.user);
      return credential;
    }
    const loginUser=async(email,password)=>
    {
      const credential = await signInWithEmailAndPassword(auth,email,password);
      setUser(credential.user);
      setUserDetails(credential.user);
      return credential;
    }
useEffect(()=>
{
  const unsubscribe=onAuthStateChanged(auth,currentUser=>
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
const logoutUser=async()=>
{
  await signOut(auth);
  setUser(null);
  setUserDetails(null);
}
    const authInfo={user,setUser,loading,setLoading,createUser,loginUser,toogle,setToogle,logoutUser,userDetails,setUserDetails};
  return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
  )
}

export default AuthProvider