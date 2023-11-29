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

const DailyMatchSlots = (props) => {
  const [teams, setTeams] = useState("");
  const [dailymatch, setDailymatch] = useState("");
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);
  let count = 1;
  const getRegisteredTeams = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/UserDailyMatchPlayerRegisterForm/${params.dailymatchId}`
      );
      const data = res.data.registeredTeams;
      setDailymatch(res);
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
              {dailymatch && (
                <li className={classes.listbox}>
                  <img
                    className={classes.ListLogo}
                    src={dailymatch.data.dailymatch.image}
                  />
                  <h3 className="text-2xl font-bold text-center mt-2 text-orange-500">
                    <div>{dailymatch.data.dailymatch.name}</div>
                  </h3>
                  <div className={classes.scrimlistcontet}>
                    <div className={classes.matchinfo}>
                      <div className="text-lg">
                        {` ${format(
                          new Date(dailymatch.data.dailymatch.dateOfMatch),
                          "MMMM dd, yyyy"
                        )} ,        ${dailymatch.data.dailymatch.idpTime}`}
                      </div>
                      <button onClick={toggleVisibility} className="text-lg">
                        Rules
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
            {dailymatch && (
              <span
                className={`${
                  isVisible ? "block" : "hidden"
                } mt-4 p-4 text-white px-20`}
              >
                <span className="text-lg text-orange-500 pr-4 font-bold">
                  Rules:
                </span>{" "}
                {dailymatch.data.dailymatch.rules}
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
                  console.log("teams_item", item);
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

export default connect(mapStateToProps, null)(DailyMatchSlots);
