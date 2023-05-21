
import styles from "./DebateCompletionUi.module.css"
import Transcript from "../Transcript/Transcript"
import { useEffect, useState } from "react"
import MysteryBox from "../MysteryBox/MysteryBox"
import { useParams } from "react-router-dom"
import { getDebateByIdApi } from "../../../utils/Api"
import { useSelector } from "react-redux"
import { getMyTeam } from "../../../utils/services"
import { Enums } from "../../../redux/action/actionTypes/Enumss"


const DebateCompletionUi = () => {
  const [ completionStep,setCompletionStep ] =useState("mystery")
  const {data:currentUser} =useSelector(state=>state.user)
  const [activeDebate,setActiveDebate] = useState(null)
  const [debateResult,setDebateResult] =useState("")
  const {debateId} = useParams();  
  
  const handleNext =()=>setCompletionStep("translate")

  useEffect(()=>{
    if(!debateId)return;
    fetchDebateById()
  },[debateId])
  const fetchDebateById=()=>{
    try {

      const {data,status} = getDebateByIdApi(activeDebate)
      if(status ===200){
        setActiveDebate(data.message)
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    if(activeDebate && currentUser){
      const {winner,teams} = activeDebate;
      const myTeamName  =     getMyTeam(teams,currentUser?._id).name; 
      if(myTeamName===winner){
      setDebateResult("won")
    }else if(Enums.MATCH_TIED === winner){
      setDebateResult("tied")
    }else{
      setDebateResult("lose")
    }
    }
  },[activeDebate,currentUser])

  return (
    <div 

    className={styles.finishModalContainer}>
     <img src="https://img.freepik.com/premium-photo/cartoon-slot-machine-with-money-illustration-casino-games_863013-8080.jpg?w=740" alt="winner image"  className={styles.main_bg_image} />
    <div className={styles.modalBodyContent}
    >
          {
            completionStep === "mystery" ? <MysteryBox debateResult={debateResult} activeDebate={activeDebate} handleNext={handleNext}/> :        <Transcript activeDebate={activeDebate}/>

          }
       
    </div>
    </div>
  )
}

export default DebateCompletionUi