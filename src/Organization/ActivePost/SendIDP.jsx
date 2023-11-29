import React, { useState } from 'react'
import classes from "../../Organization/OrgHome.module.css";
import Org from "../../Organization/OrgHome.module.css";
import home from "../../HomePage.module.css"
import Footer from '../../Footer/Footer';
import { useAuthedRequest } from '../../hooks/useAuthedRequest';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

function SendIDP() {
  const { post } = useAuthedRequest();
  const params = useParams();
  const [formData, setformData]= useState ({
    RoomID: "",
    Password: ""
  })
  function handleChange (e) {
    let {name,value}= e.target
    setformData(prevState => ({
      ...prevState,
      [name]: value
  }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registeredTeam = await post(
        `http://localhost:4000/SendIDP/${params.TournamentId}/${params.userId}`,
        {
         RoomID:formData.RoomID,
          Password:formData.Password
        }
      );
    
     
      toast.success("Registered Tournament Successfully");
      
      return registeredTeam;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,Try Again Later");
    }
  
  }
    return (

        <div className={Org.Orgbackground}>
            <div className={home.gradient}>
                <div className={home.MainOrgList}>
                    <h3 className="bg-black text-white  text-3xl font-semibold pt-14 flex justify-center mb-8">
                       Send Match IDP
                    </h3>
                    
                    <form className="flex flex-col w-[33%] mx-auto bg-transparent"
                    onSubmit={handleSubmit}
                    >
                    
                    <input
            className="bg-zinc-900 mb-14 px-4 py-2  placeholder:text-[#ff8a01] text-[#ff8a01] font-bold"
            id="RoomId"
            type="text"
            name="RoomID"
            value={formData.RoomID}
            placeholder="Room ID"
            required
            onChange={handleChange}
            autoFocus
          />
             <input
            className="bg-zinc-900 mb-14 px-4 py-2  placeholder:text-[#ff8a01] text-[#ff8a01] font-bold"
            id="Password"
            type="text"
            name="Password"
            value={formData.Password}
            placeholder="Password"
            required
            onChange={handleChange}
            autoFocus
          />

          <button 
            type="submit"
            className="w-full text-[#ff8a01] bg-zinc-800 py-3 font-bold text-2xl mb-20"
          >
            Send
          </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>

    )
}

export default SendIDP