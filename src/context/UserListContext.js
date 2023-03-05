import React,{ createContext,useState,useEffect } from "react";


export const UserListContext = createContext()

export default function UserListProvider({children}){
    const[users,setUsers]=useState([])
    const [content11,setContent11] = useState(true)
    const [contre,setContere] = useState(true)
    const [post1,setPost1] = useState(true)
    const [que,setQue] = useState(true)
    const [ans,setAns] = useState(true)
    console.log("provider",users)
     
    // let contextData = {
      
    //   user:user,
    //   setUser:setUser,
    //   logoutUser: logoutUser

      
    // }

    return(
        <UserListContext.Provider value={{users,setUsers,content11,setContent11,contre,setContere,que,setQue,post1,setPost1,ans,setAns}}>
           {children}
        </UserListContext.Provider>
    )
}



