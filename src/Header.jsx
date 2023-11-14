import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import logoImg from "../src/assets/DROBEDOWN.png";
import ProfilePopUp from "./ProfilePopUp";
import classes from "../src/ProfilePopUp.module.css";
import store from "./Store";
import { connect } from "react-redux";
import notification  from "./assets/BellIcon.png"; 
function Header(props) {
  const navigate = useNavigate();

  const [isLogged, setIsLogged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    //console.log("Use effect",props.transfer);
  }, [props.transfer]);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, [auth]);
  //console.log(isHovered);
  const notify =()=> {
    navigate("/NotificationList")
    console.log("notifyButton");
  }
  return (
    <div>
      <nav className="bg-black pb-[30px]">
        <h2
          className="text-orange-500 font-semibold text-3xl cursor-pointer"
          onClick={() => {
            console.log("redux vlaue", props.transfer);
          
               navigate("/");
          }}
        >
          EsBookify
        </h2>
        <div className="w-[330px] h-[30px] relative flex rounded-md border border-[#ff8a01]">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent text-[#ff8a01] pl-[10px] w-[90%] placeholder:text-[#ff8a01] placeholder:pl-[2px]"
          ></input>
          <a href="#">
            <FaMagnifyingGlass className="text-[#ff8a01] pt-[7px] text-xl" />
          </a>
        </div>

            <div>
            <button 
            onClick={notify}
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className={classes.profileButton}
            >
              <img  src={notification} alt="bellIcon"/> {" "}
              </button>
            </div>

        <div className={classes.popupdiv} onMouseEnter={handleMouseEnter}>
          {isLogged && (
            <button
              data-modal-target="defaultModal"
              data-modal-toggle="defaultModal"
              className={classes.profileButton}
            >
              <img className="w-[36px]" src={logoImg} alt="logo" />{" "}
            </button>
          )}
          {isHovered && <ProfilePopUp handleMouseEnter={handleMouseLeave} />}
        </div>
        {!isLogged && (
          <button
            className="text-[#ff8a01] w-[90px] h-[30px] bg-neutral-600 font-semibold border border-[#ff8a01]"
            onClick={props.onShowLogin}
          >
            Login
          </button>
        )}
      </nav>
    </div>
  );
}
const mapStateToProps = (HomeReducer) => {
  //console.log("Cart", HomeReducer)
  return {
    transfer: HomeReducer.selectedItems.IdentifiedItem,
  };
};
export default connect(mapStateToProps, null)(Header);
