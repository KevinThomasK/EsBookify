import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import Footer from "../Footer/Footer";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import imge from "../assets/ListLogo.png";
import downloadicon from "../assets/DownloadIcon.svg";
import shareicon from "../assets/ShareIcon.svg";
import { connect } from "react-redux";
import { format } from "date-fns";

const ScrimSlots = (props) => {
  const [teams, setTeams] = useState("");
  const [scrim, setScrim] = useState("");
  const params = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const [Roomdetails, setRoomdetails] = React.useState({});
  const [ ShowIDP, setShowIDP] = useState (false)
  let count =1  
  const getRegisteredTeams = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/UserScrimPlayerRegisterForm/${params.scrimId}`
      );
      const data = res.data.registeredTeams;
      setScrim(res);

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
  const handleIDP = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/SendIDP/${params.scrimId}`
      );
      const data = res.data.tournament
      console.log("idp", data);
      setShowIDP (true)
      setRoomdetails(data)
     
      // setTeams(data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.tablediv}>
          <div>
            <ul className="list-none mx-auto  flex flex-row flex-wrap  justify-center gap-10 ">
              {scrim && (
                <li className={classes.listbox}>
                  <img
                    className={classes.ListLogo}
                    src={scrim.data.scrim.image}
                  />
                  <h3 className="text-2xl font-semibold text-center mt-2 text-orange-500">
                    <div>{scrim.data.scrim.name}</div>
                  </h3>
                  <div className={classes.scrimlistcontet}>
                    <div className={classes.matchinfo}>
                      <div className="text-lg">
                        {` ${format(
                          new Date(scrim.data.scrim.dateOfMatch),
                          "MMMM dd, yyyy"
                        )} ,        ${scrim.data.scrim.idpTime}`}
                      </div>
                      <button onClick={toggleVisibility} className="text-lg">
                        Rules
                      </button>
                    </div>
                  </div>
                  { ShowIDP ? 
                ( Roomdetails!= null && Roomdetails!= undefined) ? Object.keys(Roomdetails).length>0 ? 
                <div className={classes.roomdetails}> 
                  <div>
                    
                    Room ID: {Roomdetails.RoomID}
                  </div>
                  <div>
                    Password: {Roomdetails.Password}
                  </div>
                </div>
                : <div className=" text-orange-500"> RoomID Is Not Created </div>
                : <div className=" text-orange-500" > RoomID Is Not Created </div> : null
                }
                </li>
              )}
            </ul>
            {scrim && (
              <span
                className={`${
                  isVisible ? "block" : "hidden"
                } mt-4 p-4 text-white px-20`}
              >
                <span className="text-lg text-orange-500 pr-6">Rules:</span>{" "}
                {scrim.data.scrim.rules}
              </span>
            )}
          </div>
          <div className={classes.tableheading}>

          <h4 onClick={handleIDP}> VIEW IDP</h4>
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
                  return (
                    <tr key={item._id}>
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
export default connect(mapStateToProps, null)(ScrimSlots);
