import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import classes from "./OrgHome.module.css";
import { allTournaments, deleteTournament } from "../api-Helpers/api-helpers";
import { useState } from "react";
import imge from "../assets/ListLogo.png";
import { toast } from "react-toastify";

function TournamentList() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState();

  useEffect(() => {
    allTournaments()
      .then((data) =>
        setTournaments(
          data.filter((item) => item.org === localStorage.getItem("email"))
        )
      )
      .catch((err) => console.log(err));
  }, []);

  // console.log(tournaments);

  const handleDelete = (id) => {
    deleteTournament(id)
      .then(toast.success("Tournament deleted"))
      .then(navigate("/"))
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/updatetournament/${id}`);
    console.log("first");
  };

  return (
    <section id="matches" className=" mx-auto pb-[100px]">
      <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
        {tournaments &&
          tournaments.map((item) => {
            return (
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
                    onClick={() => handleEdit(item._id)}
                  >
                    {" "}
                    Edit{" "}
                  </div>

                  <div
                    className=" text-center mt-2 text-orange-500 cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default TournamentList;
