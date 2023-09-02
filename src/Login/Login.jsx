import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { auth,provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import LoginModal from "./LoginModal";
import googeleimage from '../assets/google-icon-logo-png-transparent.png';
import { data } from "autoprefixer";

function Login(props) {

  const [value,setValue] = useState('');
  const handleGoogleClick = () => {
    signInWithPopup(auth,provider).then((data)=> {
      setValue(data.user.email)
      localStorage.setItem("email",data.user.email)
    })
  };

  useEffect(()=>{
    setValue(localStorage.getItem("email"))
  })

  return (
    <LoginModal onClose={props.onClose}>
      <div className={classes.loginmainDiv}>
        <div className={classes.loginComponents}>
          <div className={classes.btnGroup}>
            <button type="button" className={classes.activeBtn}>User</button>
            <button type="button">Org</button>
          </div>
          <div className={classes.MobileInputDiv}>
            <input
              type="text"
              placeholder="Mobile"
              className={classes.mobileInput}
            ></input>
          </div>
          <div className={classes.loginBtn}>
            <button>Login</button> 
          </div>
          <div className={classes.flex}>
          <div className={classes.underline}></div>
          <p>Or</p>
          <div className={classes.underline}></div>
          </div>
         
          <div className={classes.ggloginBtn}>
            <button onClick={handleGoogleClick}><img src={googeleimage} alt="google" className={classes.googleicon}/>Google</button>
          </div>
        </div>
        <div className={classes.signUp}>
          <h4>Don't have an account?</h4>
          <button>Sign Up</button>
        </div>
        {value?<p>Logout</p>:<p>Login</p>}
        {value?<button>Logout</button>:<button>Login</button>}
        
      </div>
    </LoginModal>
  );
}

export default Login;
