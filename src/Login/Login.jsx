import React, { useState } from "react";
import classes from "./Login.module.css";
import LoginModal from "./LoginModal";
import googeleimage from '../assets/google-icon-logo-png-transparent.png';
import OtpVerify from "./OtpVerify";
import PhoneInput from "react-phone-input-2";
import { auth } from "../firebase";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";

// import 'react-phone-input-2/lib/style.css'


function Login(props) {
  const [ph, setph] = useState("")
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneerror, setphoneerror] = useState(false);
  const [ValidPhoneNumber,setValidPhoneNumber]= useState (false);
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      // const auth = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response);
          onSignup()
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
      })
    }
  }
  const onSignup = () => {
    if (!ph) {
      setphoneerror(true)
    }
    else if(ph.length<12 ){
      setValidPhoneNumber(true)  
      setphoneerror(false)  
    }
    else {
      setValidPhoneNumber(false)
      setphoneerror(false)
      onCaptchVerify()
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = '+' + ph
      console.log(phoneNumber, appVerifier);
      setShowOTP(true)
      // const auth = getAuth();    
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log(confirmationResult);        // SMS sent. Prompt user to type the code from the message, then sign the     
          // user in with confirmationResult.confirm(code).  

          window.confirmationResult = confirmationResult;        // ... 
        }).catch((error) => {
          // Error; SMS not sent        // ...  
        });
    }
  }

  return (
    <LoginModal onClose={props.onClose}>
      <div className={classes.loginmainDiv}>
        <div id="recaptcha-container" style={{ display: "none" }}>  </div>
        {
          !showOTP ?
            <div>
              <div className={classes.loginComponents}>
                <div className={classes.btnGroup}>
                  <button type="button" className={classes.activeBtn}>User</button>
                  <button type="button">Org</button>
                </div>
                <div className={classes.MobileInputDiv}>
                  <PhoneInput req country={"in"} value={ph} onChange={setph} placeholder="Mobile Number" />
                  {/* <input
              type="text"
              placeholder="Mobile"
              className={classes.mobileInput}
            ></input> */}
                </div>
                {phoneerror ?
                  <span className={classes.text_color_error}>
                    Please Enter Mobile Number
                  </span>: ValidPhoneNumber? 
                  <span  className={classes.text_color_error}>
                    Please enter valid Mobile Number
                  </span>: null
                }

                <div className={classes.loginBtn}>

                  <button onClick={() => onSignup()}>Login</button>
                </div>
                <div className={classes.flex}>
                  <div className={classes.underline}></div>
                  <p>Or</p>
                  <div className={classes.underline}></div>
                </div>

                <div className={classes.ggloginBtn}>
                  <button><img src={googeleimage} alt="google" className={classes.googleicon} />Google</button>
                </div>
              </div>
              <div className={classes.signUp}>
                <h4>Don't have an account?</h4>
                <button>Sign Up</button>
              </div>
            </div>
            : <OtpVerify />}


      </div>

    </LoginModal>

  );
}

export default Login;
