import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { allTournaments } from "../api-Helpers/api-helpers";
import Footer from "../Footer/Footer";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import home from "../HomePage.module.css";
import imge from "../assets/ListLogo.png";
import { storeSlotdetails } from "../Redux/Action";
import { connect } from "react-redux";

function UserTournaments(props) {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState();

  useEffect(() => {
    allTournaments()
      .then((data) => setTournaments(data))
      .catch((err) => console.log(err));
  }, []);

  function ToRegister(item) {
    // console.log("item", item);
    props.storeSlotdetails(item);
    navigate("/UserTournamentSlotBox");
  }

  return (
    <div className={Org.Orgbackground}>
      <div className={home.gradient}>
        <div className={home.MainOrgList}>
          <h3 className={home.TournamentOrgHeading}>
            TOURNAMENTS <span className={home.animationSpan}> </span>
          </h3>
        </div>

        <section id="matches" className=" mx-auto">
          <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
            {tournaments &&
              tournaments.map((item) => {
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
                      <div className=" text-center mt-2 text-lg text-orange-500">
                        <button onClick={() => ToRegister(item)}>
                          {" "}
                          Register{" "}
                        </button>
                      </div>
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

export default connect(null, mapDispatchToProps)(UserTournaments);
