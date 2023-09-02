import React, { useState } from 'react';
import OTPInput from "otp-input-react";
import classes from "./Login.module.css";
import '../Login/OtpVerify.css'
function OtpVerify() {
  const [otp, setOtp] = useState("")
  const [OtpError, setOtpError] = useState (false);
  const [OtpValid, setOtpValid] = useState (false);
  // function handleOTP(e) 
  // {
  //   console.log ("otpvalue", e)
  //   // setOtp (e.target.value)
  // }
  const handleOTP = (otpValue) => { setOtp(otpValue); };
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
      }) .catch((error) => {
        // Error; SMS not sent        // ...  
      console.log(error)
      });  
    }
  }
    
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
        <h4>Didn't receive OTP?</h4>
        <button>Resend</button>
      </div>
      </div>
    </div>
  )
}

export default OtpVerify