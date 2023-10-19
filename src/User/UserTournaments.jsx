import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TournamentListDetails } from "../Constant";
import Footer from "../Footer/Footer";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import home from "../HomePage.module.css";
import imge from "../assets/ListLogo.png";

function UserTournaments() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState();

  // useEffect(() => {
  //   allTournaments()
  //     .then((data) => setTournaments(data))
  //     .catch((err) => console.log(err));
  // }, []);

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
                  <li
                    className={classes.listbox}
                    onClick={() => {
                      navigate("      ");
                    }}
                  >
                    <img className={classes.ListLogo} src={imge} />
                    <h3 className="text-2xl text-center mt-2 text-orange-500">
                      <div>{item.name}</div>
                    </h3>
                    <div className={classes.scrimlistcontet}>
                      <div className={classes.UserScrimListDateandTime}>
                        {item.dateOfMatch} {item.idpTime}
                      </div>
                      <div className=" text-center mt-2 text-orange-500">
                        Register
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

export default UserTournaments;
