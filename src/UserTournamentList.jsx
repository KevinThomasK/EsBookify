import React from "react";
import classes from "./HomePage.module.css";
import Org from "./Organization/OrgHome.module.css";
import TournamentList from "./Organization/TournamentList";
import Footer from "./Footer/Footer";
function UserTournamentList() {
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

export default UserTournamentList;
