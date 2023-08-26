import React from "react";
import classes from "./Login.module.css";
import LoginModal from "./LoginModal";
import googeleimage from '../assets/google-icon-logo-png-transparent.png';

function Login(props) {
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
            <button><img src={googeleimage} alt="google" className={classes.googleicon}/>Google</button>
          </div>
        </div>
        <div className={classes.signUp}>
          <h4>Don't have an account?</h4>
          <button>Sign Up</button>
        </div>
      </div>
    </LoginModal>
  );
}

export default Login;
