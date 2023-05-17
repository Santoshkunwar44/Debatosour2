
import styles from "./MysteryBox.module.css"
import ClaimReward from "../ClaimReward/ClaimReward"
import {BiUpvote,BiDownvote} from "react-icons/bi"
import {GrFormNextLink} from "react-icons/gr"
import {motion} from "framer-motion"

const MysteryBox = ({handleNext}) => {
  return (
    <>
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
      className={styles.modelContent}
    >

    <div className={styles.top_winning_team}>
        <img  className={styles.win_logo} width="40" height="40" src="https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Win-casino-smashingstocks-flat-smashing-stocks.png" alt="external-Win-casino-smashingstocks-flat-smashing-stocks"/>
        <h1 className={styles.winning_team_text}> YOUR TEAM WON THE DEBATE</h1> 
        </div>
        <div className={styles.vote_count_box}>
            <div className={`${styles.vote_button_count } ${styles.winning_team_vote}`}   >
                <BiUpvote/>
                <p>
                21  
              HERO  
                </p>
             </div>
             <div className={styles.vote_button_count}>   
             <BiDownvote/>
             <p>
             10 
                    FEROS 

             </p>
              </div>
        </div>
        <ClaimReward/>
        <button className={styles.nextButton} onClick={handleNext}>
          <GrFormNextLink className={styles.nextIcon}/>
          Next
        </button>
    </motion.div>
    
    </>
  )
}

export default MysteryBox