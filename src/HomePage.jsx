import React, { useEffect, useState } from "react";
import classes from "./HomePage.module.css";
import { useNavigate } from "react-router";
import Slider from "./Slider/Slider";
import Matches from "./Matches/Matches";
import Footer from "./Footer/Footer";
import { SliderData } from "./Slider/SliderData";
import { connect } from "react-redux";
import Table from "./assets/Table.png";
import Activepost from "./assets/Activepost.png";


function HomePage(props) {
  const navigate = useNavigate();
  let loginDetails =window.localStorage.getItem("loginDetails")
  console.log("loginDetails",loginDetails);
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
            {loginDetails=="user" ?
              <h3 className={classes.TournamentHeading}>
                START YOUR <span className={classes.animationSpan}> BATTLE</span>
              </h3> :
              <div>
                <div className={classes.matchdiv}>
                  <h1 className={classes.matchheading}> Manage Your Match</h1>
                </div>
                <section id="matches" className="w-9/12 mx-auto">
                  <ul className="list-none mx-auto mt-10 flex flex-col sm:flex-row items-center gap-12">
                    <li
                      onClick={() => {
                        navigate("");
                      }}
                      className="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border border-solid rounded-md border-orange-500 hover:border-blue-500 hover:cursor-pointer"
                    >
                      <img src={Table} />
                      <h3 className="text-2xl text-center mt-2 text-orange-500">
                        Point Table
                      </h3>
                    </li>
                    <li className="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer">
                      <img src={Activepost} />
                      <h3 className="text-2xl text-center mt-2 text-orange-500">
                        <a href="#">Active posts</a>
                      </h3>
                    </li>
                  </ul>
                </section>
                <h1 className={classes.createheading}> Create Your Match</h1>
              </div>}
          </div>
          <Matches isHome={ loginDetails=="user" ?  true :false}  />
        </div>
      </div>
      <Footer />
    </>
  );
}


const mapStateToProps = (HomeReducer) => {
  //console.log("Cart", HomeReducer)
  return {
    transfer: HomeReducer.selectedItems.IdentifiedItem,
  };
};

export default connect(mapStateToProps, null)(HomePage);

