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
import downloadicon from "../assets/DownloadIcon.svg"
import shareicon from "../assets/ShareIcon.svg"




const OpenRoomSlots = (props) => {
  const [teams, setTeams] = useState("");
  const params = useParams();
  const [Roomdetails, setRoomdetails] = React.useState({});
  const [ ShowIDP, setShowIDP] = useState (false)
  let count = 1
  const getRegisteredTeams = async () => {

    try {
      const res = await axios.get(
        `http://localhost:4000/UserOpenRoomPlayerRegisterForm/${params.openroomId}`
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
  const handleIDP = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/SendIDP/${params.openroomId}`
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
  console.log("Teams", teams);
  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.tablediv}>
          <div>
            <ul className="list-none mx-auto  flex flex-row flex-wrap  justify-center gap-10 ">
              <li
                className={classes.listbox}

              >
                <img className={classes.ListLogo} src={imge} />
                <h3 className="text-2xl text-center mt-2 text-orange-500">
                  <div>{props.slotdetails.name}</div>
                </h3>
                <div className={classes.scrimlistcontet}>
                  <div className={classes.matchinfo}>


                    <div>
                      {`Match Starts At ${props.slotdetails.idpTime}`}</div>
                    <div> Rules </div>
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
                : <div className=" text-orange-500" > RoomID Is Not Created</div> : null
                }
                {/* {Roomdetails.RoomID && <div className={classes.roomdetails}>
                  <div>
                    Room ID: {Roomdetails.RoomID}
                  </div>
                  <div>
                    Password: {Roomdetails.Password}
                  </div>
                </div>
                } */}
              </li>
            </ul>
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
                <th>
                  SLOTS
                </th>
                <th>
                  TEAMS
                </th>
              </tr>

            </thead>
            <tbody class='text-orange-500'>
              {teams.length && teams.map((item) => {
                console.log("teams_item", item);
                return <tr>
                  <td>
                    {count++}
                  </td>
                  <td>
                    {item.TeamName}
                  </td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />


    </div>
  )

};

const mapStateToProps = (HomeReducer) => {
  console.log("slotdetails", HomeReducer);
  return {
    slotdetails: HomeReducer.selectedItems.slotdetails,
  };
};

export default connect(mapStateToProps, null)(OpenRoomSlots);
