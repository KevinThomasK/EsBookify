import React from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Slider from "./Slider/Slider";
import Matches from "./Matches/Matches";
import Footer from "./Footer/Footer";

function HomePage(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.MainBackground}>
        <div className={classes.gradient}>
          <Slider />
          <div className={classes.headingAnimationDiv}>
            <h1 className={classes.animationHeader}>
              "JOIN THE ULTIMATE BGMI TOURNAMENTS :
              <span className={classes.animationSpan}> DAILY MATCH</span>
            </h1>
            <h1 className={classes.animationHeader}>
              NOW AVAILABLE ON OUR WEBSITE !"
            </h1>
          </div>
          <div className={classes.MainList}>
            <h3 className={classes.TournamentHeading}>
              START YOUR <span className={classes.animationSpan}> BATTLE</span>
            </h3>
          </div>
          <Matches />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
