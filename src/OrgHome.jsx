import React from "react";
import classes from "./HomePage.module.css";
import Matches from "./Matches/Matches";
import Slider from "./Slider/Slider";
import Org from "../src/OrgHome.module.css";
import TournamentList from "./Organization/TournamentList";
import Footer from "./Footer/Footer";
function OrgHome() {
  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.MainOrgList}>
          <h3 className={classes.TournamentOrgHeading}>
            TOURNAMENT <span className={classes.animationSpan}> </span>
          </h3>
        </div>
        <TournamentList />
      </div>
      <Footer />
    </div>
  );
}

export default OrgHome;
