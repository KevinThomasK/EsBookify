import React, { useEffect, useState } from "react";
import createTournamentPageImg from "../assets/Rectangle 25.png";
import classes from "./CreateTournament.module.css";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import useFormatTime from "../hooks/useFormatTime";
import useFormatDate from "../hooks/useFormatDate";
import useMinDate from "../hooks/useMinDate";
import { toast } from "react-toastify";
import { useAuthedRequest } from "../hooks/useAuthedRequest";
import axios from "axios";

export default function EditTournament() {
  const { put } = useAuthedRequest(); 


  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentDate: "",
    tournamentTime: "",
    prizePool: "",
    rules: "",
  });

  let minDate = useMinDate();

  const params = useParams();
 const getRegisteredTeams = async () => {
    try {
      console.log("type",params);
      const res = await axios.get(
        `http://localhost:4000/UserTournamentPlayerRegisterForm/${params.id}`
      );
      const data = res.data.tournament;
      setFormData({
        tournamentName: data.name,
        tournamentDate: data.dateOfMatch ,
        tournamentTime: data.idpTime,
        prizePool: data.prizePool,
        rules: data.rules,
      })
      console.log("data", res);
      // setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRegisteredTeams();
  }, []);
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that the "tournamentTime" field is in the 24-hour format (HH:mm)
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(formData.tournamentTime)) {
      alert("Invalid time format. Please use HH:mm format (24-hour).");
      return;
    }

    const formattedDate = formatDate(formData.tournamentDate);

    const formattedTime = formatTime(formData.tournamentTime);

    const formattedName = formData.tournamentName.trim();

    try {
      const updatedTournament = await put(
        `http://localhost:4000/tournaments/${params.tournamentId}`,
        {
          name: formattedName,
          dateOfMatch: formattedDate,
          idpTime: formattedTime,
          prizePool: formData.prizePool,
          rules: formData.rules,
        }
      );
      document.getElementById("tournamentName").value = "";
      document.getElementById("rules").value = "";
      document.getElementById("prizePool").value = "";
      document.getElementById("tournamentTime").value = "";
      document.getElementById("tournamentDate").value = "";
      toast.success("Tournament Edited Succussfully");
      return updatedTournament;
    } catch (error) {
      console.log(error);
      toast.error("Not able to Edit Tournament, Please try again later");
    }
  };

  const formatDate = useFormatDate();

  const formatTime = useFormatTime();

  return (
    <>
      <div className="bg-black relative w-full">
        <img
          className="w-[95%] mx-auto pb-10 pt-10"
          src={createTournamentPageImg}
          alt="background"
        />
        <h2 className="text-white absolute top-[45%] left-[40%] text-4xl font-bold">
          Edit <span className="text-[#ff8a01]">Tournament</span>
        </h2>
      </div>

      <h3 className="bg-black text-white px-[40%] text-3xl font-semibold pt-14">
        Fill Match Details
      </h3>
      <div className={classes.formDiv}>
        <form
          className="flex flex-col w-[40%] mx-auto bg-transparent"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4  placeholder:text-[#ff8a01] text-[#ff8a01]"
            id="tournamentName"
            type="text"
            name="tournamentName"
            value={formData.tournamentName}
            placeholder="Tournament Name"
            required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            id="tournamentDate"
            type="date"
            name="tournamentDate"
            min={minDate}
            value={formData.tournamentDate}
            placeholder="Date of Match (DD-MM-YYYY)"
            required
            onChange={handleChange}
          />

          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="time"
            id="tournamentTime"
            name="tournamentTime"
            value={formData.tournamentTime}
            placeholder="IDP Time (HH:mm)"
            required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="number"
            id="prizePool"
            min="1"
            max="1000000"
            name="prizePool"
            value={formData.prizePool}
            placeholder="Prize Pool"
            onChange={handleChange}
          />
          <textarea
            className="bg-gray-800/80 h-52 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="text"
            id="rules"
            name="rules"
            value={formData.rules}
            placeholder="Rules"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full text-[#ff8a01] bg-gray-800/80 py-4 font-bold text-3xl mb-60"
          >
            Edit Tournament
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
