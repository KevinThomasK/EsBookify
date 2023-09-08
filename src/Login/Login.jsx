import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import LoginModal from "./LoginModal";
import googeleimage from '../assets/google-icon-logo-png-transparent.png';
import OtpVerify from "./OtpVerify";
import PhoneInput from "react-phone-input-2";
// import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input';
import { auth,provider } from "../firebase";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import HomePage from "../HomePage";
import 'react-phone-input-2/lib/style.css'
import { parsePhoneNumber } from "libphonenumber-js";
import { formatPhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js/core";

// import 'react-phone-input-2/lib/style.css'


function Login(props) {
  const [ph, setph] = useState("")
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneerror, setphoneerror] = useState(false);
  const [ValidPhoneNumber,setValidPhoneNumber]= useState (false);
  // const [value, setValue] =useState('')
  const [CountryCode, setCountryCode]=useState("");
  const  handleClick =()=>{
    signInWithPopup(auth,provider).then((data)=>{
      // setValue(data.user.email)
      props.onClose()
      // localStorage.setItem("email",data.user.email)
    })
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
  const handlePhonechange = (e,country) => {
    
    console.log(e,country);
    setph(e)
    setCountryCode(country.countryCode)
    // try {      
    //   const parsedNumber = parsePhoneNumber(e);  
    //   console.log(parsedNumber, "parsed");   
    //    if (parsedNumber) {        
    //   setCountryCode(parsedNumber.countryCallingCode);      } 
    //   else {        
    //     setCountryCode('');     
    //    }    
    //   } catch (error) {    
    //     // Handle parsing errors (invalid phone numbers)      
    //     setCountryCode('');    }
  }
  console.log("CountryCode",CountryCode) ;
  // Number will be with country code
  // function isValidNumber(number) 
  // {   
  //   console.log(number)  
  //  return parsePhoneNumber(number).isValid()}
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
                  <PhoneInput
                //   isValid={(value, country) => {   
                //     console.log("value",value);
                //      if (value.match(/12345/)) {    

                //       return 'Invalid value: '+value+', '+country.name;   
                //  } 
                //   else if (value.match(/1234/)) 
                //   {     
                //      return false;   
                //      } 
                //      else {    
                //       return true;   
                //      }  
                //     }}
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
                  {/* {value?<HomePage/>:null} */}
                  <button onClick={handleClick}><img src={googeleimage} alt="google" className={classes.googleicon} />Google</button>
                </div>
              </div>
              <div className={classes.signUp}>
                <h4>Don't have an account?</h4>
                <button>Sign Up</button>
              </div>
            </div>
            : <OtpVerify phoneNumber={ph} onCloseOTP={props.onClose} />}


      </div>

    </LoginModal>

  );
}

export default Login;
