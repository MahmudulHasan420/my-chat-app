import React, { useEffect, useState } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import profile from "../assets/profile.png"
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';






const ChatCom = () => {
  const db = getDatabase();
  let userinfo = useSelector(state =>state.activeuser.value)
  let [userList , setUserlist] =useState([])
  let [serachList , setSearchList] = useState([])
  let [searchlenth , setSearchlenth] =useState("")
  let [friendList , setFriendList] =useState([])

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

             </div>
           </div>
          
          :
            <div className='chatcomMsg'>
          <img src={profile} alt="" />
          <div className='chatcomName'>
          <h5 className='pName'>{items.whoreceiveName}</h5>
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
              
               </div>
             </div>
            
            :
              <div className='chatcomMsg'>
            <img src={profile} alt="" />
            <div className='chatcomName'>
            <h5 className='pName'>{items.whoreceiveName}</h5>
            </div>
          </div>
       
          ))               
         }
  
</div>
  )
}

export default ChatCom