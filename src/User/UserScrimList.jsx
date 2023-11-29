import React from "react";
import { useNavigate } from "react-router";
import { TournamentListDetails } from "../Constant";
import Footer from "../Footer/Footer";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import home from "../HomePage.module.css";
import { allScrims } from "../api-Helpers/api-helpers";
import imge from "../assets/ListLogo.png";
import { useState } from "react";
import { useEffect } from "react";
import { storeSlotdetails } from "../Redux/Action";
import { connect } from "react-redux";

function UserScrimList(props) {
  const navigate = useNavigate();

  const [scrims, setScrims] = useState();

  useEffect(() => {
    allScrims()
      .then((data) => setScrims(data))
      .catch((err) => console.log(err));
  }, []);

  function ToRegister(item) {
    console.log("registerButton");
    props.storeSlotdetails(item);
    navigate("/UserScrimSlotBox");
  }

  return (
    <div className={Org.Orgbackground}>
      <div className={home.gradient}>
        <div className={home.MainOrgList}>
          <h3 className={home.TournamentOrgHeading}>
            SCRIMS <span className={home.animationSpan}> </span>
          </h3>
        </div>

        <section id="matches" className=" mx-auto">
          <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
            {scrims &&
              scrims.map((item) => {
                return (
                  <li key={item._id} className={classes.listbox}>
                    <img className={classes.ListLogo} src={item.image} />
                    <h3 className="text-2xl font-semibold text-center mt-2 text-orange-500">
                      <div>{item.name}</div>
                    </h3>
                    <div className={classes.scrimlistcontet}>
                      <div className={classes.UserScrimListDateandTime}>
                        {item.dateOfMatch} {item.idpTime}
                      </div>
                      <button
                        className=" text-center mt-2 text-lg text-orange-500"
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

export default connect(null, mapDispatchToProps)(UserScrimList);
