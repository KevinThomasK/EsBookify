import React, { useState } from "react";
import createTournamentPageImg from "../assets/Rectangle 25.png";
import classes from "../pages/CreateTournament.module.css";
import Footer from "../Footer/Footer";
import useMinDate from "../hooks/useMinDate";
import useFormatTime from "../hooks/useFormatTime";
import useFormatDate from "../hooks/useFormatDate";
import { toast } from "react-toastify";
import { useAuthedRequest } from "../hooks/useAuthedRequest";
import { useUser } from "../hooks/useUser";

export default function CreateScrim() {
  const { user } = useUser();
  const { post } = useAuthedRequest();

  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentDate: "",
    tournamentTime: "",
    prizePool: "",
    rules: "",
  });
  const [DateType, setDateType] = useState("text");
  const [TimeType, setTimeType] = useState("text");

  let minDate = useMinDate();

  const formatDate = useFormatDate();

  const formatTime = useFormatTime();

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

    if (!user) {
      return;
    }
    try {
      const newScrim = await post(
        `http://localhost:4000/scrims/${user.uid}/scrims`,
        {
          name: formattedName,
          dateOfMatch: formattedDate,
          idpTime: formattedTime,
          prizePool: formData.prizePool,
          rules: formData.rules,
        }
      );
      toast.success("Scrim Created Successfully");
      console.log(newScrim);
    } catch (err) {
      console.log(err);
    }

    document.getElementById("tournamentName").value = "";
    document.getElementById("rules").value = "";
    document.getElementById("prizePool").value = "";
    document.getElementById("tournamentTime").value = "";
    document.getElementById("tournamentDate").value = "";
  };

  return (
    <>
      <div className="bg-black relative w-full">
        <img
          className="w-[95%] mx-auto pb-10 pt-10"
          src={createTournamentPageImg}
          alt="background"
        />
        <h2 className="text-white absolute top-[45%] left-[40%] text-4xl font-bold">
          Create <span className="text-[#ff8a01]">Scrim</span>
        </h2>
      </div>

      <h3 className="bg-black text-white px-[40%] text-3xl font-semibold pt-14">
        Fill Match Details
      </h3>
      <div className={classes.formDiv}>
        <form
          className="flex flex-col w-[33%] mx-auto bg-transparent"
          onSubmit={handleSubmit}
        >
          <input
            className="bg-gray-800/80 mb-14 px-4 py-2  placeholder:text-[#ff8a01] text-[#ff8a01]"
            id="tournamentName"
            type="text"
            name="tournamentName"
            value={formData.tournamentName}
            placeholder="Scrim Name"
            required
            onChange={handleChange}
            autoFocus
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
            id="tournamentDate"
            type={DateType}
            onFocus={(e) => setDateType("date")}
            onBlur={(e) => setDateType("text")}
            name="tournamentDate"
            min={minDate}
            value={formData.tournamentDate}
            placeholder="Date of Match"
            required
            onChange={handleChange}
          />

          <input
            className="bg-gray-800/80 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type={TimeType}
            onFocus={(e) => setTimeType("time")}
            onBlur={(e) => setTimeType("text")}
            id="tournamentTime"
            name="tournamentTime"
            value={formData.tournamentTime}
            placeholder="IDP Time "
            required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
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
            className="bg-gray-800/80 h-52 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="text"
            id="rules"
            name="rules"
            value={formData.rules}
            placeholder="Rules"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full text-[#ff8a01] bg-gray-800/80 py-3 font-bold text-2xl mb-60"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
