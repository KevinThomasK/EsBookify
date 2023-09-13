import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import LoginModal from "./LoginModal";
import googeleimage from '../assets/google-icon-logo-png-transparent.png';
import OtpVerify from "./OtpVerify";
import PhoneInput from "react-phone-input-2";
// import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input';
import { auth,db,provider } from "../firebase";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber, signInWithPopup } from "@firebase/auth";
import HomePage from "../HomePage";
import 'react-phone-input-2/lib/style.css'
import { parsePhoneNumber } from "libphonenumber-js";
import { formatPhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js/core";
import { toast } from "react-toastify";
import { getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { func } from "prop-types";
import UserSignUp from "../SignUp/UserSignUp";

// import 'react-phone-input-2/lib/style.css'
function Login(props) {
  const [ph, setph] = useState("")
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneerror, setphoneerror] = useState(false);
  const [ValidPhoneNumber, setValidPhoneNumber] = useState(false);
  const [ErrorMessage, setErrorMessage] =useState("")
  const [IsSignUp, setIsSignUp] =useState (false);
  // const [value, setValue] =useState('')
  const [CountryCode, setCountryCode]=useState("");
  const  handleClick = async ()=>{
    try {
      const result = await signInWithPopup(auth,provider)
      const user = result.user

      // check for the user

      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if(!docSnap.exists()){
        await setDoc(docRef,{
          name:user.displayName,
          email:user.email,
          timestamp:serverTimestamp(),
        })
      }

      toast.success("Signed In")
    } catch (err) {
      toast.error("something went wrong");
    }
    // signInWithPopup(auth,provider).then((data)=>{
    //   // setValue(data.user.email)
    //   props.onClose()
    //   // localStorage.setItem("email",data.user.email)
    // })
  }
  // useEffect(()=>{
  //   setValue(localStorage.getItem('email'))
  // })
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
    // const isValidCountryCallingCode = PhoneNumber.isValidCountryCallingCode(value);
    // const formattedPhoneNumber = formatPhoneNumber(ph, CountryCode);
    // console.log("formattedPhoneNumber" ,formattedPhoneNumber);
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
      
      // const auth = getAuth();    
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log(confirmationResult);  
          setShowOTP(true)      // SMS sent. Prompt user to type the code from the message, then sign the     
          // user in with confirmationResult.confirm(code).  

          window.confirmationResult = confirmationResult;        // ... 
        }).catch((error) => {
          if (error instanceof FirebaseError) {
            console.log(error,error.code,error.message);
          console.log(error.code);
          console.log(error.message);
          if (error.code=== 'auth/invalid-phone-number' ) {         
          setErrorMessage("Invalid Phone Number ") 
         } else {    
            // Handle other Firebase errors     
            setErrorMessage('Other Firebase error:', error.message);    }
         setShowOTP(false)
          }
        });
        
    }
  }
  const handlePhonechange = (e, country) => {
    setph(e)
    setCountryCode(country.countryCode)

 }
 function handleSignUp (){
  setIsSignUp(true)
 }
 function handleLogin(){
  setIsSignUp(false)
 }
  return (
    <LoginModal onClose={props.onClose}>
      {!IsSignUp?
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
                  <PhoneInput
                    type="tel"
                    countryCodeEditable={false}
                    req country={"in"} value={ph} onChange={handlePhonechange}
                    placeholder="Mobile Number" />
                  {/* <input
              type="text"
              placeholder="Mobile"
              className={classes.mobileInput}
            ></input> */}
                </div>
                {phoneerror ?
                  <span className={classes.text_color_error}>
                    Please Enter Mobile Number
                  </span> : ValidPhoneNumber ?
                    <span className={classes.text_color_error}>
                      Please enter valid Mobile Number
                    </span> : ErrorMessage?
                     <span className={classes.text_color_error}>
                      {ErrorMessage}
                     </span>:null
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
                  {/* {value?<HomePage/>:null} */}
                  <button onClick={handleClick}><img src={googeleimage} alt="google" className={classes.googleicon} />Google</button>
                </div>
              </div>
              <div className={classes.signUp}>
                <h4>Don't have an account?</h4>
                <button onClick={handleSignUp}>Sign Up</button>
              </div>
            </div>
            : <OtpVerify phoneNumber={ph} onCloseOTP={props.onClose} />}
      </div>
      : <UserSignUp handleLogin={handleLogin}/> }
    </LoginModal>
  );
}
export default Login;