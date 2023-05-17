import React from 'react'
import styles from "./ClaimReward.module.css"
import { GrFormNextLink } from 'react-icons/gr'

const ClaimReward = () => {
  return (
    <div className={styles.claimRewardContainer}>

        <img className={styles.mysteryImg} src="/images/mystery_prev_ui.png" alt="mystery box" />
        <button className={styles.mystryButton}>Open mystery box</button>
  

    </div>
  )
}

export default ClaimReward