import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import logoImg from "../src/assets/DROBEDOWN.png";


export default function Header(props) {
    const navigate = useNavigate();

    const[isLogged,setIsLogged] =useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsLogged(true)
            }else{
                setIsLogged(false)
            }
        })
    },[auth])
  return (
    <nav className="bg-black pb-[30px]">
    <h2 className="text-orange-500 font-semibold text-3xl cursor-pointer" onClick={() => {navigate("/")}}>
     EsBookify
    </h2>
    <div className='w-[330px] h-[30px] relative flex rounded-md border border-[#ff8a01]'>
      
      <input
        type="text"
        placeholder="search..."
        className='bg-transparent text-[#ff8a01] pl-[10px] w-[90%] placeholder:text-[#ff8a01] placeholder:pl-[2px]'
      ></input>
      <a href="#">
        <FaMagnifyingGlass className='text-[#ff8a01] pt-[7px] text-xl'/>
      </a>
    </div>
    {isLogged && <button onClick={()=>{navigate("/profile")}} className='text-[#ff8a01] '><img className='w-[36px]' src={logoImg} alt='logo' />  </button>}
    {!isLogged && <button className='text-[#ff8a01] w-[90px] h-[30px] bg-neutral-600 font-semibold border border-[#ff8a01]'  onClick={props.onShowLogin} >Login</button>}
  </nav>
  )
}