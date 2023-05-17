import styles from "./Transcript.module.css"
import DebateTranscriptModal from "../../../Layouts/modal/DebateFinishedModal/DebateTranscriptModal"
import {motion} from "framer-motion"
const Transcript = () => {
  return (
    <motion.div 
    
    initial={
      {
        x:"-100px",
        scale:0.9,
        opacity:0.5
      }
      
    }
    animate={
      {
        x:"0px",
        scale:1,
        opacity:1
      }
    }
    
    transition={{ duration: 0.5 ,bounce:200 }}
    className={styles.modelContent}>
            <div className={styles.transcript_header}>

                <img width={"60"} height={"60"} src="/icons/transcript.png" alt="tanscriptIcon" />
                <h2>DOWNLOAD DEBATE TRANSCRIPT</h2>

            </div>
            <div className={styles.transcript_default_info_text}>
                Get the transcript of the debate in the text and audio format and download the transcript in 
                pdf,jpg,png format .
            </div>
            <DebateTranscriptModal>

            <button className={styles.getTranscriptButton}>
                GET TRANSCRIPT
            </button>
            </DebateTranscriptModal>
      
            <div>

            </div>
    </motion.div>
  )
}

export default Transcript