import axios from "axios";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const baseUrl = "http://localhost:4000/";

//all tournaments
export const allTournaments = async () => {
  const res = await axios
    .get(`${baseUrl}tournaments`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;
  const x = await data.tournaments;
  console.log(x);
  return x;
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

//get all Daily-Match
export const allDailyMatch = async () => {
  const res = await axios
    .get(`${baseUrl}dailymatch`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;
  const x = await data.dailymatches;
  return x;
};

//get all Open-rooms
export const allOpenRooms = async () => {
  const res = await axios
    .get(`${baseUrl}openrooms`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("no data");
  }
  const data = await res.data;
  const x = await data.openrooms;
  return x;
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
