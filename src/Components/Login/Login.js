import React,{ useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);


const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
 
    const[newUser,setnewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const[user,setUser] = useState({
      isSignedIn:false,
      name:'',
      email:'',
      password:'',
      photo:'',
      error:'',
      success:false
    });

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
   const fbProvider = new firebase.auth.FacebookAuthProvider(); 
  const handleFbSignIn = () =>{
    
    firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
       console.log(res.user);
    }).catch(e => console.log(e));
  
    
  }  
  const handleSignIn = () =>{
        firebase.auth().signInWithPopup(provider)
        .then(res => {
          const{displayName,email,photoURL} = res.user;
          const userData = {
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURL
          }
          setUser(userData);
          setLoggedInUser(userData);
          history.replace(from);
        })
        .catch(err => console.log(err))
  }
  const handleBlur = (e) =>{
       let isFormValid;
      if(e.target.name === "email"){
             isFormValid = /\S+@\S+\.\S+/.test(e.target.value);      
      }
      if(e.target.name === "password"){
         const validPassword = e.target.value.length>5;
         const passwordHasNumber = /\d{1}/.test(e.target.value);
  
         isFormValid = validPassword && passwordHasNumber;
      }  
      if(isFormValid){
        const newUserInfo = {...user};
         newUserInfo[e.target.name] = e.target.value;
         setUser(newUserInfo);  
      }
  
  }
  
  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      
       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
       .then(res =>{
        const newUserInfo ={...user};
       newUserInfo.error="";
       newUserInfo.success = true;
       setUser(newUserInfo);
       updateUserName(user.name);
       })
       .catch(error => {
      //   // Handle Errors here.
       var errorMessage = error.message;
  
       const newUserInfo ={...user};
       newUserInfo.error =errorMessage;
       newUserInfo.success = false;
       setUser(newUser);
        
       });
  
    }
    if(!newUser && user.email && user.password ){
      firebase.auth().signInWithEmailAndPassword(user.email,user.password)
      .then(res =>{
          
       const newUserInfo ={...user};
       newUserInfo.error="";
       newUserInfo.success = true;
       setUser(newUserInfo);
       setLoggedInUser(newUserInfo);
       history.replace(from);
     
         
      })
      .catch(function(error) {
        // Handle Errors here.
       
        var errorMessage = error.message;
        const newUserInfo ={...user};
        newUserInfo.error =errorMessage;
        newUserInfo.success = false;
        setUser(newUserInfo);
        // ...
      });
    }
    
    e.preventDefault();
  }
  
  const updateUserName = name =>{
  
    const user = firebase.auth().currentUser;
  
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully');
    }).catch(function(error) {
      console.log(error);
    });
  }
  
  
  const handleSignOut = () =>{ 
     firebase.auth().signOut()
     .then(res => {
        const signedOutUser = {
          isSignedIn:false,
          name:'',
          email:'',
          photo:'',
        }
        setUser(signedOutUser);
     })
     .catch(e => console.log(e))
  } 
    return (
        <div style={{textAlign:"center"}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>:

        <button onClick={handleSignIn}>Sign In</button>
      }
      <br/>
      <br/>
       <button onClick={handleFbSignIn}>Sign In With Facebook</button>
        <p style={{color:'red'}}>{user.error}</p>
    {user.success &&  <p style={{color:'green'}}>User Has been {newUser ? 'created' : 'Loged in'} successfully</p> }
        <h1>Our Own Authentication</h1>
        <form action="" onSubmit={handleSubmit}>
            <input type="checkbox" name="newUser" onChange={()=>setnewUser(!newUser)}/>
           <label htmlFor="newUser">New User</label>
            <br/>
            <br/>
           {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name"/>}
           <br/>
           <br/>
          <input type="text" onBlur={handleBlur} name="email" required placeholder="Enter your Email"/>
          <br/>
          <br/>
          <input type="password" onBlur={handleBlur} name="password" placeholder="Enter your Password" required/>
           <br/>
           <br/>
           <input type="submit" value="submit"/>
        </form>
      
       {
         user.isSignedIn &&
         <div>
           <p>Welcome {user.name} </p>
          <p>Your Email : {user.email}</p>
          <img src={user.photo} alt=""/>
         </div>
       }
    </div>
  
    );
};

export default Login;