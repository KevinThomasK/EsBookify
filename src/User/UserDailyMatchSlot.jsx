import React from "react";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import Footer from "../Footer/Footer";
import imge from "../assets/ListLogo.png";
import { UserTournamentSlotList } from "../Constant";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";

function UserDailyMatchSlotBox(props) {
  const navigate = useNavigate();
  const { user } = useUser();
  function IconUnlock(item) {
    const dailymatchId = props.slotdetails._id;
    navigate(`/UserDailyMatchPlayerRegisterForm/${dailymatchId}/${user.uid}`);
  }

  const DailyMatchTeams = async () => {
    const dailymatchId = props.slotdetails._id;
    navigate(`/UserDailyMatchPlayerRegisterForm/${dailymatchId}`);
  };

  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.MainOrgList}>
          <ul className="list-none mx-auto  flex flex-row flex-wrap  justify-center gap-10 ">
            <li
              className={classes.listbox}
              onClick={() => DailyMatchTeams(props.slotdetails._id)}
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

          <div className={classes.mainslot}>
            {UserTournamentSlotList.map((item) => {
              return (
                <div
                  className={classes.slotbox}
                  onClick={(item) => IconUnlock(item)}
                >
                  <img src="../src/assets/UnlockIcon.png" />
                  <span className={classes.span}> {item.content}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const mapStateToProps = (HomeReducer) => {
  console.log("slotdetails", HomeReducer);
  return {
    slotdetails: HomeReducer.selectedItems.slotdetails,
  };
};
export default connect(mapStateToProps, null)(UserDailyMatchSlotBox);
