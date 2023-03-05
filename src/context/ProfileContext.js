import React,{ createContext,useState,useEffect } from "react";

export const ProfileContext = createContext()

export default function ProfileProvider({children}){
    let[profile,setProfile]=useState([])
    let[name,setName]=useState('')
 
    useEffect(()=>{
        localStorage.setItem("profile", JSON.stringify(profile));
       },[profile])
    
    console.log("provider profile",profile)
    return(
        <ProfileContext.Provider value={{profile,setProfile,name,setName}}>
           {children}
        </ProfileContext.Provider>
    )
}