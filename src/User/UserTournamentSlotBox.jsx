import React, { useEffect, useState } from "react";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import Footer from "../Footer/Footer";
import imge from "../assets/ListLogo.png";
import {  UserTournamentSlotList } from "../Constant";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { storeSlotCount } from "../Redux/Action";
import { toast } from "react-toastify";
import { useAuthedRequest } from "../hooks/useAuthedRequest";
import UnlockIcon from "../assets/UnlockIcon.png"
import LockIcon from "../assets/LockIcon.png"

function UserTournamentSlotBox(props) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { get, isReady } = useAuthedRequest();
  const [regteam, setregteam] = useState([])
  const [UserIconList, setUserIconList ] =useState([
    {
      content: "1",
      image: "../src/assets/UnlockIcon.png",
   click: true
      
    },
    {
      content: "2",
      image: "../src/assets/UnlockIcon.png",
   click: true
      
    },
    {
      content: "3",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "4",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "5",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "6",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "7",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "8",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "9",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "10",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "11",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "12",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "13",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "14",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "15",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "16",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "17",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "18",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "19",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "20",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "21",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "22",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "23",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "24",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
    {
      content: "25",
      image: "../src/assets/UnlockIcon.png",
   click: true
    },
  ]
  )
  //console.log(user.uid);
  console.log("UserTournamentSlotList", UserTournamentSlotList, UserIconList);
  
  
  
  useEffect(() => {
    console.log("test");
    const handleslot = async () => {
      try {
        console.log("props.slotdetails._id", props.slotdetails._id);
        const registeredTeam = await get(
          `http://localhost:4000/UserTournamentPlayerRegisterForm/${props.slotdetails._id}`,
          {}
        );
        setregteam(registeredTeam.registeredTeams)
        
        console.log("registeredTeam", registeredTeam);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong,Try Again Later");
      }
    }
    if (isReady) { handleslot() }


  }, [get, isReady])


  function IconUnlock(item) {
    //console.log(props.slotdetails);
    if (item.click) {
    const tournamentId = props.slotdetails._id;
    console.log("itemcon", item);
    props.storeSlotCount(item)


    navigate(`/UserTournamentPlayerRegisterForm/${tournamentId}/${user.uid}`);
    }
  }

  const TournamentTeams = async () => {
    const tournamentId = props.slotdetails._id;
    // console.log(tournamentId);
    navigate(`/UserTournamentPlayerRegisterForm/${tournamentId}`);
  };
  console.log("regteam1", regteam);

  const updateImages = () => {
    let listarray =[...UserIconList]
    console.log("listarrayy", listarray);
    regteam.forEach(mainObj => {
      const matchingOtherObj = listarray.find(
        otherObj => otherObj.content == mainObj.SlotNumber
      );
        console.log("matchingOtherObj", matchingOtherObj);
      // If a matching object is found, update the Image key
      if (matchingOtherObj) {
        matchingOtherObj.image = "../src/assets/LockIcon.png";
        matchingOtherObj.click= false
      }
    });
    setUserIconList (listarray)
   
    
  }
  useEffect(() => {
    console.log("useefect");
    if (regteam.length > 0) {
      updateImages()
    }
   
    
    
  }, [regteam])
  
  console.log("UserIconList", UserIconList);
  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.MainOrgList}>
          <div>
            <ul className="list-none mx-auto  flex flex-row flex-wrap  justify-center gap-10 ">
              <li
                className={classes.listbox}
                onClick={() => TournamentTeams(props.slotdetails._id)}
              >
                <img className={classes.ListLogo} src={imge} />
                <h3 className="text-2xl text-center mt-2 text-orange-500">
                  <div>{props.slotdetails.name}</div>
                </h3>
                <div className={classes.scrimlistcontet}>
                  <div className={classes.UserScrimListDateandTime}>
                    <div>{props.slotdetails.dateOfMatch}</div>
                    <div>{props.slotdetails.idpTime}</div>
                    <div>{props.slotdetails.prizePool}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={classes.mainslot}>
            {/* {UserSlotListDetails.map((item) => {
              console.log("regteam", regteam);
              let data = regteam.length && regteam.find(regitem => regitem.SlotNumber == item.content)
              console.log("data", data);
              return (
                <div
                  key={item.content}
                  className={classes.slotbox}
                  onClick={() => IconUnlock(item)}
                >
                  <img src={`${regitem.SlotNumber == item.content ? LockIcon : UnlockIcon}`} />

                  <span className={classes.span}> {item.content}</span>
                </div>
              );
            }
            )
            } */}
            {

               UserIconList.map((item) => {
                console.log("itemicoon", item);
                return (
                  <div
                    key={item.content}
                    className={classes.slotbox} 
                    onClick={() => IconUnlock(item)}
                  >
                    {item.click ? <img src={UnlockIcon}/> : <img src={LockIcon}/>  }
                {console.log("itemClick", item.click)}

                    <span className={classes.span}> {item.content}</span>
                  </div>
                );
              }
              )
            }
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const mapStateToProps = (HomeReducer) => {
  // console.log("slotdetails", HomeReducer);
  return {
    slotdetails: HomeReducer.selectedItems.slotdetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeSlotCount: (s) => {
      dispatch(storeSlotCount(s));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserTournamentSlotBox) ;
