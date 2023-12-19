import React, { useEffect, useState } from 'react'
import classes from "../OrgHome.module.css";
import Org from "../OrgHome.module.css";
import imge from "../../assets/ListLogo.png";
import downloadicon from "../../assets/DownloadIcon.svg";
import shareicon from "../../assets/ShareIcon.svg";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  InstapaperIcon,
  TelegramIcon,
} from 'react-share';



function ActivePostTeamList(props) {
  const [teams, setTeams] = useState("");
  const navigate = useNavigate()
  const { user } = useUser();
  let count = 1
  const componentRef = React.useRef()
  const getRegisteredTeams = async () => {
    try {
      console.log("string", props.slotcontent.id, typeof (props.slotcontent.id));
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
  function idpclick() {
    navigate(`/SendIDP/${props.slotcontent._id}/${user.uid}`)
  }
  const handleprint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Slotlist",
    onBeforeGetContent: () => {
      const pdf = new jsPDF();

      // Set custom styles
      pdf.setTextColor(255, 99, 71); // Set text color to red
      pdf.setFontSize(16); // Set font size

      // Custom styling for the table
      const tableOptions = {
        startY: 20, // Adjust the starting position of the table
      };
      // pdf.autoTable({
      //   html: 'tableauto', // Specify your table's ID
      //   ...tableOptions,
      // });

      return pdf;
    },
  })
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const openShareModal = () => {
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };
  const handleOverlayClick = (e) => {
    // Close the modal if the overlay (black background) is clicked
    if (e.target === e.currentTarget) {
      closeShareModal();
    }
  };
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
            <button onClick={handleprint}><img src={downloadicon}></img></button>
            <img src={shareicon} onClick={openShareModal}></img>
            {isShareModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"onClick={handleOverlayClick}>
          <div className="bg-white p-8 rounded-lg items-center gap-4 flex">
            <FacebookShareButton
              url="https://your-website.com"
              quote="Check out this awesome content!"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton
              url="https://your-website.com"
              title="Check out this awesome content!"
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url="https://your-website.com"
              title="Check out this awesome content!"
            >
              <WhatsappIcon size={40} round/>
            </WhatsappShareButton>
            <InstapaperShareButton
              url="https://your-website.com"
              title="Check out this awesome content!"
            >
              <InstapaperIcon size={40} round/>
            </InstapaperShareButton>
            <TelegramShareButton
              url="https://your-website.com"
              title="Check out this awesome content!"
            >
              <TelegramIcon size={40} round/>
            </TelegramShareButton>
            </div>
            </div>
          )}
          </div>
          <table class="table-auto border-slate-50" ref={componentRef} id='tableauto'>
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