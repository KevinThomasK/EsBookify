import React from "react";
import MyTournaments from "./MyTournaments";
import MyScrims from "./MyScrims";
import MyDailyMatches from "./MyDailyMatches";
import MyOpenRooms from "./MyOpenRooms";

const AllGames = () => {
  return (
    <div className="flex px-10 flex-wrap justify-center">
      <MyTournaments />
      <MyScrims />
      <MyDailyMatches />
      <MyOpenRooms />
    </div>
  );
};

export default AllGames;
