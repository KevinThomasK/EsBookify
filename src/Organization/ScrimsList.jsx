import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import classes from "./OrgHome.module.css";
import { useState } from "react";
import imge from "../assets/ListLogo.png";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";
import { useAuthedRequest } from "../hooks/useAuthedRequest";

function ScrimsList() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);

  const { user } = useUser();

  const { isReady, get, del } = useAuthedRequest();

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/scrims/${user.uid}/scrims`
        );
        setTournaments(myTournaments);
        console.log(myTournaments);
      } catch (error) {
        console.log(error);
      }
    };
    if (user && isReady) {
      loadTournaments();
    }
  }, [user, get, isReady]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to proceed?");
    if (isConfirmed) {
      try {
        const res = await del(`http://localhost:4000/scrims/${id}`);
        window.location.reload();
        // toast.success("Scrim deleted");
        return res;
      } catch (error) {
        console.log(error);
        toast.error("Scrim not deleted , Try Again Later");
      }
    } else {
      return;
    }
  };

  const handleEdit = (id) => {
    navigate(`/updatescrim/${id}`);
  };

  return (
    <section id="matches" className=" mx-auto pb-[100px]">
      <h2 className="text-4xl text-orange-500 text-center ">SCRIMS</h2>
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
    </section>
  );
}

export default ScrimsList;
