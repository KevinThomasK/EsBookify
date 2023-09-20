import React, { useState } from "react";
import createTournamentPageImg from "../assets/Rectangle 25.png";
import classes from "./CreateTournament.module.css";
import Footer from "../Footer/Footer";
import axios from "axios";
import { newTournament } from "../api-Helpers/api-helpers";

export default function CreateTournament() {
  const [formData, setFormData] = useState({
    tournamentName: "",
    tournamentDate: "",
    tournamentTime: "",
    prizePool: "",
    rules: "",
  });

  // const { tournamentName, tournamentDate, tournamentTime, prizePool, rules } =
  //   formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    newTournament({ ...formData })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="bg-black relative w-full">
        <img
          className="w-[95%] mx-auto pb-10 pt-10"
          src={createTournamentPageImg}
          alt="backgorund"
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
            className="bg-gray-800/80 mb-14 px-4 py-4  placeholder:text-[#ff8a01]"
            type="text"
            name="tournamentName"
            value={formData.tournamentName}
            placeholder="Tounrament Name"
            required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="date"
            name="tournamentDate"
            value={formData.tournamentDate}
            placeholder="Date of Match"
           // required
            onChange={handleChange}
          />

          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="time"
            name="tournamentTime"
            value={formData.tournamentTime}
            placeholder="IDP Time"
            // required
            onChange={handleChange}
          />
          <input
            className="bg-gray-800/80 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="text"
            name="prizePool"
            value={formData.prizePool}
            placeholder="Prize Pool"
            onChange={handleChange}
          />
          <textarea
            className="bg-gray-800/80 h-52 mb-14 px-4 py-4 text-[#ff8a01] placeholder:text-[#ff8a01]"
            type="text"
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
