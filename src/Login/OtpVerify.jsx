import React, { useEffect, useState } from 'react';
import OTPInput from "otp-input-react";
import classes from "./Login.module.css";
import '../Login/OtpVerify.css'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';
import {useLocation} from 'react-router-dom';



function OtpVerify(props) {
  const [otp, setOtp] = useState("")
  const [OtpError, setOtpError] = useState (false);
  const [OtpValid, setOtpValid] = useState (false);
  const [countdown, setCountdown] = useState(15); // Initial countdown time in seconds
  const [isDisabled, setIsDisabled] = useState(false);
  const handleOTP = (otpValue) => { setOtp(otpValue); };
  const location = useLocation();
console.log(location);


  useEffect(() => {
    // var button = document.getElementById("myButton"); // Disable the buttonbutton.disabled = true;
    // button.disabled=(true);
    let timer;
    setIsDisabled(true);
    console.log("countdown",countdown)
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsDisabled(false); // Enable the button when the countdown reaches 0
    }

    return () => {
      clearInterval(timer); // Clear the interval when the component unmounts
    };
  }, [countdown]);
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      // const auth = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response);
          handleResendClick()
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
  const handleResendClick = () => {
    setCountdown(15); // Reset the countdown
    setIsDisabled(true); // Disable the button
    onCaptchVerify()
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = '+' + props.phoneNumber
      console.log(phoneNumber, appVerifier)
      // const auth = getAuth();    
      signInWithPhoneNumber(auth,phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log(confirmationResult);        // SMS sent. Prompt user to type the code from the message, then sign the     
          // user in with confirmationResult.confirm(code).  

          window.confirmationResult = confirmationResult;        // ... 
        }).catch((error) => {
          // Error; SMS not sent        // ...  
        });
  };
  const VerifierOtp = () => {
    if (!otp) {
      setOtpError(true)
    }
    else if(otp.length<6 ){
      setOtpValid (true)  
      setOtpError(false)  
    }
    else{
      setOtpValid (false)  
      setOtpError(false) 
      window.confirmationResult.confirm(otp).then(async(res)=>{
        console.log(res)
        console.log("LoggedInSuccessfully")
        props.onCloseOTP()
        if (props.section=="org"){
          console.log(props.history);
        }
      }) .catch((error) => {
        // Error; SMS not sent        // ...  
      console.log(error)
      console.log("error")
      });  
    }
  }
 
    console.log(isDisabled);
  return (

    <div className='maindiv-otp'>
      <div>
      <OTPInput
        value={otp}
        onChange={handleOTP}
        className={`${classes.mobileInput} otpcontainer  otp-container `}
        OTPLength={6}
        otpType="number"
        disabled={false}
        autoFocus>
      </OTPInput>
      {OtpError?
        <span className={classes.text_color_error}>
          Enter Valid OTP
        </span>: OtpValid?
        <span className={classes.text_color_error}>
          Enter OTP
        </span> :null
        }
      <div className={`${classes.loginBtn} subdiv-verify`} >
       
        <button onClick={() => VerifierOtp()} className='w-full flex gap-1 items-center justify-center py-2.5 text-orange rounded  '>
         <span> Verify</span>
        </button>
      </div>
      <div className= {`${classes.signUp} subdiv-resend`}>
        <h4>Didn't receive OTP?</h4><br/> 
        <button 
        onClick={()=>handleResendClick()} 
         disabled={isDisabled}  >
        Resend {isDisabled ? `(${countdown}s)` : ''}
      </button>
      </div>
      </div> 
      <div id="recaptcha-container" style={{ display: "none" }}>  </div>
    </div>
  )
}

export default OtpVerify;
