import axios from "axios";

export const newTournament  = async (data) => {
    console.log(data);
    const res = await axios.post("http://localhost:4000/tournaments/createtournament/",{
        name:data.tournamentName,
        dateOfMatch:data.tournamentDate,
        idpTime:data.tournamentTime,
        prizePool:data.prizePool,
        rules:data.rules,
    }).catch((err)=>console.log(err))
  
    if(res.status !== 201){
      return console.log("unexpected error")
    }
  
    const resData = await res.data;
    return resData;
  }