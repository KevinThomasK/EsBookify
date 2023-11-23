import React from "react";
import classes from "./AddPoints.module.css";

const AddPointsComponent = () => {
  return (
    <div className={classes.Mainbackground}>
      <div className={classes.gradient}>
        <div className="text-white mb-6 px-6 py-4 text-lg border border-solid border-orange-500 w-1/2 rounded-md">
          <h6>Format:</h6>
          <h6>{"<Rank> = <Place Points>"}</h6>
          <h6>Rank can be a Singular number or a range.</h6>
          <h6 className="text-red-600">Separate using commas</h6>
          <h6>example</h6>
          <h6>1=20,</h6>
          <h6>2=14,</h6>
          <h6>3-5 =10</h6>
          <h6>Here from 6th, everyone will get 0</h6>
        </div>
        <div className="mb-12 px-4">
          <h4 className="text-white">We have added latest point system</h4>
          <h4 className="text-white">Feel free to modify as you please.</h4>
        </div>
        <div className="text-orange-500   text-2xl border border-solid border-orange-500 w-1/3 px-5 py-4 ">
          <h6>1=15,</h6>
          <h6>2=12,</h6>
          <h6>3=10,</h6>
          <h6>4=7,</h6>
          <h6>5=6,</h6>
        </div>
      </div>
    </div>
  );
};

export default AddPointsComponent;
