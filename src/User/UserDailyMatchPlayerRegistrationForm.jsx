import React, { useState } from "react";
import classes from "../pages/CreateTournament.module.css";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthedRequest } from "../hooks/useAuthedRequest";

const UserDailyMatchPlayerRegisterForm = () => {
  const { post } = useAuthedRequest();
  const params = useParams();

  const [teamdata, setTeamData] = useState({
    TeamName: "",
    Teamtag: "",
    Player1: "",
    Player2: "",
    Player3: "",
    Player4: "",
    Player5: "",
  });

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
        `http://localhost:4000/UserDailyMatchPlayerRegisterForm/${params.dailymatchId}/${params.userId}`,
        {
          TeamName: teamdata.TeamName,
          TeamTag: teamdata.Teamtag,
          Player1: teamdata.Player1,
          Player2: teamdata.Player2,
          Player3: teamdata.Player3,
          Player4: teamdata.Player4,
          Player5: teamdata.Player5,
        }
      );
      document.getElementById("TeamName").value = "";
      document.getElementById("Teamtag").value = "";
      document.getElementById("Player1").value = "";
      document.getElementById("Player2").value = "";
      document.getElementById("Player3").value = "";
      document.getElementById("Player4").value = "";
      document.getElementById("Player5").value = "";
      toast.success("Registered Tournament Succussfully");
      return registeredTeam;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,Try Again Later");
    }
  };

  return (
    <>
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
            id="TeamName"
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
            id="Teamtag"
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
            id="Player1"
            name="Player1"
            value={teamdata.Player1}
            placeholder="P-1 InGame Name"
            required
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="Player2"
            name="Player2"
            value={teamdata.Player2}
            placeholder="P-2 InGame Name"
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="Player3"
            name="Player3"
            value={teamdata.Player3}
            placeholder="P-3 InGame Name"
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="Player4"
            name="Player4"
            value={teamdata.Player4}
            placeholder="P-4 InGame Name"
            onChange={handleChange}
          />
          <input
            className="bg-zinc-900 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01] font-bold"
            type="text"
            id="Player5"
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

export default UserDailyMatchPlayerRegisterForm;
