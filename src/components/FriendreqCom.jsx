import React, { useEffect, useState } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import profile from "../assets/profile.png"
import Button from '@mui/material/Button';

import { getDatabase, ref, onValue, push , set, remove  } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendreqCom = () => {
  const db = getDatabase();

  let [friendlist , setFriendlist] =useState([])
  let userinfo = useSelector(state =>state.activeuser.value)
  console.log(userinfo.uid);


  useEffect(()=>{
    const friendreuestRef = ref(db, 'Friendrequest');
onValue(friendreuestRef, (snapshot) => {
  let reqArray = []
  snapshot.forEach((item)=>{
    if(item.val().whoreceiveid == userinfo.uid) {
      reqArray.push({...item.val() , frid:item.key})
    } 
    

  })

  setFriendlist(reqArray)
});
  },[])

  let handleaccpet=(items)=>{
    set(push(ref(db, 'friends' )), {
      ...items
    }).then(()=>{
      remove(ref(db, 'Friendrequest/' + items.frid ))
    })

  }

  let handlecencel= (items)=>{
    remove(ref(db, 'Friendrequest/' + items.frid ))
  }
  return (
    <div className='chatcom'>
    <div className='chatcomhaeder'>
        <h2>Friend Requests</h2>
        <button className='chatcombtn'><TbDotsVertical/></button>
    </div>

    {friendlist.map((items)=>(
      <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>{items.whosendName}</h5>
      <Button variant="contained" onClick={()=>handleaccpet(items)}>Confirm</Button>
      <Button variant="contained" onClick={()=>handlecencel(items)}>Cencel</Button>
      </div>
    </div>
    ))

    }

    


    
</div>
  )
}

export default FriendreqCom