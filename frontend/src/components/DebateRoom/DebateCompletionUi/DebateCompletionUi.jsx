
import styles from "./DebateCompletionUi.module.css"
import Transcript from "../Transcript/Transcript"
import { useState } from "react"
import MysteryBox from "../MysteryBox/MysteryBox"


const DebateCompletionUi = () => {
  const [ completionStep,setCompletionStep ] =useState("mystery")
  const handleNext =()=>setCompletionStep("translate")
  
  return (
    <div 

    className={styles.finishModalContainer}>
     <img src="https://img.freepik.com/premium-photo/cartoon-slot-machine-with-money-illustration-casino-games_863013-8080.jpg?w=740" alt="winner image"  className={styles.main_bg_image} />
    <div className={styles.modalBodyContent}
    >
          {
            completionStep === "mystery" ? <MysteryBox handleNext={handleNext}/> :        <Transcript/>

          }
       
    </div>
    </div>
  )
}

export default DebateCompletionUi