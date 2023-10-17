import React from "react";
import classes from "../pages/CreateTournament.module.css";

import DailyMatch from "../assets/DailyMatch.png";
import Footer from "../Footer/Footer";
import { useState } from "react";

function OrgCreateDailyMatch() {
  const [DailyMatchName, setDailyMatchName] = useState("");
  const [DailyMatchDate, setDailyMatchDate] = useState("");
  const [DailyMatchTime, setDailyMatchTime] = useState("");
  const [DailyMatchrules, setDailyMatchRules] = useState("");
  const [DateType, setDateType] = useState("text");
  const [TimeType, setTimeType] = useState("text");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //    try {
    //     const resp = await axios.post("http://localhost:4000/tournaments/createtournament/",{
    //        name:DailyMatchName,dateOfMatch:DailyMatchDate,idpTime:DailyMatchTime,rules:DailyMatchrules

    //     })
    //     console.log(resp.data)
    //    } catch (error) {
    //     console.log(error)
    //    }
  };
  return (
    <div>
      <div className="bg-black relative w-full">
        <img
          className="w-[95%] mx-auto pb-10 pt-10"
          src={DailyMatch}
          alt="backgorund"
        />
        <h2 className="text-white absolute top-[45%] left-[40%] text-4xl font-bold">
          Daily <span className="text-[#ff8a01]"> Match</span>
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
            className="bg-gray-800/80 mb-14 px-4 py-4  placeholder:text-[#ff8a01]"
            type="text"
            id="tournamentName"
            value={DailyMatchName}
            placeholder="Tounrament Name"
            required
            onChange={(e) => setDailyMatchName(e.target.value)}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type={DateType}
            onFocus={(e) => setDateType("date")}
            onBlur={(e) => setDateType("text")}
            id="tournamentDate"
            value={DailyMatchDate}
            placeholder="Date of Match"
            required
            onChange={(e) => setDailyMatchDate(e.target.value)}
          />

          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type={TimeType}
            onFocus={(e) => setTimeType("time")}
            onBlur={(e) => setTimeType("text")}
            id="tournamentTime"
            value={DailyMatchTime}
            placeholder="IDP Time"
            // required
            onChange={(e) => setDailyMatchTime(e.target.value)}
          />

          <textarea
            className="bg-gray-800/80 h-52 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="text"
            id="rules"
            value={DailyMatchrules}
            placeholder="Rules"
            onChange={(e) => setDailyMatchRules(e.target.value)}
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
    </div>
  );
}

export default OrgCreateDailyMatch;
