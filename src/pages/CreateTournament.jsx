import React, { useState } from "react";
import createTournamentPageImg from "../assets/Rectangle 25.png";
import classes from "./CreateTournament.module.css";
import Footer from "../Footer/Footer";
import axios from "axios";
import { newTournament } from "../api-Helpers/api-helpers";
import { toast } from "react-toastify";




export default function CreateTournament() {
  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentDate: "", // Keep the date field as a string
    tournamentTime: "",
    prizePool: "",
    rules: "",
  });

  //date validation frontend
  let date = new Date();
  let tdate = date.getDate();
  let month = date.getMonth() + 1;
  if (tdate < 10) {
    tdate = "0" + tdate;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();
  let minDate = year + "-" + month + "-" + tdate;
  console.log(minDate);

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

    // Format the date in "dd-mm-yyyy" before sending it to the server
    const formattedDate = formatDate(formData.tournamentDate);

    // Format the time in "hh:mm AM/PM" before sending it to the server
    const formattedTime = formatTime(formData.tournamentTime);

    //format name
    const formattedName = formData.tournamentName.trim();

    // Send the formatted data to the newTournament function
    newTournament({
      ...formData,
      tournamentDate: formattedDate,
      tournamentTime: formattedTime,
      tournamentName: formattedName,
    })
      .then((res) => console.log(res))
      .catch(err=>console.log(err));

      document.getElementById("tournamentName").value = "";
document.getElementById("rules").value = "";
document.getElementById("prizePool").value = "";
document.getElementById("tournamentTime").value = "";
document.getElementById("tournamentDate").value = "";

      
  };

  // Function to format the date as "dd-mm-yyyy"
  const formatDate = (date) => {
    const parts = date.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}-${month}-${year}`;
    }
    return date; // Return as-is if not in the expected format
  };

  // Function to format the time as "hh:mm AM/PM"
  const formatTime = (time) => {
    const parts = time.split(":");
    if (parts.length === 2) {
      const [hour, minute] = parts;
      let period = "AM";
      let formattedHour = parseInt(hour, 10);

      if (formattedHour >= 12) {
        period = "PM";
        if (formattedHour > 12) {
          formattedHour -= 12;
        }
      }

      return `${formattedHour}:${minute} ${period}`;
    }
    return time; // Return as-is if not in the expected format
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
          Create <span className="text-[#ff8a01]">Tournament</span>
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
            Register
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
