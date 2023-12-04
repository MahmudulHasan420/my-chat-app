import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import registraton from '../assets/registraton.png'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {toast } from 'react-toastify';
import {AiFillEye , AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification ,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Hourglass } from 'react-loader-spinner'
import { getDatabase, ref, set } from "firebase/database";

const Mybutton = styled(Button)({
  fontSize: '20px',
  padding: '6px 12px',
  width : '90%',
  fontWeight :'600',

  fontFamily: [
    'Inter',
   
  ].join(','),

});


const Registration = () => {
  const db = getDatabase();
  let navigate= useNavigate()
  const auth = getAuth();
  let [openeye , setOpeneye] = useState(true)
  let userinfo = useSelector(state =>state.activeuser.value)
  let [loader , setLoader] = useState(true)

  let [input, setInput] =useState({
    email:"",
    fullname : "",
    password : "",
  
  })
  let handlechange =(e)=>{
    console.log({[e.target.name] : e.target.value});
    setInput({...input, [e.target.name] : e.target.value})
  }
  let handleclick =()=>{
    setLoader(false)
    createUserWithEmailAndPassword(auth, input.email , input.password)
  .then((userCredential) => {

  //   sendEmailVerification(auth.currentUser)
  // .then(() => {
    console.log(userCredential)
    set(ref(db, 'user/' +  userCredential.user.uid ),   {
      username: input.fullname,
      email: userCredential.user.email,
      profile_picture : "https://firebasestorage.googleapis.com/v0/b/mychatapp-34da9.appspot.com/o/J23-%20107047%20%20Apr---%2031%20---23%20jpg-%20(1)%20(1).jpg?alt=media&token=11656920-8724-4ddf-bdec-7cf62fd3b45b"
    });
    toast("verification mail send")
    navigate("/login")
    setLoader(true)
  // });
 
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

   console.log(errorCode)
   setLoader(true)
    
    if(errorCode.includes("weak")){
      toast.error("password too weak")
    }
   
  });

    if(input.email==""){
      toast.error("please enter a email");
    }
    else{
      let emailverify =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if(!emailverify.test(input.email)){
        toast.error("please enter a valid email");
      }
     
    }

    if(input.fullname == ""){
      toast.error("please enter your name");
    }
    if(input.password==""){
      toast.error("please enter a password");
    }
    else{
      let verifypassword =/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if(!verifypassword.test(input.password)){
        toast.error("please enter a password with a lower case[a-z] a capital case [A-Z] a number[1-9] a special charecter");
      }
    }
  }
  let handlegooglelogin= ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(() =>{
      navigate("/home")

    })
    
  }

  let handleCloseEye =()=>{
    setOpeneye(false)

  }
  let handleOpenEye =()=>{
    setOpeneye(true)

  }


  // useEffect(()=>{
  //   if(userinfo != null){
  //     navigate("/home")
  //   }
  // },[])
  
  
  return (
   <>
   {
    loader ?
    <Grid container spacing={2}>
    <Grid item xs={5}>
     <div className='regbox'>  
      <h1 className='regheading'>Welcome To Chatt.</h1>
      <h2 className='regh2'>Sing Up</h2>
      <div className='regInputBox'> 
        <label className='regLabel'>Full Name</label>
      <input onChange={handlechange} name="fullname" className='regInput' placeholder='Name here' type="text" />
      </div>
      <div  className='regInputBox'>
        <label className='regLabel'>Email</label>
      <input onChange={handlechange}  name="email" className='regInput' placeholder='Enter your mail' type="text" />
      </div>
     {openeye ?
      <div className='regInputBox'>
      <label className='regLabel'>Password</label>
      <input onChange={handlechange}  name="password" className='regInput' placeholder='Password' type="password" />
      <div onClick={handleCloseEye} className='regEye'>
      <AiFillEye/>
      </div>
      </div>
     :

          <div className='regInputBox'>
            <label className='regLabel'>Password</label>
            <input onChange={handlechange}  name="password" className='regInput' placeholder='Password' type="text" />
            <div onClick={handleOpenEye} className='regEye'>
               <AiFillEyeInvisible/>
            </div>
        </div>

     }
      <div className='regcheck'> 
      <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />
      </div>
      <div className='regButton'>
        <Mybutton onClick={handleclick} variant="contained">Sign Up</Mybutton>
      </div>
      <div className='regButton'>
        <Mybutton onClick={handlegooglelogin} variant="contained">Google</Mybutton>
      </div>
      
      
      <div className='regsingin'>Have an account? 
      <Link to="/login">
      <span>Sign in</span>
      </Link>
      </div>
      
     </div>
    </Grid>
    <Grid item xs={7}>
      <img className='regimg' src={registraton} alt="cover photo" />
    </Grid>
    
  </Grid>
  :
  <Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#306cce', '#72a1ed']}
/>
   }
   </>
     
  )
}

export default Registration