import React, { useState } from "react";
import classes from '../HomePage.module.css';
import { useNavigate } from "react-router";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Table from "../assets/Table.png"
import Activepost from "../assets/Activepost.png"
import Slider from "../Slider/Slider";
import Matches from "../Matches/Matches";
import Footer from "../Footer/Footer";
import { OrganizationHomepageSlider } from "../Slider/SliderData";

function OrganizationHomepage(props) {
 
  const navigate = useNavigate();
  return (
    <>
   
      <div className={classes.MainBackground}>
        <div className={classes.gradient}>
          <Slider SliderData={OrganizationHomepageSlider} />
          <div className={classes.headingAnimationDiv}>
            <h1 className={classes.animationHeader}>
              "JOIN THE ULTIMATE BGMI TOURNAMENTS :
              <span className={classes.animationSpan}> DAILY MATCH</span>
            </h1>
            <h1 className={classes.animationHeader}>
              NOW AVAILABLE ON OUR WEBSITE !"
            </h1>
          </div>
          <div className={classes.matchdiv}>
            <h1 className={classes.matchheading}> Manage Your Match</h1>
          </div>
          <section id="matches" class="w-9/12 mx-auto">
   
   <ul class="list-none mx-auto mt-10 flex flex-col sm:flex-row items-center gap-12">
       <li onClick={()=>{navigate("")}} class="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border border-solid rounded-md border-orange-500 hover:border-blue-500 hover:cursor-pointer">
           <img src={Table}/>
           <h3 class="text-2xl text-center mt-2 text-orange-500">Point Table</h3> 
       </li>
       <li class="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer">
       <img src={Activepost}/>
           <h3 class="text-2xl text-center mt-2 text-orange-500"><a href='#'>Active posts</a></h3> 
       </li>
       </ul>
       </section>
       <div className={classes.matchdiv}>
            <h1 className={classes.createheading}> Create Your Match</h1>
          </div>
          <div className={classes.MainList}>
            
          </div>
          <Matches isHome ={false} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrganizationHomepage;
