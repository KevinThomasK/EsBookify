// api-helpers.js
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:4000/";

export const newTournament = async (data) => {
  console.log(data);

  const res = await axios
    .post("http://localhost:4000/tournaments/createtournament/", {
      name: data.tournamentName,
      dateOfMatch: data.tournamentDate, // Assuming the server accepts the date in the given format
      idpTime: data.tournamentTime,
      prizePool: parseInt(data.prizePool), // Convert to integer
      rules: data.rules,
      org:localStorage.getItem("email"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("unexpected error");
  }

  const resData = await res.data;
  toast.success("Tournament created successfully");
  return resData;
};

//org login

export const validateOrg = async (token) => {
  const res = await axios.get(`${baseUrl}org/login`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.data;
};
