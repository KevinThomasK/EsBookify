import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import LoginModal from "./LoginModal";
import googeleimage from "../assets/google-icon-logo-png-transparent.png";
import OtpVerify from "./OtpVerify";
import PhoneInput from "react-phone-input-2";
// import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input';
import { auth, db, provider } from "../firebase";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
  signInWithPopup,
} from "@firebase/auth";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import UserSignUp from "../SignUp/UserSignUp";
import { FirebaseError } from "firebase/app";
import { newUser, validateOrg } from "../api-Helpers/api-helpers";
import { useNavigate } from "react-router";
import { storeIdentifier } from "../Redux/Action";
import { connect } from "react-redux";

// import 'react-phone-input-2/lib/style.css'
function Login(props) {
  // console.log(props);
  const [ph, setph] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [phoneerror, setphoneerror] = useState(false);
  const [ValidPhoneNumber, setValidPhoneNumber] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [IsSignUp, setIsSignUp] = useState(false);
  const [CountryCode, setCountryCode] = useState("");
  const [org, setOrg] = useState(false);
  const location = useNavigate();
  const [section, setSection] = useState("user");

  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("email", user.email);
      localStorage.setItem("userType", section);
      const uid = user.uid;
      localStorage.setItem("UID", uid);
      console.log(uid);
      console.log(section);
      // check for the user
      newUser({
        uid: uid,
        name: user.displayName,
        email: user.email,
        userType: section,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      // if (section == "org") {
      //   location("/OrganizationHomepage");
      // }
      window.localStorage.setItem("loginDetails", section);
      props.storeIdentifier(section);
      toast.success("Signed In");
      props.onClose();
    } catch (err) {
      props.storeIdentifier(section);
    }
  };

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      // const auth = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log(response);
            onSignup();
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        }
      );
    }
  }
  const onSignup = async () => {
    // const isValidCountryCallingCode = PhoneNumber.isValidCountryCallingCode(value);
    // const formattedPhoneNumber = formatPhoneNumber(ph, CountryCode);
    // console.log("formattedPhoneNumber" ,formattedPhoneNumber);
    if (!ph) {
      setphoneerror(true);
    } else if (ph.length < 12) {
      setValidPhoneNumber(true);
      setphoneerror(false);
    } else {
      setValidPhoneNumber(false);
      setphoneerror(false);
      onCaptchVerify();
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = "+" + ph;
      // console.log(phoneNumber, appVerifier);

      // const auth = getAuth();
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          //console.log(confirmationResult);
          setShowOTP(true); // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log("testing");
          window.confirmationResult = confirmationResult; // ...
        })
        .then(console.log("the USER is", auth))
        .catch((error) => {
          console.log("testing2", error);
          if (error instanceof FirebaseError) {
            console.log(error, error.code, error.message);
            if (error.code === "auth/invalid-phone-number") {
              setErrorMessage("Invalid Phone Number ");
            } 
            // else {
            //   // Handle other Firebase errors
            //   setErrorMessage("Other Firebase error:", error.message);
            // }
            setShowOTP(false);
          }
        });
    }
  };
  const handlePhonechange = (e, country) => {
    setph(e);
    setCountryCode(country.countryCode);
  };
  function handleSignUp() {
    setIsSignUp(true);
  }
  function handleLogin() {
    setIsSignUp(false);
  }
  function handleSection(item) {
    setSection(item);
  }
  return (
    <LoginModal onClose={props.onClose}>
      {!IsSignUp ? (
        <div className={classes.loginmainDiv}>
          <div id="recaptcha-container" style={{ display: "none" }}>
            {" "}
          </div>
          {!showOTP ? (
            <div>
              <div className={classes.loginComponents}>
                <div className={classes.btnGroup}>
                  <button
                    onClick={() => handleSection("user")}
                    type="button"
                    className={section == "user" ? classes.activeBtn : ""}
                  >
                    User
                  </button>
                  <button
                    onClick={() => handleSection("org")}
                    type="button"
                    className={section == "org" ? classes.activeBtn : ""}
                  >
                    Org
                  </button>
                </div>
                <div className={classes.MobileInputDiv}>
                  <PhoneInput
                    type="tel"
                    countryCodeEditable={false}
                    req
                    country={"in"}
                    value={ph}
                    onChange={handlePhonechange}
                    placeholder="Mobile Number"
                  />
                </div>
                {phoneerror ? (
                  <span className={classes.text_color_error}>
                    Please Enter Mobile Number
                  </span>
                ) : ValidPhoneNumber ? (
                  <span className={classes.text_color_error}>
                    Please enter valid Mobile Number
                  </span>
                ) : ErrorMessage ? (
                  <span className={classes.text_color_error}>
                    {ErrorMessage}
                  </span>
                ) : null}
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
                  <button onClick={handleClick}>
                    <img
                      src={googeleimage}
                      alt="google"
                      className={classes.googleicon}
                    />
                    Google
                  </button>
                </div>
              </div>
              <div className={classes.signUp}>
                <h4>Don't have an account?</h4>
                <button onClick={handleSignUp}>Sign Up</button>
              </div>
            </div>
          ) : (
            <OtpVerify
              phoneNumber={ph}
              section={section}
              onCloseOTP={props.onClose}
            />
          )}
        </div>
      ) : (
        <UserSignUp onCloseOTP={props.onClose} handleLogin={handleLogin} />
      )}
    </LoginModal>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    storeIdentifier: (s) => {
      dispatch(storeIdentifier(s));
    },
  };
};
export default connect(null, mapDispatchToProps)(Login);
