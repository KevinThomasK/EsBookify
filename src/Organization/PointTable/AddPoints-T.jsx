import React from "react";
import Footer from "../../Footer/Footer";
import AddPointsComponent from "./AddPointsComponent";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useAuthedRequest } from "../../hooks/useAuthedRequest";
import axios from "axios";

const AddPointsT = () => {
  const params = useParams();

  const { put } = useAuthedRequest();
  const [teamdata, setTeamData] = useState({
    TeamName: "",
    TeamRank: "",
    TeamKills: "",
  });

  const handleChange = (e) => {
    setTeamData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let TeamRankPoints;
      if (teamdata.TeamRank == 1) {
        TeamRankPoints = 15;
      } else if (teamdata.TeamRank == 2) {
        TeamRankPoints = 12;
      } else if (teamdata.TeamRank == 3) {
        TeamRankPoints = 10;
      } else if (teamdata.TeamRank == 4) {
        TeamRankPoints = 7;
      } else if (teamdata.TeamRank == 5) {
        TeamRankPoints = 6;
      } else {
        TeamRankPoints = 0;
      }
      const updatedTeamDetails = await put(
        `http://localhost:4000/UserTournamentPlayerRegisterForm/${params.tId}`,
        {
          TeamName: teamdata.TeamName,
          TeamRank: teamdata.TeamRank,
          TeamRankPoints,
          TeamKills: teamdata.TeamKills,
          TeamKillPoints: teamdata.TeamKills,
        }
      );
      document.getElementById("TeamName").value = "";
      document.getElementById("TeamKills").value = "";
      window.location.reload();
      return updatedTeamDetails;
    } catch (error) {
      console.log(error);
    }
  };

  const [teams, setTeams] = useState("");

  let count = 1;
  const getRegisteredTeams = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/UserTournamentPlayerRegisterForm/${params.tId}`
      );
      const data = res.data.registeredTeams;
      console.log(data);
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRegisteredTeams();
  }, []);

  return (
    <>
      <AddPointsComponent />

      {/* team lists table */}
      <div className="bg-black pb-24 pt-8 px-24">
        <table class="table-auto border-slate-50 w-full">
          <thead class="text-slate-50">
            <tr>
              <th className="py-4">#</th>
              <th>TEAMS</th>
              <th>Place Points</th>
              <th>Kill Points</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody class="text-orange-500">
            {teams.length &&
              teams.map((item) => {
                //console.log("teams_item", item);
                return (
                  <tr>
                    <td className="py-4">{count++}</td>
                    <td>{item.TeamName}</td>
                    <td>{item.TeamRankPoints}</td>
                    <td>{item.TeamKillPoints}</td>
                    <td>{item.TeamTotal}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="bg-black pb-24 pt-8  px-[40%]">
        <form onSubmit={handleSubmit}>
          <input
            className="bg-zinc-900 mb-6 px-5 py-2 w-[400px] placeholder:text-orange-500 text-[#ff8a01] font-bold"
            type="text"
            placeholder="Search Team Name"
            name="TeamName"
            id="TeamName"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            className="bg-zinc-900 mb-6 px-5 py-2 w-[400px] placeholder:text-orange-500 text-[#ff8a01] font-bold"
            type="number"
            placeholder="Team Rank"
            name="TeamRank"
            id="TeamRank"
            min="1"
            max="25"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            className="bg-zinc-900 mb-14 px-5 py-2 w-[400px] placeholder:text-orange-500 text-[#ff8a01] font-bold"
            type="number"
            placeholder="No. of Kills"
            name="TeamKills"
            id="TeamKills"
            onChange={handleChange}
            required
            autoFocus
          />
          <button
            type="submit"
            className="text-orange-500 w-fit bg-transparent py-3 font-bold text-lg mb-20 px-32"
          >
            ADD
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default AddPointsT;
