import React, { useEffect, useState } from "react";
import classes from "../../Organization/OrgHome.module.css";
import Org from "../../Organization/OrgHome.module.css";
import home from "../../HomePage.module.css";
import imge from "../../assets/ListLogo.png";

import Footer from "../../Footer/Footer";
import { useUser } from "../../hooks/useUser";
import { useAuthedRequest } from "../../hooks/useAuthedRequest";
import {  useNavigate } from "react-router";
import ActivePostTeamList from "./ActivePostTeamList";



function ActivePost(props) {

  const [ActivePost, setActivePost] = useState([]);
  const [isSlotSelected, setisSlotSelected] = useState(false);
const [slotcontent , setslotcontent] = useState ([]);
  const { user } = useUser();
  const navigate = useNavigate()

  const { isReady, get, del } = useAuthedRequest();
  const handleEdit = (item) => {
    console.log("item__",item);
    if (item.category=="tournaments")
    navigate(`/updatetournament/${item.id}/${item._id}`);
    if (item.category=="scrims")
    navigate(`/updatescrim/${item.id}`);
    if (item.category=="dailymatch")
    navigate(`/updatedailymatch/${item.id}`);
    if (item.category=="openrooms")
    navigate(`/updateopenroom/${item.id}`);
  };

  const handleDelete = async (item) => {
    const isConfirmed = window.confirm("Are you sure you want to proceed?");
    if (isConfirmed) {
      try {
        const res = await del(`http://localhost:4000/${item.category}/${item.id}`);
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
  
  useEffect(() => {
    let activepostdata =[]
    const loadTournaments = async () => {
      try {
        const myTournaments = await get(
          `http://localhost:4000/tournaments/${user.uid}/tournaments`
        );
        
        myTournaments.map((item)=> {
          item.category= "tournaments"
        })
        console.log("mytournament", myTournaments);
      
        activepostdata.push (...myTournaments)
        setActivePost(myTournaments)
        loadScrims();
        console.log(myTournaments);
      } catch (error) {
        console.log(error);
      }
    };
    const loadScrims = async () => {
      try {
        const myScrims = await get(
          `http://localhost:4000/scrims/${user.uid}/scrims`
        );
        
        myScrims.map((item)=> {
          item.category= "scrims"
        })
        let data= [...activepostdata, ...myScrims]
        activepostdata.push(...myScrims)
        // console.log("scrimdata", data);
      //   setActivePost(prevState => ({
      //     ...prevState,
      //   ...myScrims
      // }));
        loaddailymatch()
        console.log("newarray", activepostdata);
                
      } catch (error) {
        console.log(error);
      }
    };
    const loaddailymatch = async () => {
      try {
        const myDailyMatch = await get(
          `http://localhost:4000/dailymatch/${user.uid}/dailymatch`
        );
        myDailyMatch.map((item)=> {
          item.category= "dailymatch"
        })
        let data= [activepostdata, ...myDailyMatch]
        activepostdata.push(...myDailyMatch)
        console.log("dataA", activepostdata);
      
      //  activepostdata.push (myDailyMatch[0])
       loadopenroom()
      } catch (error) {
        console.log(error);
      }
    };
    const loadopenroom = async () => {
      try {
        const myOpenRoom= await get(
          `http://localhost:4000/openrooms/${user.uid}/openrooms`
        );
        myOpenRoom.map((item)=> {
          item.category= "openrooms"
        })
        let data= [...activepostdata, ...myOpenRoom]
        activepostdata.push(...myOpenRoom)
        console.log("scrimdata__", data);
     
        // activepostdata.push (myOpenRoom[0])
        setActivePost (activepostdata)
      } catch (error) {
        console.log(error);
      }
    };
    if (user && isReady) {
      loadTournaments();
     
    }
  }, [user, get, isReady]);

  
console.log("activepost", ActivePost);
function slotlist (item) {
  console.log("item",item);
  setisSlotSelected (true)
  if (item.category=="tournaments")
      item.url= "/UserTournamentPlayerRegisterForm"
      if (item.category=="scrims")
      item.url= "/UserScrimPlayerRegisterForm"
      if (item.category=="dailymatch")
      item.url= "/UserDailyMatchPlayerRegisterForm"
      if (item.category=="openrooms")
      item.url= "/UserOpenRoomPlayerRegisterForm"  
  setslotcontent(item)
    // Navigate(`/UserTournamentPlayerRegisterForm/${item.id}`);
}
console.log("activepost", ActivePost);
  return (
    <div className={Org.Orgbackground}>
      {!isSlotSelected?
      <div className={home.gradient}>
        <div className={home.MainOrgList}>
          <h3 className={home.TournamentOrgHeading}>
            ACTIVE POSTS <span className={home.animationSpan}> </span>
          </h3>
        </div>

        <section id="matches" className=" mx-auto">
          <ul className="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
          {ActivePost &&
            ActivePost.map((item) => {
              
              return (
               
                  <li
                    className={classes.listbox}
                    // onClick={() => {
                    //   navigate("      ");
                    // }}
                  >
                    <div className={classes.activepostslots}>
                      {item.dateOfMatch}

                      {item.idpTime}
                    </div>
                    <img className={classes.ListLogo} src={imge} />
                    <h3 className="text-2xl text-center mt-2 text-orange-500">
                      <div> 
                        {item.name}

                      </div>
                    </h3>
                    <div className={classes.activepostslotsedit}>
                      
                      <div className=" text-center mt-2 text-white">
                        <button onClick={() => handleDelete(item)}>
                        Delete
                        </button>
                      </div>
                      <div className=" text-center mt-2 text-white">
                        <button onClick={() => handleEdit(item)}>
                        Edit
                        </button>
                      </div>
                      <div className=" text-center mt-2 text-orange-500">
                        <button 
                         onClick={() => slotlist(item)}
                         >
                        Slot List
                        </button>
                      </div>
                    </div>
                  </li>
              )})}
             
          </ul>
        </section>
      </div>
      :<ActivePostTeamList slotcontent={slotcontent}/>   }
      <Footer />
    </div>

  );
}



export default ActivePost;
