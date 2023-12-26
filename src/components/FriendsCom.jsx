import React, { useEffect, useState } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import profile from "../assets/profile.png"
import Button from '@mui/material/Button';

import { getDatabase, ref, onValue ,set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendsCom = () => {
  const db = getDatabase();

  let [friendList , setFriendList] =useState([])
  let userinfo = useSelector(state =>state.activeuser.value)
  let [serachList , setSearchList] = useState([])
  let [searchlenth , setSearchlenth] =useState("")

  useEffect(()=>{
    const friendsRef = ref(db, 'friends');
onValue(friendsRef, (snapshot) => {
  let frindarray =[]
  snapshot.forEach((item)=>{
    if(item.val().whosendid == userinfo.uid || item.val().whoreceiveid == userinfo.uid){
      frindarray.push({...item.val(), fid:item.key})
    }
    
    

  })
  setFriendList(frindarray)
});
  },[])

  let handleblock =(items)=>{
    if(items.whosendid==userinfo.uid){
      set(push(ref(db, 'block')), {
        id:items.fid,
        blockbyid : userinfo.uid,
        blockbyName : userinfo.displayName ,
        blockid : items.whoreceiveid ,
        blockName : items.whoreceiveName
      }).then(()=>{
        remove(ref(db, 'friends/' +items.fid))

      })
    }
    else if(items.whoreceiveid==userinfo.uid){
      set(push(ref(db, 'block')), {
        id:items.fid,
        blockbyid : userinfo.uid,
        blockbyName : userinfo.displayName ,
        blockid : items.whosendid ,
        blockName : items.whosendName
      }).then(()=>{
        remove(ref(db, 'friends/' +items.fid))
      })

    }
   
  }
  let handleSearch =(e)=>{
    let searchvalue = e.target.value

    setSearchlenth(searchvalue.length)
    
  let user =  friendList.filter(item=>
      item.whosendName.toLowerCase().includes(e.target.value.toLowerCase())||item.whoreceiveName.toLowerCase().includes(e.target.value.toLowerCase())
    
   
  )
  console.log(user);
  setSearchList(user)

  }
  return (
    <div className='chatcom'>
    <div className='chatcomhaeder'>
        <h2>Friend</h2>
        <button className='chatcombtn'><TbDotsVertical/></button>
    </div>
    <div onChange={handleSearch} className='chatcomSearchBox'>
    <input type="text" className='chatcomSearch' />
   
    <div className='searchIcon'> 
        <CiSearch /> 
        <p>Search</p>
    </div>
    </div>

    {serachList.length >0 ?
         serachList.map((items)=>(
          userinfo.uid == items.whoreceiveid ?
          <div className='chatcomMsg'>
             <img src={profile} alt="" />
             <div className='chatcomName'>
             <h5 className='pName'>{items.whosendName}</h5>
             <Button variant="contained" onClick={()=>handleblock(items)}>Block</Button>
             </div>
           </div>
          
          :
            <div className='chatcomMsg'>
          <img src={profile} alt="" />
          <div className='chatcomName'>
          <h5 className='pName'>{items.whoreceiveName}</h5>
          <Button variant="contained" onClick={()=>handleblock(items)}>Block</Button>
          </div>
        </div>
     
        ))
         :

         searchlenth > 0 ?
          <>
          <p>no match found</p>
          </>
          :
          friendList.map((items)=>(
            userinfo.uid == items.whoreceiveid ?
            <div className='chatcomMsg'>
               <img src={profile} alt="" />
               <div className='chatcomName'>
               <h5 className='pName'>{items.whosendName}</h5>
               <Button variant="contained" onClick={()=>handleblock(items)}>Block</Button>
               </div>
             </div>
            
            :
              <div className='chatcomMsg'>
            <img src={profile} alt="" />
            <div className='chatcomName'>
            <h5 className='pName'>{items.whoreceiveName}</h5>
            <Button variant="contained" onClick={()=>handleblock(items)}>Block</Button>
            </div>
          </div>
       
          ))               
         }
  
</div>
  )
        }

export default FriendsCom