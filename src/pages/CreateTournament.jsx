import React, { useState } from "react";
import createTournamentPageImg from "../assets/Rectangle 25.png";
import classes from "./CreateTournament.module.css";
import Footer from "../Footer/Footer";

export default function CreateTournament() {
  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentDate: {},
    tournamentTime: {},
    prizePool: 0,
    rules: "",
  });

  const { tournamentName, tournamentDate, tournamentTime, prizePool, rules } =
    formData;

  return (
    <>
      <div className="bg-black relative w-full">
        <img
          className="w-[90%] mx-auto pb-10 pt-10"
          src={createTournamentPageImg}
          alt="backgorund"
        />
        <h2 className="text-white absolute top-[45%] left-[40%] text-4xl font-bold">
          Create <span className="text-[#ff8a01]">Tournament</span>
        </h2>
      </div>

      <h3 className="bg-black text-white px-[40%] text-3xl font-semibold pb-10 pt-10">Fill Match Details</h3>
      <div className={classes.formDiv}>
        <form className="flex flex-col w-[40%] mx-auto bg-transparent">
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4  placeholder:text-[#ff8a01]"
            type="text"
            id="tournamentName"
            value={tournamentName}
            placeholder="Tounrament Name"
            required
          />
          <input
           className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="date"
            id="tournamentDate"
            value={tournamentDate}
            placeholder="Date of Match"
            required
          />
          <input
          className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="time"
            id="tournamentTime"
            value={tournamentTime}
            placeholder="IDP Time"
            required
          />
          <input
          className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="number"
            id="prizePool"
            value={prizePool}
            placeholder="Prize Pool"
          />
          <textarea className="bg-gray-800/80 h-52 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]" type="text" id="rules" value={rules} placeholder="Rules" />
          <button type="submit" className="w-full text-[#ff8a01] bg-gray-800/80 py-4 font-bold text-3xl mb-60">Register</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
