import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import classes from "./OrgHome.module.css";
import { useState } from "react";
import imge from "../assets/ListLogo.png";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";
import { useAuthedRequest } from "../hooks/useAuthedRequest";
import ScrimsList from "./ScrimsList";
import DailyMatchList from "./DailyMatchList";
import OpenRoomsList from "./OpenRoomsList";

function TournamentList() {
  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState([]);

  const { user } = useUser();

  const { isReady, get, del } = useAuthedRequest();

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/tournaments/${user.uid}/tournaments`
        );
        setTournaments(myTournaments);
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
        const res = await del(`http://localhost:4000/tournaments/${id}`);
        window.location.reload();
        // toast.success("Tournament deleted");
        return res;
      } catch (error) {
        console.log(error);
        toast.error("Tournament not deleted , try again later");
      }
    } else {
      return;
    }
  };

  const handleEdit = (id) => {
    console.log("idd" ,id);
    navigate(`/updatetournament/${id}`);
  };

  const handleDivClick = (id) => {
    navigate(`/UserTournamentPlayerRegisterForm/${id}`);
  };

  return (
    <>
      <section id="matches" className=" mx-auto pb-[100px]">
        {tournaments.length && (
          <h2 className="text-4xl text-orange-500 text-center ">TOURNAMENTS</h2>
        )}
        {!tournaments.length && (
          <h4 className="text-4xl text-orange-500 text-center ">
            NO TOURNAMENTS
          </h4>
        )}
        <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
          {tournaments &&
            tournaments.map((item) => {
              return (
                <>
                  <li
                    key={item._id}
                    className={classes.listbox}
                    onClick={() => handleDivClick(item._id)}
                  >
                    <div className={classes.dateandtime}>
                      {item.dateOfMatch} {item.idpTime}
                    </div>
                    <img className={classes.ListLogo} src={item.image} />
                    <h3 className="text-2xl font-semibold text-center mt-2 text-orange-500">
                      <div>{item.name}</div>
                    </h3>
                    <div className={classes.listboxContent}>
                      <div className="text-orange-500 text-lg">
                        <span className="text-xl">$</span>
                        {item.prizePool}
                      </div>
                      <button
                        className="text-center text-white text-xl"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEdit(item.id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className=" text-center mt-2 text-lg text-red-500 cursor-pointer border-orange-500"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                </>
              );
            })}
        </ul>
      </section>
      <ScrimsList />
      <DailyMatchList />
      <OpenRoomsList />
    </>
  );
}

export default TournamentList;
