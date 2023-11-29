import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import classes from "../OrgHome.module.css";
import { useState } from "react";
import imge from "../../assets/ListLogo.png";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";
import { useAuthedRequest } from "../../hooks/useAuthedRequest";

function MyOpenRooms() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);

  const { user } = useUser();

  const { isReady, get } = useAuthedRequest();

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/openrooms/${user.uid}/openrooms`
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

  const handleAddPoint = async (id) => {
    navigate(`/point-table/${id}`);
  };

  //   const handleEdit = (id) => {
  //     navigate(`/updatetournament/${id}`);
  //   };

  return (
    <>
      <section id="matches" className="  pb-[100px]">
        {/* <h2 className="text-4xl text-orange-500 text-center ">TOURNAMENTS</h2> */}
        <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
          {tournaments &&
            tournaments.map((item) => {
              return (
                <>
                  <li key={item._id} className={classes.listbox}>
                    <img className={classes.ListLogo} src={item.image} />
                    <h3 className="text-2xl font-bold text-center mt-10 text-orange-500">
                      <div>{item.name}</div>
                    </h3>
                    <div className={classes.listboxContent}>
                      <div className="text-white">
                        {" "}
                        {item.dateOfMatch} {item.idpTime}
                      </div>

                      <div
                        className=" text-center text-lg mt-2 text-orange-500 cursor-pointer hover:text-red-500"
                        onClick={() => handleAddPoint(item._id)}
                      >
                        Add Point
                      </div>
                    </div>
                  </li>
                </>
              );
            })}
        </ul>
      </section>
    </>
  );
}

export default MyOpenRooms;
