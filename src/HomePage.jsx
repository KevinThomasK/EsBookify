import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router";
import Slider from "./Slider/Slider";
import Matches from "./Matches/Matches";
import Footer from "./Footer/Footer";
import { SliderData } from "./Slider/SliderData";

function HomePage(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.MainBackground}>
        <div className={classes.gradient}>
          <Slider SliderData={SliderData} />
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
          <Matches isHome={true} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
