import React, { useState } from "react";
import banner from "../assets/CreateScrim.png";
import classes from "../pages/CreateTournament.module.css";
import useMinDate from "../hooks/useMinDate";
import useFormatTime from "../hooks/useFormatTime";
import useFormatDate from "../hooks/useFormatDate";
import Footer from "../Footer/Footer";
import { toast } from "react-toastify";
import { newScrims } from "../api-Helpers/api-helpers";

const OrgCreateScrims = () => {
  const [scrimsData, setScrimsData] = useState({
    scrimsName: "",
    scrimsDate: "",
    scrimsTime: "",
    scrimsPrize: "",
    scrimsRules: "",
  });

  let minDate = useMinDate();

  const formatDate = useFormatDate();

  const formatTime = useFormatTime();

  const handleChange = (e) => {
    setScrimsData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timePattern.test(scrimsData.scrimsTime)) {
      alert("Invalid time format. Please use HH:mm format (24-hour).");
      return;
    }

    const formattedDate = formatDate(scrimsData.scrimsDate);

    const formattedTime = formatTime(scrimsData.scrimsTime);

    const formattedName = scrimsData.scrimsName.trim();
    newScrims({
      ...scrimsData,
      scrimsDate: formattedDate,
      scrimsTime: formattedTime,
      scrimsName: formattedName,
    })
      .then((res) => console.log(res))
      .catch((err) => toast.error("something went wrong"));
    console.log("hi there");

    document.getElementById("scrimsName").value = "";
    document.getElementById("scrimsRules").value = "";
    document.getElementById("scrimsPrize").value = "";
    document.getElementById("scrimsTime").value = "";
    document.getElementById("scrimsDate").value = "";
  };

  return (
    <>
      <div className="bg-black relative w-full">
        <img
          className="w-[95%] mx-auto pb-10 pt-10"
          src={banner}
          alt="background"
        />
        <h2 className="text-white absolute top-[45%] left-[40%] text-4xl font-bold">
          Create <span className="text-[#ff8a01]">Scrims</span>
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
            id="scrimsName"
            type="text"
            name="scrimsName"
            value={scrimsData.scrimsName}
            placeholder="Scrims Name"
            required
            onChange={handleChange}
            autoFocus
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
            id="scrimsDate"
            type="date"
            name="scrimsDate"
            min={minDate}
            value={scrimsData.scrimsDate}
            placeholder="Date of Match (DD-MM-YYYY)"
            required
            onChange={handleChange}
          />

          <input
            className="bg-gray-800/80 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="time"
            id="scrimsTime"
            name="scrimsTime"
            value={scrimsData.scrimsTime}
            placeholder="IDP Time (HH:mm)"
            required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="number"
            id="scrimsPrize"
            min="1"
            max="1000000"
            name="scrimsPrize"
            value={scrimsData.scrimsPrize}
            placeholder="Prize Pool"
            onChange={handleChange}
          />
          <textarea
            className="bg-gray-800/80 h-52 mb-14 px-4 py-2 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="text"
            id="scrimsRules"
            name="scrimsRules"
            value={scrimsData.scrimsRules}
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
};

export default OrgCreateScrims;
