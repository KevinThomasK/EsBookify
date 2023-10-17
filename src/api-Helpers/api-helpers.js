// api-helpers.js
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:4000/";

export const newTournament = async (data) => {
  // console.log(data);

  const res = await axios
    .post("http://localhost:4000/tournaments/createtournament/", {
      name: data.tournamentName,
      dateOfMatch: data.tournamentDate, // Assuming the server accepts the date in the given format
      idpTime: data.tournamentTime,
      prizePool: parseInt(data.prizePool), // Convert to integer
      rules: data.rules,
      org: localStorage.getItem("email"),
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

//get all tournaments
export const allTournaments = async () => {
  const res = await axios
    .get(`${baseUrl}tournaments`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;
  const x = await data.tournaments;
  return x;
  //console.log(data);
};

//delete tournament
export const deleteTournament = async (id) => {
  const res = await axios
    .delete(`${baseUrl}tournaments/deletetournament/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("erorrr");
  }

  const resData = await res.data;
  return resData;
};

//edit tournament
export const updateTournament = async (data) => {
  const id = data.id;
  console.log(id);
  const res = await axios
    .put(`http://localhost:4000/tournaments/updatetournament/${id}`, {
      name: data.tournamentName,
      dateOfMatch: data.tournamentDate, // Assuming the server accepts the date in the given format
      idpTime: data.tournamentTime,
      prizePool: parseInt(data.prizePool), // Convert to integer
      rules: data.rules,
      org: localStorage.getItem("email"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("unexpected error");
  }

  const resData = await res.data;
  toast.success("Tournament updated successfully");
  return resData;
};

//create scrims
export const newScrims = async (data) => {
  const res = await axios
    .post("http://localhost:4000/scrims/createscrims/", {
      name: data.scrimsName,
      dateOfMatch: data.scrimsDate, // Assuming the server accepts the date in the given format
      idpTime: data.scrimsTime,
      prizePool: parseInt(data.scrimsPrize), // Convert to integer
      rules: data.scrimsRules,
      org: localStorage.getItem("email"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("unexpected error");
  }

  const resData = await res.data;
  toast.success("Scrims created successfully");
  return resData;
};

//get all scrims
export const allScrims = async () => {
  const res = await axios
    .get(`${baseUrl}scrims`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;
  const x = await data.scrims;
  console.log(x);
  return x;
};

//delete Scrims
export const deleteScrims = async (id) => {
  const res = await axios
    .delete(`${baseUrl}scrims/deletescrims/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("erorrr");
  }

  const resData = await res.data;
  return resData;
};

//edit scrims
export const updateScrims = async (data) => {
  const id = data.id;
  console.log(id);
  const res = await axios
    .put(`http://localhost:4000/scrims/updatescrims/${id}`, {
      name: data.scrimsName,
      dateOfMatch: data.scrimsDate, // Assuming the server accepts the date in the given format
      idpTime: data.scrimsTime,
      prizePool: parseInt(data.scrimsPrize), // Convert to integer
      rules: data.scrimsRules,
      org: localStorage.getItem("email"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("unexpected error");
  }

  const resData = await res.data;
  toast.success("scrims updated successfully");
  return resData;
};

//new user
export const newUser = async (data) => {
  console.log(data);
  const res = await axios
    .post("http://localhost:4000/", {
      uid: data.uid,
      name: data.name,
      email: data.email,
      userType: data.userType,
    })
    .catch((err) => console.log(err));
  const resData = await res.data;
  return resData;
};
