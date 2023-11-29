import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import classes from "./OrgHome.module.css";
import { useState } from "react";
import imge from "../assets/ListLogo.png";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";
import { useAuthedRequest } from "../hooks/useAuthedRequest";

function OpenRoomsList() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const { user } = useUser();
  const { isReady, get, del } = useAuthedRequest();

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/openrooms/${user.uid}/openrooms`
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
        console.log(id);
        const res = await del(`http://localhost:4000/openrooms/${id}`);
        window.location.reload();
        return res;
      } catch (error) {
        console.log(error);
        toast.error("Open-Room Not Deleted , Try Again Later");
      }
    } else {
      return;
    }
  };

  const handleEdit = (id) => {
    navigate(`/updateopenroom/${id}`);
  };

  const handleDivClick = (id) => {
    navigate(`/UserOpenRoomPlayerRegisterForm/${id}`);
  };

  return (
    <section id="matches" className=" mx-auto pb-[100px]">
      {tournaments.length && (
        <h2 className="text-4xl text-orange-500 text-center ">Open-Rooms</h2>
      )}
      {!tournaments.length && (
        <h4 className="text-4xl text-orange-500 text-center ">No Open-Rooms</h4>
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
                  <div className="w-1/2 h-1/2 pt-12">
                    <img className="w-full h-full" src={item.image} />
                  </div>

                  <h3 className="text-2xl font-semibold text-center my-auto text-orange-500">
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
                      className="  text-center mt-2 text-lg text-red-500 cursor-pointer border-orange-500"
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
  );
}

export default OpenRoomsList;
