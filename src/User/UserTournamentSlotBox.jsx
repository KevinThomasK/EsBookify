import React, { useEffect, useState } from "react";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import Footer from "../Footer/Footer";
import imge from "../assets/ListLogo.png";
import { UserSlotListDetails } from "../Constant";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { storeSlotCount } from "../Redux/Action";
import { toast } from "react-toastify";
import { useAuthedRequest } from "../hooks/useAuthedRequest";


function UserTournamentSlotBox(props) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { get } = useAuthedRequest();
  const [regteam, setregteam] = useState([])
  //console.log(user.uid);
  useEffect(() => {
    const handleslot = async () => {
      try {
        const registeredTeam = await get(
          `http://localhost:4000/UserTournamentPlayerRegisterForm/${props.slotdetails._id}`,
          {}
        );
        setregteam(registeredTeam.registeredTeams)
        console.log("registeredTeam", registeredTeam);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong,Try Again Later");
      }
    }
    handleslot()

  }, [get])


  function IconUnlock(item) {
    //console.log(props.slotdetails);
    const tournamentId = props.slotdetails._id;
    console.log("itemcon", item);
    props.storeSlotCount(item)


    navigate(`/UserTournamentPlayerRegisterForm/${tournamentId}/${user.uid}`);
  }

  const TournamentTeams = async () => {
    const tournamentId = props.slotdetails._id;
    // console.log(tournamentId);
    navigate(`/UserTournamentPlayerRegisterForm/${tournamentId}`);
  };
console.log("regteam1", regteam);
  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.MainOrgList}>
          <div>
            <ul className="list-none mx-auto  flex flex-row flex-wrap  justify-center gap-10 ">
              <li
                className={classes.listbox}
                onClick={() => TournamentTeams(props.slotdetails._id)}
              >
                <img className={classes.ListLogo} src={imge} />
                <h3 className="text-2xl text-center mt-2 text-orange-500">
                  <div>{props.slotdetails.name}</div>
                </h3>
                <div className={classes.scrimlistcontet}>
                  <div className={classes.UserScrimListDateandTime}>
                    <div>{props.slotdetails.dateOfMatch}</div>
                    <div>{props.slotdetails.idpTime}</div>
                    <div>{props.slotdetails.prizePool}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={classes.mainslot}>
            {regteam.length  && regteam.map((regitem) => {
              console.log("regitem", regitem);
              UserSlotListDetails.map((item) => {

                return (
                  <div
                    key={item.content}
                    className={classes.slotbox}
                    onClick={() => IconUnlock(item)}
                  >
                    <img src="../src/assets/UnlockIcon.png" />
                    <span className =  { `${ regitem.SlotNumber==item.content ? classes.slotregbox:classes.span} `  }> {item.content}</span>
                  </div>
                );
              }
              )
            })}
            {
               UserSlotListDetails.map((item) => {

                return (
                  <div
                    key={item.content}
                    className={classes.slotbox} 
                    onClick={() => IconUnlock(item)}
                  >
                    <img src="../src/assets/UnlockIcon.png" />
                    <span className={classes.span}> {item.content}</span>
                  </div>
                );
              }
              )
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const mapStateToProps = (HomeReducer) => {
  // console.log("slotdetails", HomeReducer);
  return {
    slotdetails: HomeReducer.selectedItems.slotdetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeSlotCount: (s) => {
      dispatch(storeSlotCount(s));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserTournamentSlotBox);
