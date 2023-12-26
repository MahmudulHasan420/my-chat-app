import React, { useEffect, useState } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import profile from "../assets/profile.png"
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const BlockCom = () => {
  const db = getDatabase();

  let userinfo = useSelector(state =>state.activeuser.value)
  let [blockList , setBlockList] = useState([])



  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
    let  blockarray =[]
    snapshot.forEach((item)=>{
      if(userinfo.uid == item.val().blockbyid){
        blockarray.push({...item.val() , userid:item.key}) 
      }
     
    })
    setBlockList(blockarray)
    ;
    });
  },[])

  let handleunblock =(items)=>{
    remove(ref(db, 'block/'+items.userid ))
  } 
  return (
    <div className='chatcom'>
    <div className='chatcomhaeder'>
        <h2>Block List</h2>
        <button className='chatcombtn'><TbDotsVertical/></button>
    </div>

    {blockList.map((items)=>(
      <div className='chatcomMsg'>
      <img src={profile} alt="" />
      
      <div className='chatcomName'>
      <h5 className='pName'>{items.blockName}</h5>
      <Button variant="contained" onClick={()=>handleunblock(items)}>unblock</Button>
      </div>
    </div>

    ))

    }
    


    
</div>
  )
}

export default BlockCom