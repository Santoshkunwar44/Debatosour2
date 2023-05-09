import {useState ,useEffect} from "react"

import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs"
import {HiOutlineClipboardDocument} from "react-icons/hi2";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {RxResume} from "react-icons/rx"
import "./DebateAction.css"
import { useToast } from '@chakra-ui/react';
import {TbMicroscope} from "react-icons/tb";
import {TiArrowBackOutline} from "react-icons/ti";
import {useSelector} from "react-redux"
import { getMyTeam } from "../../../utils/services";
const DebateAction = ({ 
  handleMicToggle,
   micMuted, 
   handleLeaveRoom 
   ,roomId  
   ,isUserParticipant 
   , isLive,
   WatchType,
   handleResumeDebate,
   debateState,
   handleStartDebate,
  roomMembers}) => {

  const { activeDebate } = useSelector((state) => state.debate);
  const {data} = useSelector((state)=>state.user)
  const toast = useToast()
  const [teams, setTeams] = useState([]);
  const [ canStartDebate,setCanStartDebate] =useState(false)
    
  useEffect(() => {
    if (activeDebate) {
      let speakerTeams = roomMembers.filter(speaker => {
        return activeDebate.teams.some(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        });
      }).map(speaker => {
        let team = activeDebate.teams.find(team => {
          return team.members.some(member => {
            return member._id === speaker.id;
          });
        });
        return { id: speaker.id, teamName: team.name, ...speaker };
      }).reduce((acc, speaker) => {
        if (acc[speaker.teamName]) {
          acc[speaker.teamName].push(speaker);
        } else {
          acc[speaker.teamName] = [speaker];
        }
        return acc;
      }, {});




      const TeamArray = [
        {
          name: activeDebate.teams[0].name,
          members: []
        },
        {
          name: activeDebate.teams[1].name,
          members: []
        }
      ]

      Object.keys(speakerTeams).forEach((team) => {
        TeamArray.forEach((teamObj) => {
          if (teamObj.name === team) {
            teamObj.members = speakerTeams[team];
          }
        })

      })
      console.log("final", TeamArray)
      setTeams(TeamArray)
    }
  }, [activeDebate, roomMembers])




  useEffect(()=>{
    if(!data || !activeDebate)return;
   let teamName =  getMyTeam(activeDebate.teams,data._id)?.name;
   let startTeamName = activeDebate.timeFormat[0].team; 
   console.log("my",startTeamName)
   setCanStartDebate(teamName === startTeamName)

    
  },[data,activeDebate])
  const handleCopyLink=()=>{

    toast({
      title: '',
      description: "Link copied to clipboard",
      status: 'success',
      duration: 5000,
      position: "top",
      isClosable: true,
    })
  }






  return (
    <>
      <div className={"debateActionContainer"}>


        {
            isUserParticipant === null ? ".." : (isUserParticipant && isLive && WatchType === "PARTICIPANT")  ?
            <>
             {

           ( !debateState.isStarted && canStartDebate )  &&  <button className="pass_mic_button" onClick={handleStartDebate}>
              <TbMicroscope/>
              START DEBATE
            </button> 
              }
            

       {  (  debateState?.isPaused && isLive) &&    <button className="pass_mic_button" onClick={handleResumeDebate}>
          <RxResume className="resumeIcon"/>
        RESUME DEBATE
        </button>   
}

          {/* {
            isMicWithMe ?  <button className="pass_mic_button" onClick={passMicHandler}>
            <TbMicroscope/>
           PASS MIC
          </button>:""
          }  */}
    <div className="DebateActionWrapper">
      {
    debateState.isStarted ?    (micMuted ? <BsFillMicMuteFill onClick={handleMicToggle} /> :
         <BsFillMicFill className="activeMic" onClick={handleMicToggle} />) :""
      }
      <button className="leaveBtn" onClick={handleLeaveRoom}>
        <TiArrowBackOutline/>
        LEAVE
      </button>
    </div>
    
    </>
    :""
        }
      {
 
 (  isLive && WatchType !== "PARTICIPANT")&&
        <button className="leaveBtn leave_for_watch_type" onClick={handleLeaveRoom}>
        <TiArrowBackOutline/>
        LEAVE
      </button>
        } 
    <CopyToClipboard text={`${process.env.REACT_APP_FRONTEND_URL}/watch?debateId=${roomId}`} onCopy={handleCopyLink}>
      <button   className="copy_link_button">
        <HiOutlineClipboardDocument/> 
        <p>COPY LINK</p>
      </button>
    </CopyToClipboard>
      </div>
      </>
  )
}

export default DebateAction