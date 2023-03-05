import React,{ createContext,useState,useEffect } from "react";

export const CompanyListContext = createContext()

export default function CompanyProvider({children}){
    let[company,setCompany]=useState([])
    console.log("provider profile",company)
 
   
   
    return(
        <CompanyListContext.Provider value={{company,setCompany}}>
           {children}
        </CompanyListContext.Provider>
    )
}