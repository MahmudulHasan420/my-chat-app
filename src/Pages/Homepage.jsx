import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth } from "firebase/auth";

import { useDispatch, useSelector } from 'react-redux';
import { loggeduser } from '../slices/userSlice';
import Grid from '@mui/material/Grid'
import ChatCom from '../components/ChatCom';
import GroupCom from '../components/GroupCom';
import FriendsCom from '../components/FriendsCom';
import PeopleCom from '../components/PeopleCom';
import FriendreqCom from '../components/FriendreqCom';
import BlockCom from '../components/BlockCom';




const Homepage = () => {
  
  let dispatch = useDispatch()
  let userinfo = useSelector (state  =>state.activeuser.value)
  console.log(userinfo);
  const auth = getAuth();

  // useEffect(()=>{
  //   if(userinfo== null){
  //     navigate("/login")
  //   }
  // },[])


  return (
    // <Button onClick={handlelogout} variant="contained">Logout</Button>
    <Grid container spacing={2}>
    <Grid item xs={4}>
      <ChatCom/>
    </Grid>
    <Grid item xs={4}>
      <GroupCom/>
    </Grid>
    <Grid item xs={4}>
      <FriendsCom/>
    </Grid>
    <Grid item xs={4}>
     <PeopleCom/>
    </Grid>
    <Grid item xs={4}>
     <FriendreqCom/>
    </Grid>
    <Grid item xs={4}>
     <BlockCom/>
    </Grid>

  </Grid>
  )
}

export default Homepage