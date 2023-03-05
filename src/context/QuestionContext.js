import React,{ createContext,useState,useEffect } from "react";

export const QuestionContext = createContext()

export default function QuestionProvider({children}){
    let[question,setQuestion]=useState([])
    let[details,setDetails]=useState([])
    let[ans,setAns] = useState(true)
//    useEffect(()=>{
//     localStorage.setItem("details", JSON.stringify(details));
//    },[details,details.questionss])

  
    console.log("provider question",question)
    return(
        <QuestionContext.Provider value={{question,setQuestion,details,setDetails,ans,setAns}}>
           {children}
        </QuestionContext.Provider>
    )
}