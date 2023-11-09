import React from "react";
import classes from "../src/ProfilePopUp.module.css";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

function ProfilePopUp(props) {
  const navigate = useNavigate();
  const auth = getAuth();

  function onLogout() {
    auth.signOut();
    toast.error("Logged out");
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    localStorage.setItem("loginDetails" , "user")
    navigate("/");
  }
  return (
    <div
      onMouseLeave={props.handleMouseEnter}
      className={`${classes.popup}  item-baseline flex overflow-x-hidden overflow-y-auto absolute inset-0 z-50 outline-none focus:outline-none `}
    >
      {/*content*/}
      <div className=" z-55 border-0 rounded-lg shadow-lg  flex flex-col w-full bg-black outline-none focus:outline-none">
        {/*header*/}
        {/* <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                           
                            
                        </div> */}
        {/*body*/}

        <ul className={classes.popuptext}>
          <li
            className={classes.popuplist}
            onClick={() => {
              navigate("/Organization");
            }}
          >
            <img src="../src/assets/YourmatchesIcon.png" />
            Your Matches
          </li>
          <li
            className={classes.popuplist}
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img src="../src/assets/EditProfileicon.png" />
            Edit Profile
          </li>
          <li className={classes.popuplist} onClick={onLogout}>
            <img src="../src/assets/LogoutIcon.png" />
            Logout
          </li>
          <li className={classes.popuplist}>
            <img src="../src/assets/ContactIcon.png" />
            Contact
          </li>
          <li className={classes.popuplist}>
            <img src="../src/assets/FaqIcon.png" />
            FAQ
          </li>
          <li className={classes.popuplist}>
            <img src="../src/assets/AboutIcon.png" />
            About
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePopUp;
