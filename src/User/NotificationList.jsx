import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { allTournaments } from "../api-Helpers/api-helpers";
import Footer from "../Footer/Footer";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import home from "../HomePage.module.css";
import imge from "../assets/ListLogo.png";
import { storeSlotdetails } from "../Redux/Action";
import { connect } from "react-redux";
import { useUser } from "../hooks/useUser";
import { useAuthedRequest } from "../hooks/useAuthedRequest";

function NotificationList(props) {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState();
  const params = useParams();
  console.log("paramss", params);
  // useEffect(() => {
  //   allTournaments()
  //     .then((data) => setTournaments(data))
  //     .catch((err) => console.log(err));
  // }, []);
  const { user } = useUser();
  const { isReady, get, del } = useAuthedRequest();
  useEffect(() => {
    console.log("tournament", tournaments);
  }, [tournaments]);

  useEffect(() => {
    let NotificationList = [];
    const loadtournament = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/UserTournamentPlayerRegisterForm/`
        );

        console.log("myTournaments", myTournaments);
        const value = myTournaments.tournament.filter(
          (item) => item.createdBy == localStorage.getItem("UID")
        );
        NotificationList.push(...value);
        loadscrim();

        console.log("value", value);
        // setTournaments(value);
        console.log(myTournaments);
      } catch (error) {
        console.log(error);
      }
    };

    const loadscrim = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/UserScrimPlayerRegisterForm/`
        );

        console.log("myTournaments_Scrim", myTournaments);
        const value = myTournaments.tournament.filter(
          (item) => item.createdBy == localStorage.getItem("UID")
        );
        NotificationList.push(...value);
        console.log("NotificationList", NotificationList);
        // setTournaments(value);
        loaddailymatch();
        console.log(myTournaments);
      } catch (error) {
        console.log(error);
      }
    };

    const loaddailymatch = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/UserDailyMatchPlayerRegisterForm/`
        );

        console.log("myTournaments_Scrim", myTournaments);
        const value = myTournaments.tournament.filter(
          (item) => item.createdBy == localStorage.getItem("UID")
        );
        NotificationList.push(...value);
        console.log("NotificationList", NotificationList);
        // setTournaments(value);
        loadopenroom();
        console.log(myTournaments);
      } catch (error) {
        console.log(error);
      }
    };

    const loadopenroom = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/UserOpenRoomPlayerRegisterForm/`
        );

        console.log("myTournaments_Scrim", myTournaments);
        const value = myTournaments.tournament.filter(
          (item) => item.createdBy == localStorage.getItem("UID")
        );
        NotificationList.push(...value);
        const uniquearray = [...new Set(NotificationList)];
        console.log("NotificationList", NotificationList);
        setTournaments(uniquearray);
        console.log(myTournaments);
      } catch (error) {
        console.log(error);
      }
    };

    if (user && isReady) {
      loadtournament();
      loadscrim();
      // loaddailymatch();
      // loadopenroom();
    }
  }, [user, get, isReady]);

  function ToRegister(item) {
    // console.log("item", item);
    props.storeSlotdetails(item);
    navigate("/UserTournamentSlotBox");
  }

  return (
    <div className={Org.Orgbackground}>
      <div className={home.gradient}>
        <div className={home.MainOrgList}>
          <h3 className={home.TournamentOrgHeading}>
            NOTIFICATIONS <span className={home.animationSpan}> </span>
          </h3>
        </div>

        <section id="matches" className=" mx-auto">
          <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
            {tournaments &&
              tournaments.map((item) => {
                return (
                  <li
                    className={classes.listbox}
                    // onClick={() => {
                    //   navigate("      ");
                    // }}
                  >
                    <img className={classes.ListLogo} src={imge} />
                    <h3 className="text-2xl text-center mt-2 text-orange-500">
                      <div>{item.TournamentName}</div>
                      <div>{item.ScrimName}</div>
                      <div>{item.DailyMatchName}</div>
                      <div>{item.OpenRoomName}</div>
                    </h3>
                    <div className={classes.scrimlistcontet}>
                      <div className={classes.UserScrimListDateandTime}>
                        Your Slot Is Ready
                      </div>
                      {/* <div className=" text-center mt-2 text-orange-500">
                        <button onClick={() => ToRegister(item)}>
                          {" "}
                          Register{" "}
                        </button>
                      </div> */}
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeSlotdetails: (s) => {
      dispatch(storeSlotdetails(s));
    },
  };
};

export default connect(null, mapDispatchToProps)(NotificationList);
