import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import Org from "../Organization/OrgHome.module.css";
import Footer from "../Footer/Footer";
import classes from "../Organization/OrgHome.module.css";
import { connect } from "react-redux";
import imge from "../assets/ListLogo.png";
import downloadicon from "../assets/DownloadIcon.svg";
import shareicon from "../assets/ShareIcon.svg";
import { format } from "date-fns";

const TournamentSlots = (props) => {
  const [teams, setTeams] = useState("");
  const [tournament, setTournament] = useState("");
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);
  let count = 1;
  const getRegisteredTeams = async () => {
    try {
      console.log("type", params.tournamentId, typeof params.tournamentId);
      const res = await axios.get(
        `http://localhost:4000/UserTournamentPlayerRegisterForm/${params.tournamentId}`
      );
      const data = res.data.registeredTeams;
      setTournament(res);
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRegisteredTeams();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.tablediv}>
          <div>
            <ul className="list-none mx-auto  flex flex-row flex-wrap  justify-center gap-10 ">
              {tournament && (
                <li className={classes.listbox}>
                  <img
                    className={classes.ListLogo}
                    src={tournament.data.tournament.image}
                  />
                  <h3 className="text-2xl font-bold text-center mt-2 text-orange-500">
                    <div>{tournament.data.tournament.name}</div>
                  </h3>
                  <div className={classes.scrimlistcontet}>
                    <div className={classes.matchinfo}>
                      <div className="text-lg">
                        {` ${format(
                          new Date(tournament.data.tournament.dateOfMatch),
                          "MMMM dd, yyyy"
                        )} ,        ${tournament.data.tournament.idpTime}`}
                      </div>
                      <button onClick={toggleVisibility} className="text-lg">
                        Rules
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
            {tournament && (
              <span
                className={`${
                  isVisible ? "block" : "hidden"
                } mt-4 p-4 text-white px-20`}
              >
                <span className="text-lg text-orange-500 pr-4 font-bold">
                  Rules:
                </span>{" "}
                {tournament.data.tournament.rules}
              </span>
            )}
          </div>
          <div className={classes.tableheading}>
            <h4> SLOT LIST </h4>
            <img src={downloadicon}></img>
            <img src={shareicon}></img>
          </div>
          <table class="table-auto border-slate-50">
            <thead class="text-slate-50">
              <tr>
                <th>SLOTS</th>
                <th>TEAMS</th>
              </tr>
            </thead>
            <tbody class="text-orange-500">
              {teams.length &&
                teams.map((item) => {
                  //console.log("teams_item", item);
                  return (
                    <tr>
                      <td>{count++}</td>
                      <td>{item.TeamName}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (HomeReducer) => {
  console.log("slotdetails", HomeReducer);
  return {
    slotdetails: HomeReducer.selectedItems.slotdetails,
  };
};

export default connect(mapStateToProps, null)(TournamentSlots);
