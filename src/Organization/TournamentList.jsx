import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import classes from "./OrgHome.module.css";
import { useState } from "react";
import imge from "../assets/ListLogo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "../hooks/useUser";

function TournamentList() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/tournaments/${user.uid}/tournaments`
        );
        setTournaments(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      loadTournaments();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/tournaments/${id}`);
      const resDate = res.data;
      toast.success("Tournament deleted");
      return resDate;
    } catch (error) {
      console.log(error);
      toast.error("Tournament not deleted , try again later");
    }
  };

  const handleEdit = (id) => {
    navigate(`/updatetournament/${id}`);
  };

  return (
    <section id="matches" className=" mx-auto pb-[100px]">
      <h2 className="text-4xl text-orange-500 text-center ">TOURNAMENTS</h2>
      <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
        {tournaments &&
          tournaments.map((item) => {
            return (
              <>
                <li className={classes.listbox}>
                  <div className={classes.dateandtime}>
                    {item.dateOfMatch} {item.idpTime}
                  </div>
                  <img className={classes.ListLogo} src={imge} />
                  <h3 className="text-2xl text-center mt-2 text-orange-500">
                    <div>{item.name}</div>
                  </h3>
                  <div className={classes.listboxContent}>
                    <div className={classes.price}>${item.prizePool}</div>
                    <div
                      className={classes.edittext}
                      onClick={() => handleEdit(item.id)}
                    >
                      {" "}
                      Edit{" "}
                    </div>

                    <div
                      className=" text-center mt-2 text-orange-500 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </div>
                  </div>
                </li>
              </>
            );
          })}
      </ul>
      {/* commennt */}
      {/* <h2 className="text-4xl text-orange-500 text-center mt-20">SCRIMS</h2> */}
      {/* <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
        {scrims &&
          scrims.map((item) => {
            return (
              <>
                <li className={classes.listbox}>
                  <div className={classes.dateandtime}>
                    {item.dateOfMatch} {item.idpTime}
                  </div>
                  <img className={classes.ListLogo} src={imge} />
                  <h3 className="text-2xl text-center mt-2 text-orange-500">
                    <div>{item.name}</div>
                  </h3>
                  <div className={classes.listboxContent}>
                    <div className={classes.price}>${item.prizePool}</div>
                    <div
                      className={classes.edittext}
                      onClick={() => handleEditScrims(item._id)}
                    >
                      {" "}
                      Edit{" "}
                    </div>

                    <div
                      className=" text-center mt-2 text-orange-500 cursor-pointer"
                      onClick={() => handleDeleteScrims(item._id)}
                    >
                      Delete
                    </div>
                  </div>
                </li>
              </>
            );
          })}
      </ul> */}
    </section>
  );
}

export default TournamentList;
