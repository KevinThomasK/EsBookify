import React from "react";
import { useNavigate } from "react-router";

function Matches(props) {
  const navigate = useNavigate();
  // console.log("isHome", props.isHome);
  return (
    <section id="matches" className="w-9/12 mx-auto">
      <ul className="list-none mx-auto mt-10 flex flex-col sm:flex-row items-center gap-12">
        <li
          onClick={() => {
            navigate("/create-tournament");
          }}
          className="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border border-solid rounded-md border-orange-500 hover:border-blue-500 hover:cursor-pointer"
        >
          <h3 className="text-2xl text-center mt-2 text-orange-500 ">
            TOURNAMENTS
          </h3>
        </li>
        <li
          onClick={() => {
            props.isHome ? navigate("/UserScrimList") :  navigate("/OrgCreateScrims")
          }}
          className="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer"
        >
          <h3 className="text-2xl text-center mt-2 text-orange-500 ">
            <a href="#">SCRIMS</a>
          </h3>
        </li>
      </ul>
      <ul className="list-none pb-32 mx-auto mt-10 flex flex-col sm:flex-row items-center gap-8">
        <li
          onClick={() => {
            props.isHome ? navigate("/UserDailyMatch") :navigate("/OrgCreateDailyMatch")
          }}
          className="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer"
        >
          <h3 className="text-2xl text-center mt-2 text-orange-500 ">
            <a href="#">DAILY MATCH</a>
          </h3>
        </li>
        <li
          onClick={() => {
            props.isHome ? navigate("/UserOpenRoom") : navigate("/OrgCreateOpenRoom")
          }}
          className="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer"
        >
          <h3 className="text-2xl text-center mt-2 text-orange-500 ">
            <a href="#">OPEN ROOMS</a>
          </h3>
        </li>
      </ul>
    </section>
  );

 
}

export default Matches;
