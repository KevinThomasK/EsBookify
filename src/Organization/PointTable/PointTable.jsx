import React from "react";
import classes from "../../HomePage.module.css";
import Org from "../OrgHome.module.css";
//import TournamentList from "../TournamentList";
import Footer from "../../Footer/Footer";
import AllGames from "./AllGames";

function OrgHome() {
  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.MainOrgList}>
          <h3 className="text-white text-2xl pt-28 pb-20">
            YOUR MATCHES <span className={classes.animationSpan}> </span>
          </h3>
        </div>
        {/* <TournamentList /> */}
        <AllGames />
      </div>
      <Footer />
    </div>
  );
}

export default OrgHome;
