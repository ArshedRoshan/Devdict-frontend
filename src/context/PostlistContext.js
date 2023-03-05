import React,{ createContext,useState,useEffect } from "react";

export const PostlistContext = createContext()

export default function ListProvider({children}){
    const[post,setPost]=useState([])
    const[search,setSearch] = useState('')
   
     
    // let contextData = {
      
    //   user:user,
    //   setUser:setUser,
    //   logoutUser: logoutUser

      
    // }

    return(
        <PostlistContext.Provider value={{post,setPost,search,setSearch}}>
           {children}
        </PostlistContext.Provider>
    )
}