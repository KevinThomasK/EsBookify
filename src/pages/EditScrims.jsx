import React, { useState } from "react";
import createTournamentPageImg from "../assets/Rectangle 25.png";
import classes from "./CreateTournament.module.css";
import Footer from "../Footer/Footer";
import { updateScrims } from "../api-Helpers/api-helpers";
import { useParams } from "react-router-dom";
import useFormatTime from "../hooks/useFormatTime";
import useFormatDate from "../hooks/useFormatDate";
import useMinDate from "../hooks/useMinDate";

export default function EditScrims() {
  const [formData, setFormData] = useState({
    scrimsName: "",
    scrimsDate: "", // Keep the date field as a string
    scrimsTime: "",
    scrimsPrize: "",
    scrimsRules: "",
  });

  let minDate = useMinDate();

  const params = useParams();

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
    if (!timePattern.test(formData.scrimsTime)) {
      alert("Invalid time format. Please use HH:mm format (24-hour).");
      return;
    }

    const formattedDate = formatDate(formData.scrimsDate);

    const formattedTime = formatTime(formData.scrimsTime);

    const formattedName = formData.scrimsName.trim();

    // Send the formatted data to the newTournament function
    updateScrims({
      ...formData,
      scrimsDate: formattedDate,
      scrimsTime: formattedTime,
      scrimsName: formattedName,
      id: params.scrimsId,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    document.getElementById("scrimsName").value = "";
    document.getElementById("scrimsRules").value = "";
    document.getElementById("scrimsPrize").value = "";
    document.getElementById("scrimsTime").value = "";
    document.getElementById("scrimsDate").value = "";
  };

  // Function to format the date as "dd-mm-yyyy"
  const formatDate = useFormatDate();

  // Function to format the time as "hh:mm AM/PM"
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
          Edit <span className="text-[#ff8a01]">Scrims</span>
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
            id="scrimsName"
            type="text"
            name="scrimsName"
            value={formData.scrimsName}
            placeholder="Tournament Name"
            required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            id="scrimsDate"
            type="date"
            name="scrimsDate"
            min={minDate}
            value={formData.scrimsDate}
            placeholder="Date of Match (DD-MM-YYYY)"
            required
            onChange={handleChange}
          />

          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="time"
            id="scrimsTime"
            name="scrimsTime"
            value={formData.scrimsTime}
            placeholder="IDP Time (HH:mm)"
            required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="number"
            id="scrimsPrize"
            min="1"
            max="1000000"
            name="scrimsPrize"
            value={formData.scrimsPrize}
            placeholder="Prize Pool"
            onChange={handleChange}
          />
          <textarea
            className="bg-gray-800/80 h-52 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="text"
            id="scrimsRules"
            name="scrimsRules"
            value={formData.scrimsRules}
            placeholder="Rules"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full text-[#ff8a01] bg-gray-800/80 py-4 font-bold text-3xl mb-60"
          >
            Edit Scrims
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
