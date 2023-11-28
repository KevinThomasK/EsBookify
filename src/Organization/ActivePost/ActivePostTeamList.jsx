import React, { useEffect, useState } from 'react'
import classes from "../OrgHome.module.css";
import Org from "../OrgHome.module.css";
import imge from "../../assets/ListLogo.png";
import downloadicon from "../../assets/DownloadIcon.svg";
import shareicon from "../../assets/ShareIcon.svg";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';


function ActivePostTeamList(props) {
    const [teams, setTeams] = useState("");
    const navigate = useNavigate ()
    const { user } = useUser();
    let count =1
    const getRegisteredTeams = async () => {
        try {
            console.log("string",props.slotcontent.id, typeof(props.slotcontent.id));
          const res = await axios.get(
            `http://localhost:4000${props.slotcontent.url}/${props.slotcontent._id}`
          );
          const data = res.data.registeredTeams;
          console.log("data", data);
          setTeams(data);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getRegisteredTeams();
      }, []);
      function idpclick  () {
        navigate (`/SendIDP/${props.slotcontent._id}/${user.uid}` )
      }
  return (
    
    <div className={Org.Orgbackground}>
    <div className={classes.gradient}>
      <div className={classes.tablediv}>
        <div>
          <ul className="list-none mx-auto  flex flex-row flex-wrap  justify-center gap-10 ">
            <li className={classes.listbox}>
              <img className={classes.ListLogo} src={imge} />
              <h3 className="text-2xl text-center mt-2 text-orange-500">
                <div>{props.slotcontent.name}</div>
              </h3>
              <div className={classes.scrimlistcontet}>
                <div className={classes.matchinfo}>
                  <div>
                    {` Match Starts At          ${props.slotcontent.idpTime}`}
                  </div>
                  <div> Rules </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={classes.tableheading}>
        <h4
        onClick={idpclick}>
           SEND IDP </h4>
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
   
  </div>


  )
}

export default ActivePostTeamList