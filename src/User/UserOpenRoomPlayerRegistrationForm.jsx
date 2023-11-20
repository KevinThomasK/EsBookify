import React, { useState } from "react";
import banner from "../assets/CreateScrim.png";
import classes from "../pages/CreateTournament.module.css";
import useMinDate from "../hooks/useMinDate";
import useFormatTime from "../hooks/useFormatTime";
import useFormatDate from "../hooks/useFormatDate";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";      
import { useAuthedRequest } from "../hooks/useAuthedRequest";
import { connect } from "react-redux";

const UserOpenRoomPlayerRegisterForm = (props) => {
  const { post } = useAuthedRequest();
  const params = useParams();
  const navigate= useNavigate ()
console.log("params", params);
  const [teamdata, setTeamData] = useState({
    TeamName: "",
    Teamtag: "",
    Player1: "",
    Player2: "",
    Player3: "",
    Player4: "",
    Player5: "",
  });

  let minDate = useMinDate();

  const formatDate = useFormatDate();

  const formatTime = useFormatTime();

  const handleChange = (e) => {
    setTeamData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      const registeredTeam = await post(
        `http://localhost:4000/UserOpenRoomPlayerRegisterForm/${params.openroomid}/${params.userId}`,
        {
          TeamName: teamdata.TeamName,
          TeamTag: teamdata.Teamtag,
          Player1: teamdata.Player1,
          Player2: teamdata.Player2,
          Player3: teamdata.Player3,
          Player4: teamdata.Player4,
          Player5: teamdata.Player5,
          OpenRoomName: props.slotdetails.name,
          OpenRoomDate: props.slotdetails.dateOfMatch,
          SlotNumber:props.SlotCount.content

        }
      );
    // newScrims({
    //     ...scrimsData,
    //     scrimsDate: formattedDate,
    //     scrimsTime: formattedTime,
    //     scrimsName: formattedName,
    // })
    //     .then((res) => console.log(res))
    //     .catch((err) => toast.error("something went wrong"));
    // console.log("hi there");

    setTeamData({
      TeamName: "",
      Teamtag: "",
      Player1: "",
      Player2: "",
      Player3: "",
      Player4: "",
      Player5: "",
    });

    toast.success("Registered Tournament Succussfully");
    console.log("registerTeam" , registeredTeam);
    navigate("/UserDailyMatchSlotBox")
    return registeredTeam;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong,Try Again Later");
  }


  };

  return (
    <>
      {/* <div className="bg-black relative w-full">
                <img
                    className="w-[95%] mx-auto pb-10 pt-10"
                    src={banner}
                    alt="background"
                />
                <h2 className="text-white absolute top-[45%] left-[40%] text-4xl font-bold">
                    Create <span className="text-[#ff8a01]">Scrims</span>
                </h2>
            </div> */}

      <h3 className="bg-black text-white px-[40%] text-3xl font-semibold pt-14">
        Fill Team Details
      </h3>
      <div className={classes.formplayer}>
        <form
          className="flex flex-col w-[33%] mx-auto bg-transparent"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-zinc-900 mb-14 px-4 py-2  placeholder:text-[#ff8a01] text-[#ff8a01] font-bold"
            id="scrimsName"
            type="text"
            name="TeamName"
            value={teamdata.TeamName}
            placeholder="Team Name"
            required
            onChange={handleChange}
            autoFocus
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            id="scrimsDate"
            type="text"
            name="Teamtag"
            value={teamdata.Teamtag}
            placeholder="Team Tag"
            required
            onChange={handleChange}
          />

          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="scrimsTime"
            name="Player1"
            value={teamdata.Player1}
            placeholder="P-1 InGame Name"
            required
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="scrimsPrize"
            name="Player2"
            value={teamdata.Player2}
            placeholder="P-2 InGame Name"
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="scrimsPrize"
            name="Player3"
            value={teamdata.Player3}
            placeholder="P-3 InGame Name"
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="scrimsPrize"
            name="Player4"
            value={teamdata.Player4}
            placeholder="P-4 InGame Name"
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="scrimsPrize"
            name="Player5"
            value={teamdata.Player5}
            placeholder="IP-5 InGame Name"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full text-[#ff8a01] bg-zinc-800 py-3 font-bold text-2xl mb-20"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (HomeReducer) => {
  console.log("slotdetails", HomeReducer);
  return {
    slotdetails: HomeReducer.selectedItems.slotdetails,
    SlotCount: HomeReducer.selectedItems.SlotCount,
  };
};


export default connect (mapStateToProps, null) (UserOpenRoomPlayerRegisterForm);
