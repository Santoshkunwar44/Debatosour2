import React, { useState  } from 'react'
import {useSelector} from "react-redux"
import styles from "./ClaimReward.module.css"
import { getMysterAvatar } from '../../../utils/services'
import { IoIosDoneAll } from 'react-icons/io';
import {GiPerspectiveDiceSixFacesSix} from "react-icons/gi"
import {  updateUserapi } from '../../../utils/Api';


const ClaimReward = () => {
  const {data:currentUser} = useSelector(state=>state.user)
  const [mysteryAvatarResult ,setMysteryAvatarResult] = useState(null);
  const [claimed,setClaimed] =useState(false)

  const handleOpenMysteryBox =()=>{
    setMysteryAvatarResult(  getMysterAvatar("win"))
  }
  const handleClaimReward=async()=>{
    if(!currentUser)return;
    const prevAvatars = currentUser?.equipedAvatars ?? []
    try {
      await updateUserapi(currentUser?._id ,{
        equipedAvatars:[
          ...prevAvatars,
          {
            type:mysteryAvatarResult.type,
            avatar:mysteryAvatarResult.avatar
          }
        ]
      })
      setClaimed(true)
    } catch (error) {
      
    }

  }
  return (
    <div className={styles.claimRewardContainer}>

      {
        <img className={`${styles.mysteryImg} ${mysteryAvatarResult?.avatar && styles.avatarStyles}`} src={`${ mysteryAvatarResult ? mysteryAvatarResult.avatar :"/images/mystery_prev_ui.png"}`} alt="mystery box" />
      }  
      {
        mysteryAvatarResult ? <h4 className={styles.avatarsType}> {mysteryAvatarResult.type} Avatar</h4> :""
      }
      {
       !mysteryAvatarResult &&  <button className={styles.mystryButton} onClick={handleOpenMysteryBox}>  
       <GiPerspectiveDiceSixFacesSix/>
       <p>

        Open mystery box
       </p>
        </button>
          } 

      {
      (mysteryAvatarResult && !claimed) && <button className={styles.mystryButton} onClick={handleClaimReward}> Claim Avatar</button>
      }
      {
          ( mysteryAvatarResult && claimed) && <button className={styles.mystryButton}> 
           <IoIosDoneAll/>
           <p>Claimed </p>
           </button>
      }
  

    </div>
  )
}

export default ClaimReward