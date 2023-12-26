import React, { useEffect, useState } from 'react'
import { TbDotsVertical } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";
import { getDatabase, ref, onValue ,set, push } from "firebase/database";
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

const PeopleCom = () => {
  const db = getDatabase();

  let [userList , setUserlist] =useState([])
  let [serachList , setSearchList] = useState([])
  let [searchlenth , setSearchlenth] =useState("")
  let [frid , setFrid] =useState([])
  let [fid , setFid] =useState([])
  let [blockid , setBlockid] =useState([])
  

  let userinfo = useSelector(state =>state.activeuser.value)

  useEffect(()=>{
    const peopleRef = ref(db, 'user');
    onValue(peopleRef, (snapshot) => {
      let userArray =[]

      snapshot.forEach(item=>{
        if(userinfo.uid != item.key){
          userArray.push({...item.val() , useride:item.key})
        }
        
      })
      setUserlist(userArray) 
     
      
      
    });
  },[])
  useEffect(()=>{
    const friendreuestRef = ref(db, 'Friendrequest');
onValue(friendreuestRef, (snapshot) => {
  let reqArray = []
  snapshot.forEach((item)=>{
    
      reqArray.push(item.val().whosendid + item.val().whoreceiveid)
  })

  setFrid(reqArray)
  
});
  },[])

  useEffect(()=>{
    const friendsRef = ref(db, 'friends');
onValue(friendsRef, (snapshot) => {
  let frindarray =[]
  snapshot.forEach((item)=>{
    
    frindarray.push(item.val().whoreceiveid+item.val().whosendid)

  })
  setFid(frindarray)
  
  
});
  },[])

  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
    let  blockarray =[]
    snapshot.forEach((item)=>{
      
        blockarray.push(item.val().blockbyid +item.val().blockid) 
      
     
    })
    setBlockid(blockarray)
    ;
    });
  },[])

  let handleSearch =(e)=>{
    let searchvalue = e.target.value

    setSearchlenth(searchvalue.length)  

    

  let user =  userList.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase()))

  setSearchList(user)

  }

  let handlerequest = (items)=>{
    set(push(ref(db, 'Friendrequest' )), {
      whosendid :userinfo.uid,
      whosendName :userinfo.displayName,
      whoreceiveid :items.useride,
      whoreceiveName :items.username,
    });

  }
  

  return (
    <div className='chatcom'>
    <div className='chatcomhaeder'>
        <h2>People</h2>
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
          <img src={items.profile_picture} alt="" />
          
          <div className='chatcomName'>
          <h5 className='pName'>{items.username}</h5>
          { frid.includes(userinfo.uid+items.useride) || frid.includes(items.useride+userinfo.uid)  
            ? 
            <Button variant="contained" disabled>pending</Button>
            :
            fid.includes(userinfo.uid+items.useride) || fid.includes(items.useride+userinfo.uid)
            ?
            <Button variant="contained" color='success'>Friends</Button>
            :
            blockid.includes(userinfo.uid+items.useride) || blockid.includes(items.useride+userinfo.uid)  ?
            <Button variant="contained" disabled>not allowed</Button>
            :
            <Button variant="contained" onClick={()=>handlerequest(items)}>Add</Button>
            }
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
            <img src={items.profile_picture} alt="" />
            
            <div className='chatcomName'>
            <h5 className='pName'>{items.username}</h5>
            { frid.includes(userinfo.uid+items.useride) || frid.includes(items.useride+userinfo.uid)  
              ? 
              <Button variant="contained" disabled>pending</Button>
              :
              fid.includes(userinfo.uid+items.useride) || fid.includes(items.useride+userinfo.uid)
              ?
              <Button variant="contained" color='success'>Friends</Button>
              :
              blockid.includes(userinfo.uid+items.useride) || blockid.includes(items.useride+userinfo.uid)  ?
              <Button variant="contained" disabled>not allowed</Button>
              :
              <Button variant="contained" onClick={()=>handlerequest(items)}>Add</Button>
              }
            </div>
          </div>
         
       
        ))               
         }   
</div>
  )
}

export default PeopleCom