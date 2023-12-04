import React, { useEffect, useState } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import profile from "../assets/profile.png"
import { getDatabase, ref, onValue } from "firebase/database";





const ChatCom = () => {
  const db = getDatabase();

  let [userList , setUserlist] =useState([])
  let [serachList , setSearchList] = useState([])
  let [searchlenth , setSearchlenth] =useState("")

  useEffect(()=>{
    const starCountRef = ref(db, 'user');
    onValue(starCountRef, (snapshot) => {
      let userArray =[]

      snapshot.forEach(item=>{
        userArray.push(item.val())

      })
      setUserlist(userArray) 
      
    });
  },[])


  let handleSearch =(e)=>{
    let searchvalue = e.target.value

    setSearchlenth(searchvalue.length)

    

  let user =  userList.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase()))

  setSearchList(user)

  }
  return (
    <div className='chatcom'>
        <div className='chatcomhaeder'>
            <h2>Chat</h2>
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
          <div className='chatcomMsg'>
          <img src={profile} alt="" />
          
          <div className='chatcomName'>
          <h5 className='pName'>{items.username}</h5>
            <p className='chatcomTime'>10:30 PM</p>
          </div>
        </div>
        ))
         :

         searchlenth > 0 ?
          <>
          <p>no match found</p>
          </>
          :
          userList.map((items)=>(
            <div className='chatcomMsg'>
            <img src={profile} alt="" />
            
            <div className='chatcomName'>
            <h5 className='pName'>{items.username}</h5>
              <p className='chatcomTime'>10:30 PM</p>
            </div>
          </div>
         
       
        ))
         
         }

        
        
    </div>
  )
}

export default ChatCom