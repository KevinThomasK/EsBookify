import React from "react";
import { useNavigate } from "react-router";
import { TournamentListDetails } from "../Constant";
import Footer from "../Footer/Footer";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import home from "../HomePage.module.css";
import { allOpenRooms } from "../api-Helpers/api-helpers";
import imge from "../assets/ListLogo.png";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { storeSlotdetails } from "../Redux/Action";

function UserOpenRoom(props) {
  const navigate = useNavigate();

  const [openRoom, setOpenRoom] = useState();

  useEffect(() => {
    allOpenRooms()
      .then((data) => setOpenRoom(data))
      .catch((err) => console.log(err));
  }, []);

  function ToRegister(item) {
    console.log("registerButton");
    props.storeSlotdetails(item);
    navigate("/UserOpenRoomSlotBox");
  }

  return (
    <div className={Org.Orgbackground}>
      <div className={home.gradient}>
        <div className={home.MainOrgList}>
          <h3 className={home.TournamentOrgHeading}>
            OPEN-ROOMS <span className={home.animationSpan}> </span>
          </h3>
        </div>

        <section id="matches" className=" mx-auto">
          <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
            {openRoom &&
              openRoom.map((item) => {
                return (
                  <li key={item._id} className={classes.listbox}>
                    <img className={classes.ListLogo} src={item.image} />
                    <h3 className="text-2xl text-center font-semibold mt-2 text-orange-500">
                      <div>{item.name}</div>
                    </h3>
                    <div className={classes.scrimlistcontet}>
                      <div className={classes.UserScrimListDateandTime}>
                        {item.dateOfMatch} {item.idpTime}
                      </div>
                      <button
                        className=" text-center font-bold mt-2 text-xl text-orange-500"
                        onClick={() => ToRegister(item)}
                      >
                        Register
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeSlotdetails: (s) => {
      dispatch(storeSlotdetails(s));
    },
  };
};

export default connect(null, mapDispatchToProps)(UserOpenRoom);
