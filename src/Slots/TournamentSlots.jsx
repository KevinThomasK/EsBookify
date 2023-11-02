import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";

const TournamentSlots = () => {
  const [teams, setTeams] = useState("");
  const params = useParams();
  const getRegisteredTeams = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/UserTournamentPlayerRegisterForm/${params.tournamentId}`
      );
      const data = res.data;
      console.log(data);
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRegisteredTeams();
  }, []);

  return <div>TournamentSlots</div>;
};

export default TournamentSlots;
