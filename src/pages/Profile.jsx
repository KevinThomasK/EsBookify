import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import classes from "../Organization/OrgHome.module.css";
import Org from "../Organization/OrgHome.module.css";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { useAuthedRequest } from "../hooks/useAuthedRequest";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { put } = useAuthedRequest();
  console.log("auth", auth);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    phoneNumber: auth.currentUser.phoneNumber
  });


  const handleupdate = async ()=> {
    
    let userid = localStorage.getItem ("UID")
    try {
      const edituser = await  put (
        `http://localhost:4000/edituser /${userid}`,
        {
         
          name:formData.name,
          email:formData.email, 
          phoneNumber:formData.phoneNumber, 
        }
      );
      
      return edituser;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,Try Again Later");
    }
  }
    const handlechange= (e) => {
      let { name,value} =e.target
      setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
         const handlePhonechange = (e, country) => {
      // setph(e);
      // setCountryCode(country.countryCode);
      setFormData(prevState => ({
        ...prevState,
        [phoneNumber]: e
    }));
    };


  const onLogout = () => {
    auth.signOut();
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    navigate("/");
  };

  const { name, email, phoneNumber } = formData;
  return (
    <>

      <div className={Org.profilebg}>
        <div className={classes.gradient}>
          <div className={classes.tablediv}>
            {/* <img
        className="w-[95%] mx-auto pb-10 pt-10"
        src={createTournamentPageImg}
        alt="background"
      /> */}
            <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
              <h1 className="text 3xl  text-center  mt-6  font-bold">My Profile</h1>
              <div>
                <form>
                  <input
                    type="text"
                    required
                    id="name"
                    value={name}
                    // disabled
                    name="name"
                     onChange={handlechange}
                    className="w-full text-[#ff8a01] bg-gray-800/80 py-3 font-bold  mb-8 pl-2.5" />
                  <input
                  required
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    // disabled
                    onChange={handlechange}
                    className="w-full text-[#ff8a01] bg-gray-800/80 py-3 font-bold mb-8 pl-2.5" />
                    
                    <div className={classes.phonenumber}>
                    <PhoneInput
                    //  inputProps={{
                    //   name: 'phoneNumber',
                    // }}
                    type="tel"
                    required
                    disableDropdown ={true}
                    countryCodeEditable={false}
                    req
                    country={"in"}
                    value={""}
                    onChange={handlePhonechange}
                    placeholder="Mobile Number"
                  /> 
                   </div>
                 

                    </form>
                    <div className=" flex-row justify-evenly flex gap-14 mb-8 mt-8">
                  <button
                  onClick={handleupdate}
                    type="submit"
                    className="w-full text-[#ff8a01] bg-gray-800/80 py-3 font-bold text-2xl" >
                    Update
                  </button>
                  <button
                    type="submit"
                    className="w-full text-[#ff8a01] bg-gray-800/80 py-3 font-bold text-2xl " >
                    Sign Out
                  </button>
                  </div>
                 
              
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
