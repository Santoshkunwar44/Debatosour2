import { useSelector } from "react-redux"
import styles from "./DebateBanner.module.css"
const DebateBanner = () => {
    const {activeDebate} = useSelector(state=>state.debate);

  return (
    <div className={styles.debateBanner}>
        <img src="https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="sunset in the beach " />
        <div className={styles.banner_content_wrapper}>
                <div className={styles.main_box}>
                    <h1 className={styles.debate_topic}>{activeDebate?.current?.topic}</h1>
                    <div className={styles.team_box}>
                        <h3>Heros </h3>
                        <img src="/icons/vs.png" alt="vs icon" />
                        <h3>Feros </h3>
                            </div>
                  <h1 className={styles.startsInText}> STARTS IN 4 HR 3 MIN  3 SEC</h1> 

                </div>
                <div className={styles.passcode_text}>Passcode  {activeDebate?.current?.passcode}</div>
            </div>
    </div>
  )
}

export default DebateBanner