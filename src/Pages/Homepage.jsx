import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loggeduser } from '../slices/userSlice';


const Homepage = () => {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let userinfo = useSelector (state  =>state.activeuser.value)
  console.log(userinfo);
  const auth = getAuth();

  useEffect(()=>{
    if(userinfo== null){
      navigate("/login")
    }
  },[])

  let handlelogout =()=>{

    signOut(auth).then(() => {
      navigate("/login")
      dispatch(loggeduser(null))
      localStorage.removeItem("user")
     
})
    

  }
  return (
    <Button onClick={handlelogout} variant="contained">Logout</Button>
  )
}

export default Homepage